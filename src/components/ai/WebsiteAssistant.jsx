'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Bot,
  LoaderCircle,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from 'lucide-react'

import { askLambertAssistant, hasAiAssistant } from '@/lib/api/aiAssistant'
import { trackEvent } from '@/lib/analytics'
import styles from './WebsiteAssistant.module.css'

const copy = {
  en: {
    launcher: 'Ask Lambert',
    title: 'Lambert Assistant',
    status: 'Published Lambert information',
    close: 'Close assistant',
    reset: 'Start a new conversation',
    welcome: 'Hello. I can help you explore Lambert Electromec’s services, divisions, published projects, Facility Management and contact information.',
    placeholder: 'Ask about Lambert…',
    send: 'Send message',
    note: 'Answers are based on approved and published Lambert information.',
    thinking: 'Checking Lambert information…',
    unavailable: 'The Lambert assistant is temporarily unavailable. Please try again later.',
    rateLimited: 'You’ve reached the temporary message limit. Please try again shortly.',
    suggestions: [
      'What services does Lambert provide?',
      'Show me Lambert projects in Nigeria.',
      'Tell me about Lambert’s data centre experience.',
    ],
  },
  fr: {
    launcher: 'Demander à Lambert',
    title: 'Assistant Lambert',
    status: 'Informations Lambert publiées',
    close: 'Fermer l’assistant',
    reset: 'Commencer une nouvelle conversation',
    welcome: 'Bonjour. Je peux vous aider à découvrir les services, divisions, projets publiés, Facility Management et coordonnées de Lambert Electromec.',
    placeholder: 'Posez une question sur Lambert…',
    send: 'Envoyer le message',
    note: 'Les réponses reposent sur les informations Lambert approuvées et publiées.',
    thinking: 'Recherche dans les informations Lambert…',
    unavailable: 'L’assistant Lambert est temporairement indisponible. Veuillez réessayer plus tard.',
    rateLimited: 'Vous avez atteint la limite temporaire de messages. Veuillez réessayer dans quelques instants.',
    suggestions: [
      'Quels services Lambert propose-t-il ?',
      'Montrez-moi les projets Lambert au Nigeria.',
      'Parlez-moi de l’expérience de Lambert dans les centres de données.',
    ],
  },
}

const makeWelcomeMessage = (locale) => ({
  id: `welcome-${locale}`,
  role: 'assistant',
  content: copy[locale].welcome,
  links: [],
  includeInHistory: false,
})

const WebsiteAssistant = ({ locale = 'en' }) => {
  const resolvedLocale = locale === 'fr' ? 'fr' : 'en'
  const labels = copy[resolvedLocale]
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => [makeWelcomeMessage(resolvedLocale)])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)
  const messagesRef = useRef(null)
  const requestRef = useRef(null)

  const hasVisitorMessage = useMemo(
    () => messages.some((message) => message.role === 'user'),
    [messages],
  )

  useEffect(() => {
    requestRef.current?.abort()
    setMessages([makeWelcomeMessage(resolvedLocale)])
    setInput('')
    setIsLoading(false)
  }, [resolvedLocale])

  useEffect(() => {
    if (!isOpen) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (!messagesRef.current) return
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: messages.length > 2 ? 'smooth' : 'auto',
    })
  }, [messages, isLoading])

  useEffect(() => () => requestRef.current?.abort(), [])

  if (!hasAiAssistant) return null

  const resetConversation = () => {
    requestRef.current?.abort()
    setMessages([makeWelcomeMessage(resolvedLocale)])
    setInput('')
    setIsLoading(false)
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }

  const submitMessage = async (rawMessage) => {
    const message = String(rawMessage || '').trim()
    if (!message || isLoading) return

    const history = messages
      .filter((item) => item.includeInHistory !== false && (item.role === 'user' || item.role === 'assistant'))
      .slice(-6)
      .map((item) => ({ role: item.role, content: item.content }))

    const visitorMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      links: [],
      includeInHistory: true,
    }

    setMessages((current) => [...current, visitorMessage])
    setInput('')
    // Counts that a question was asked; the question itself is never sent.
    trackEvent('assistant_question')
    setIsLoading(true)

    const controller = new AbortController()
    requestRef.current = controller

    try {
      const response = await askLambertAssistant({
        message,
        locale: resolvedLocale,
        history,
        signal: controller.signal,
      })

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.answer,
          links: response.links,
          includeInHistory: true,
        },
      ])
    } catch (error) {
      if (error?.name === 'AbortError') return

      const content = error?.status === 429 ? labels.rateLimited : labels.unavailable
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content,
          links: [],
          includeInHistory: false,
          isError: true,
        },
      ])
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitMessage(input)
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submitMessage(input)
    }
  }

  return (
    <div className={styles.root}>
      <section
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        aria-label={labels.title}
        aria-hidden={!isOpen}
      >
        <header className={styles.header}>
          <div className={styles.identity}>
            <span className={styles.avatar} aria-hidden="true">
              <Bot size={19} strokeWidth={2} />
            </span>
            <span className={styles.identityCopy}>
              <strong>{labels.title}</strong>
              <small><span className={styles.statusDot} />{labels.status}</small>
            </span>
          </div>

          <div className={styles.headerActions}>
            <button type="button" className={styles.iconButton} onClick={resetConversation} aria-label={labels.reset} title={labels.reset}>
              <RotateCcw size={17} />
            </button>
            <button type="button" className={styles.iconButton} onClick={() => setIsOpen(false)} aria-label={labels.close} title={labels.close}>
              <X size={19} />
            </button>
          </div>
        </header>

        <div className={styles.messages} ref={messagesRef} aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageRow} ${message.role === 'user' ? styles.userRow : styles.assistantRow}`}
            >
              {message.role === 'assistant' && (
                <span className={styles.messageAvatar} aria-hidden="true">
                  <Sparkles size={14} />
                </span>
              )}

              <div className={styles.messageStack}>
                <div className={`${styles.bubble} ${message.role === 'user' ? styles.userBubble : styles.assistantBubble} ${message.isError ? styles.errorBubble : ''}`}>
                  {message.content}
                </div>

                {message.links?.length > 0 && (
                  <div className={styles.links}>
                    {message.links.map((link) => (
                      <Link key={`${message.id}-${link.url}`} href={link.url} className={styles.sourceLink}>
                        <span>{link.title}</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.messageRow} ${styles.assistantRow}`}>
              <span className={styles.messageAvatar} aria-hidden="true">
                <Sparkles size={14} />
              </span>
              <div className={`${styles.bubble} ${styles.assistantBubble} ${styles.thinking}`}>
                <LoaderCircle size={15} className={styles.spinner} aria-hidden="true" />
                <span>{labels.thinking}</span>
              </div>
            </div>
          )}

          {!hasVisitorMessage && !isLoading && (
            <div className={styles.suggestions}>
              {labels.suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => submitMessage(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className={styles.composer} onSubmit={handleSubmit}>
          <div className={styles.inputShell}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, 700))}
              onKeyDown={handleInputKeyDown}
              placeholder={labels.placeholder}
              rows={1}
              maxLength={700}
              disabled={isLoading}
              aria-label={labels.placeholder}
            />
            <button type="submit" className={styles.sendButton} disabled={isLoading || !input.trim()} aria-label={labels.send}>
              <Send size={17} />
            </button>
          </div>
          <small className={styles.note}>{labels.note}</small>
        </form>
      </section>

      <button
        type="button"
        className={`${styles.launcher} ${isOpen ? styles.launcherOpen : ''}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={isOpen ? labels.close : labels.launcher}
      >
        <span className={styles.launcherIcon} aria-hidden="true">
          {isOpen ? <X size={21} /> : <MessageCircle size={21} />}
        </span>
        <span className={styles.launcherLabel}>{labels.launcher}</span>
      </button>
    </div>
  )
}

export default WebsiteAssistant

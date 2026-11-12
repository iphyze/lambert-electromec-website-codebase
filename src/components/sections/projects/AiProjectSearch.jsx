'use client'

import { useEffect, useRef, useState } from 'react'
import { LoaderCircle, RotateCcw, Search, Sparkles, TriangleAlert } from 'lucide-react'
import { hasAiProjectSearch, searchLambertProjectsWithAi } from '@/lib/api/aiProjectSearch.js'
import './AiProjectSearch.css'

const labelsByLocale = {
  en: {
    eyebrow: 'AI Project Search',
    title: 'Search the Lambert portfolio naturally',
    description: 'Ask by project type, location, division or work delivered. Results always come from Lambert’s published project database.',
    placeholder: 'e.g. Show me data centre projects in Nigeria',
    search: 'Search projects',
    searching: 'Searching',
    reset: 'Clear AI search',
    results: 'matched projects',
    oneResult: 'matched project',
    openAi: 'OpenAI assisted',
    local: 'Local search',
    noResults: 'No published projects matched that request. Try a broader description.',
    error: 'AI Project Search could not complete this request. Your normal project search below is still available.',
    rateLimited: 'Too many AI project searches were made recently. Please try again shortly.',
    examplesLabel: 'Try:',
    examples: [
      'Show me data centre projects in Nigeria',
      'Which projects involved power generation?',
      'Show buildings Lambert worked on in Ghana',
    ],
  },
  fr: {
    eyebrow: 'Recherche de projets par IA',
    title: 'Recherchez naturellement dans le portefeuille Lambert',
    description: 'Recherchez par type de projet, localisation, division ou travaux réalisés. Les résultats proviennent uniquement de la base de projets publiés de Lambert.',
    placeholder: 'Ex. Montrez-moi les projets de data centers au Nigeria',
    search: 'Rechercher',
    searching: 'Recherche',
    reset: 'Effacer la recherche IA',
    results: 'projets correspondants',
    oneResult: 'projet correspondant',
    openAi: 'Assisté par OpenAI',
    local: 'Recherche locale',
    noResults: 'Aucun projet publié ne correspond à cette demande. Essayez une description plus large.',
    error: 'La recherche de projets par IA n’a pas pu aboutir. La recherche standard ci-dessous reste disponible.',
    rateLimited: 'Trop de recherches ont été effectuées récemment. Veuillez réessayer dans un moment.',
    examplesLabel: 'Essayez :',
    examples: [
      'Montrez-moi les projets de data centers au Nigeria',
      'Quels projets concernent la production d’énergie ?',
      'Montrez les bâtiments réalisés par Lambert au Ghana',
    ],
  },
}

const AiProjectSearch = ({ locale = 'en', activeSearch = null, onResults, onClear }) => {
  const labels = labelsByLocale[locale] || labelsByLocale.en
  const controllerRef = useRef(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => () => controllerRef.current?.abort(), [])

  if (!hasAiProjectSearch) return null

  const runSearch = async (rawQuery) => {
    const nextQuery = String(rawQuery ?? query).trim()
    if (!nextQuery || loading) return

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setQuery(nextQuery)
    setLoading(true)
    setError('')

    try {
      const result = await searchLambertProjectsWithAi({
        query: nextQuery,
        locale,
        signal: controller.signal,
      })
      onResults?.(result)
    } catch (requestError) {
      if (requestError?.name === 'AbortError' || controller.signal.aborted) return
      setError(requestError?.status === 429 ? labels.rateLimited : labels.error)
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    runSearch(query)
  }

  const handleClear = () => {
    controllerRef.current?.abort()
    setLoading(false)
    setError('')
    setQuery('')
    onClear?.()
  }

  const resultLabel = activeSearch?.resultCount === 1 ? labels.oneResult : labels.results

  return (
    <section className={`ai-project-search ${activeSearch ? 'is-active' : ''}`} aria-label={labels.eyebrow}>
      <div className="ai-project-search-intro">
        <span className="ai-project-search-icon" aria-hidden="true">
          <Sparkles size={19} />
        </span>
        <div>
          <span className="ai-project-search-eyebrow">{labels.eyebrow}</span>
          <h3>{labels.title}</h3>
          <p>{labels.description}</p>
        </div>
      </div>

      <form className="ai-project-search-form" onSubmit={handleSubmit}>
        <div className="ai-project-search-input-wrap">
          <Search size={19} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.placeholder}
            aria-label={labels.eyebrow}
            maxLength={500}
            disabled={loading}
          />
        </div>
        <button type="submit" className="ai-project-search-submit" disabled={loading || !query.trim()}>
          {loading ? <LoaderCircle size={17} className="ai-project-search-spinner" aria-hidden="true" /> : <Sparkles size={17} aria-hidden="true" />}
          <span>{loading ? labels.searching : labels.search}</span>
        </button>
      </form>

      {!activeSearch && !error ? (
        <div className="ai-project-search-examples">
          <span>{labels.examplesLabel}</span>
          <div>
            {labels.examples.map((example) => (
              <button type="button" key={example} onClick={() => runSearch(example)} disabled={loading}>
                {example}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="ai-project-search-message is-error" role="alert">
          <TriangleAlert size={17} aria-hidden="true" />
          <span>{error}</span>
        </div>
      ) : null}

      {activeSearch ? (
        <div className="ai-project-search-result" aria-live="polite">
          <div className="ai-project-search-result-copy">
            <div className="ai-project-search-result-meta">
              <span className={`ai-project-search-engine is-${activeSearch.engine || 'local'}`}>
                {activeSearch.engine === 'openai' ? labels.openAi : labels.local}
              </span>
              <span><strong>{activeSearch.resultCount}</strong> {resultLabel}</span>
            </div>
            {activeSearch.summary ? <p>{activeSearch.summary}</p> : null}
            {activeSearch.resultCount === 0 ? <small>{labels.noResults}</small> : null}
          </div>
          <button type="button" className="ai-project-search-reset" onClick={handleClear}>
            <RotateCcw size={15} aria-hidden="true" />
            <span>{labels.reset}</span>
          </button>
        </div>
      ) : null}
    </section>
  )
}

export default AiProjectSearch

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import {
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  CircleAlert,
  FileUp,
  LoaderCircle,
  Send,
  ShieldCheck,
} from 'lucide-react'
import TermsModal from './TermsModal.jsx'
import { trackEvent } from '@/lib/analytics'
import TurnstileWidget from './TurnstileWidget.jsx'
import { fetchContactSubjects, submitContactForm } from '@/lib/contact-submission.js'
import { withLocalePath } from '@/i18n/config.js'

const JOB_SUBJECT = 'job-vacancy'
const OTHER_POSITION = 'other-positions'
const OTHER_LOCATION = 'other'
const MIN_SUBMISSION_TIME_MS = 2500
const CV_MAX_BYTES = 10 * 1024 * 1024
const CV_EXTENSIONS = ['pdf', 'doc', 'docx']
const CV_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

const SERVER_FIELD_MAP = {
  subject: 'subject',
  full_name: 'fullName',
  email: 'email',
  phone: 'phone',
  message: 'message',
  terms_accepted: 'termsAccepted',
  cv: 'cv',
  position: 'position',
  other_position: 'otherPosition',
  location: 'location',
  other_location: 'otherLocation',
}

const getFileExtension = (name = '') => name.split('.').pop()?.toLowerCase() || ''

const isAllowedCv = (file) => {
  if (!file) return false
  return CV_EXTENSIONS.includes(getFileExtension(file.name)) && (!file.type || CV_MIME_TYPES.has(file.type))
}

const ContactForm = ({
  content,
  termsContent,
  locale = 'en',
  initialSubjectValue = '',
  lockSubject = false,
}) => {
  const [termsOpen, setTermsOpen] = useState(false)
  const [submissionState, setSubmissionState] = useState({ type: '', message: '' })
  const [subjectOptions, setSubjectOptions] = useState(content.subjects)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileResetNonce, setTurnstileResetNonce] = useState(0)
  const loadedAtRef = useRef(Date.now())
  const fileInputRef = useRef(null)
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''
  const turnstileRequired = Boolean(turnstileSiteKey)
  const initialSubject = content.subjects.find((item) => item.value === initialSubjectValue) || null

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      subject: initialSubject,
      fullName: '',
      email: '',
      phone: '',
      message: '',
      position: null,
      otherPosition: '',
      location: null,
      otherLocation: '',
      termsAccepted: false,
      website: '',
      cv: null,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldUnregister: true,
  })

  useEffect(() => {
    const controller = new AbortController()

    fetchContactSubjects({ locale, signal: controller.signal })
      .then((result) => {
        if (!result.configured || result.items.length === 0) return

        setSubjectOptions(result.items)

        const currentSubject = getValues('subject')
        const currentValue = currentSubject?.value || initialSubjectValue
        if (!currentValue) return

        const syncedSubject = result.items.find((item) => item.value === currentValue) || null
        if (syncedSubject) {
          setValue('subject', syncedSubject, { shouldDirty: false, shouldValidate: false })
        } else if (!lockSubject) {
          setValue('subject', null, { shouldDirty: false, shouldValidate: false })
        }
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') {
          // Keep the client-supplied subject list as a resilient fallback.
        }
      })

    return () => controller.abort()
  }, [getValues, initialSubjectValue, locale, lockSubject, setValue])

  const subject = watch('subject')
  const position = watch('position')
  const location = watch('location')
  const cvFiles = watch('cv')
  const isJobVacancy = subject?.value === JOB_SUBJECT
  const showOtherPosition = isJobVacancy && position?.value === OTHER_POSITION
  const showOtherLocation = isJobVacancy && location?.value === OTHER_LOCATION
  const cvName = cvFiles?.[0]?.name || ''

  const handleTurnstileVerify = useCallback((token) => {
    setTurnstileToken(token)
    clearErrors('root.bot')
  }, [clearErrors])

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken('')
  }, [])

  const clearJobFields = () => {
    setValue('position', null)
    setValue('location', null)
    setValue('otherPosition', '')
    setValue('otherLocation', '')
    setValue('cv', null)
    clearErrors(['position', 'location', 'otherPosition', 'otherLocation', 'cv'])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onSubmit = async (values) => {
    setSubmissionState({ type: '', message: '' })
    clearErrors(['root.spam', 'root.bot', 'root.server'])

    const elapsedMs = Date.now() - loadedAtRef.current
    if (values.website || elapsedMs < MIN_SUBMISSION_TIME_MS) {
      setError('root.spam', { message: content.spamError })
      return
    }

    if (turnstileRequired && !turnstileToken) {
      setError('root.bot', { message: content.botRequired })
      return
    }

    try {
      const result = await submitContactForm({
        values,
        locale,
        elapsedMs,
        turnstileToken,
      })

      if (!result.configured) {
        setSubmissionState({ type: 'info', message: content.backendPending })
        return
      }

      // Anonymous statistics: only that a form was sent, never its contents.
      trackEvent(lockSubject ? 'application_submitted' : 'contact_submitted')
      if (lockSubject && values.cv?.length) trackEvent('cv_uploaded')

      setSubmissionState({
        type: 'success',
        message: result.payload?.message || content.successMessage,
      })

      reset()
      if (fileInputRef.current) fileInputRef.current.value = ''
      setTurnstileToken('')
      setTurnstileResetNonce((value) => value + 1)
      loadedAtRef.current = Date.now()
    } catch (error) {
      const serverMessage = error?.payload?.message || content.submitError
      const serverField = error?.payload?.field || ''
      const mappedField = SERVER_FIELD_MAP[serverField]

      if (serverField === 'turnstile_token') {
        setError('root.bot', { type: 'server', message: serverMessage })
      } else if (mappedField) {
        setError(mappedField, { type: 'server', message: serverMessage }, { shouldFocus: true })
      } else {
        setSubmissionState({ type: 'error', message: serverMessage })
      }

      setTurnstileToken('')
      if (turnstileRequired) setTurnstileResetNonce((value) => value + 1)
    }
  }

  const selectRules = (required = true) => ({
    validate: (value) => (!required || Boolean(value)) || content.required,
  })

  const cvRegister = register('cv', {
    validate: (files) => {
      if (!isJobVacancy) return true
      const file = files?.[0]
      if (!file) return content.cvRequired
      if (!isAllowedCv(file)) return content.invalidCvType
      if (file.size > CV_MAX_BYTES) return content.cvTooLarge
      return true
    },
  })

  const rootError = errors.root?.spam?.message || errors.root?.bot?.message || errors.root?.server?.message

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby="contact-form-title">
        <div className="contact-form-heading">
          <div>
            <small>{content.subjectLabel}</small>
            <h2 id="contact-form-title">{content.heading}</h2>
          </div>
        </div>

        <div className="contact-field contact-field-full">
          <label htmlFor="contact-subject">{content.subjectLabel}</label>
          <Controller
            name="subject"
            control={control}
            rules={selectRules()}
            render={({ field }) => (
              <Select
                {...field}
                inputId="contact-subject"
                instanceId="contact-subject"
                options={subjectOptions}
                placeholder={content.subjectLabel}
                className="contact-select"
                classNamePrefix="contact-select"
                unstyled
                isSearchable={false}
                isDisabled={lockSubject}
                aria-invalid={Boolean(errors.subject) || undefined}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                onChange={(option) => {
                  if (lockSubject) return
                  field.onChange(option)
                  if (option?.value !== JOB_SUBJECT) clearJobFields()
                }}
              />
            )}
          />
          {errors.subject ? <span id="contact-subject-error" className="contact-error">{errors.subject.message}</span> : null}
        </div>

        <div className="contact-form-grid">
          <div className="contact-field">
            <label htmlFor="contact-full-name">{content.fullName}</label>
            <input
              id="contact-full-name"
              type="text"
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName) || undefined}
              aria-describedby={errors.fullName ? 'contact-full-name-error' : undefined}
              {...register('fullName', {
                required: content.required,
                validate: (value) => value.trim().length >= 2 || content.invalidName,
                maxLength: { value: 120, message: content.nameTooLong },
              })}
            />
            {errors.fullName ? <span id="contact-full-name-error" className="contact-error">{errors.fullName.message}</span> : null}
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">{content.email}</label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email) || undefined}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              {...register('email', {
                required: content.required,
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: content.invalidEmail },
                maxLength: { value: 254, message: content.invalidEmail },
              })}
            />
            {errors.email ? <span id="contact-email-error" className="contact-error">{errors.email.message}</span> : null}
          </div>

          <div className="contact-field contact-field-full">
            <label htmlFor="contact-phone">{content.phone}</label>
            <input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={Boolean(errors.phone) || undefined}
              aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
              {...register('phone', {
                required: content.required,
                validate: (value) => {
                  const normalized = value.replace(/[^\d]/g, '')
                  return (normalized.length >= 7 && normalized.length <= 15) || content.invalidPhone
                },
              })}
            />
            {errors.phone ? <span id="contact-phone-error" className="contact-error">{errors.phone.message}</span> : null}
          </div>

          {isJobVacancy ? (
            <>
              <div className="contact-field">
                <label htmlFor="contact-position">{content.position}</label>
                <Controller
                  name="position"
                  control={control}
                  rules={selectRules()}
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputId="contact-position"
                      instanceId="contact-position"
                      options={content.positions}
                      placeholder={content.position}
                      className="contact-select"
                      classNamePrefix="contact-select"
                      unstyled
                      isSearchable={false}
                      aria-invalid={Boolean(errors.position) || undefined}
                      aria-describedby={errors.position ? 'contact-position-error' : undefined}
                    />
                  )}
                />
                {errors.position ? <span id="contact-position-error" className="contact-error">{errors.position.message}</span> : null}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-location">{content.location}</label>
                <Controller
                  name="location"
                  control={control}
                  rules={selectRules()}
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputId="contact-location"
                      instanceId="contact-location"
                      options={content.locations}
                      placeholder={content.location}
                      className="contact-select"
                      classNamePrefix="contact-select"
                      unstyled
                      isSearchable={false}
                      aria-invalid={Boolean(errors.location) || undefined}
                      aria-describedby={errors.location ? 'contact-location-error' : undefined}
                    />
                  )}
                />
                {errors.location ? <span id="contact-location-error" className="contact-error">{errors.location.message}</span> : null}
              </div>

              {showOtherPosition ? (
                <div className="contact-field">
                  <label htmlFor="contact-other-position">{content.otherPosition}</label>
                  <input
                    id="contact-other-position"
                    type="text"
                    aria-invalid={Boolean(errors.otherPosition) || undefined}
                    aria-describedby={errors.otherPosition ? 'contact-other-position-error' : undefined}
                    {...register('otherPosition', {
                      required: showOtherPosition ? content.required : false,
                      maxLength: { value: 120, message: content.nameTooLong },
                    })}
                  />
                  {errors.otherPosition ? <span id="contact-other-position-error" className="contact-error">{errors.otherPosition.message}</span> : null}
                </div>
              ) : null}

              {showOtherLocation ? (
                <div className="contact-field">
                  <label htmlFor="contact-other-location">{content.otherLocation}</label>
                  <input
                    id="contact-other-location"
                    type="text"
                    aria-invalid={Boolean(errors.otherLocation) || undefined}
                    aria-describedby={errors.otherLocation ? 'contact-other-location-error' : undefined}
                    {...register('otherLocation', {
                      required: showOtherLocation ? content.required : false,
                      maxLength: { value: 120, message: content.nameTooLong },
                    })}
                  />
                  {errors.otherLocation ? <span id="contact-other-location-error" className="contact-error">{errors.otherLocation.message}</span> : null}
                </div>
              ) : null}

              <div className="contact-field contact-field-full">
                <label htmlFor="contact-cv">{content.cv}</label>
                <label className="contact-file-control" htmlFor="contact-cv">
                  <span className="contact-file-icon"><FileUp size={20} aria-hidden="true" /></span>
                  <span className="contact-file-copy">
                    <strong>{cvName || content.cv}</strong>
                    <small>PDF, DOC, DOCX · {content.cvMaxSize}</small>
                  </span>
                  <span className="contact-file-action"><BriefcaseBusiness size={17} aria-hidden="true" /></span>
                </label>
                <input
                  id="contact-cv"
                  className="contact-file-input"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  aria-invalid={Boolean(errors.cv) || undefined}
                  aria-describedby={errors.cv ? 'contact-cv-error' : undefined}
                  {...cvRegister}
                  ref={(element) => {
                    cvRegister.ref(element)
                    fileInputRef.current = element
                  }}
                />
                {errors.cv ? <span id="contact-cv-error" className="contact-error">{errors.cv.message}</span> : null}
              </div>
            </>
          ) : null}

          <div className="contact-field contact-field-full">
            <label htmlFor="contact-message">{content.message}</label>
            <textarea
              id="contact-message"
              rows="7"
              aria-invalid={Boolean(errors.message) || undefined}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              {...register('message', {
                required: content.required,
                validate: (value) => value.trim().length >= 10 || content.messageTooShort,
                maxLength: { value: 5000, message: content.messageTooLong },
              })}
            />
            {errors.message ? <span id="contact-message-error" className="contact-error">{errors.message.message}</span> : null}
          </div>
        </div>

        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" tabIndex="-1" autoComplete="off" {...register('website')} />
        </div>

        <div className="contact-consent-row">
          <div className="contact-checkbox">
            <input
              id="contact-terms-accepted"
              type="checkbox"
              aria-labelledby="contact-terms-prefix"
              aria-invalid={Boolean(errors.termsAccepted) || undefined}
              aria-describedby={errors.termsAccepted ? 'contact-terms-error' : undefined}
              {...register('termsAccepted', { required: content.termsRequired })}
            />
            <label className="contact-checkbox-ui" htmlFor="contact-terms-accepted" aria-hidden="true"><Check size={14} /></label>
            <span>
              <label id="contact-terms-prefix" htmlFor="contact-terms-accepted">{content.termsPrefix}</label>{' '}
              <a
                href={withLocalePath('/terms/', locale)}
                onClick={(event) => {
                  event.preventDefault()
                  setTermsOpen(true)
                }}
              >
                {content.termsLabel}
              </a>
            </span>
          </div>
          {errors.termsAccepted ? <span id="contact-terms-error" className="contact-error">{errors.termsAccepted.message}</span> : null}
        </div>

        {turnstileRequired ? (
          <div className="contact-turnstile-row">
            <TurnstileWidget
              siteKey={turnstileSiteKey}
              onVerify={handleTurnstileVerify}
              onExpire={handleTurnstileExpire}
              resetNonce={turnstileResetNonce}
            />
          </div>
        ) : null}

        <div className="contact-form-footer">
          <div className="contact-protection-note">
            <ShieldCheck size={18} aria-hidden="true" />
            <span>{content.protectionNote}</span>
          </div>
          <button className="contact-submit" type="submit" disabled={isSubmitting}>
            <span>{isSubmitting ? content.sending : content.submit}</span>
            {isSubmitting
              ? <LoaderCircle className="contact-submit-spinner" size={18} aria-hidden="true" />
              : <Send size={18} aria-hidden="true" />}
          </button>
        </div>

        <div className="contact-status-region" aria-live="polite" aria-atomic="true">
          {rootError ? (
            <p className="contact-status is-error">
              <CircleAlert size={18} aria-hidden="true" />
              <span>{rootError}</span>
            </p>
          ) : null}

          {submissionState.message ? (
            <p className={`contact-status is-${submissionState.type || 'info'}`}>
              {submissionState.type === 'success'
                ? <CheckCircle2 size={18} aria-hidden="true" />
                : submissionState.type === 'error'
                  ? <CircleAlert size={18} aria-hidden="true" />
                  : <ShieldCheck size={18} aria-hidden="true" />}
              <span>{submissionState.message}</span>
            </p>
          ) : null}
        </div>
      </form>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} content={termsContent} />
    </>
  )
}

export default ContactForm

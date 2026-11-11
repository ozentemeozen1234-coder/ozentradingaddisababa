
import { useState, type FormEvent } from 'react'
import { supabase } from './lib/supabase'

type InquiryFormsProps = {
  language: 'en' | 'am'
}

export default function InquiryForms({ language }: InquiryFormsProps) {
  const isAm = language === 'am'

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    interest_area: '',
    message: '',
    privacy_consent: false,
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const updateField = (
    field: keyof typeof form,
    value: string | boolean
  ) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    
const { data, error } = await supabase.functions.invoke(
  'submit-business-inquiry',
  { body: form },
)

if (error || data?.success !== true) {
  console.error(
    'Business inquiry submission failed:',
    error?.message || data?.error || 'Unknown error',
  )
  setStatus('error')
  return
}

setForm({
  full_name: '',
  email: '',
  phone: '',
  country: '',
  interest_area: '',
  message: '',
  privacy_consent: false,
})

setStatus('success')

  }

  return (
    <div className="inquiry-form-wrap">
      <h3>
        {isAm ? 'የንግድ ትብብር ጥያቄ' : 'Business Partnership Inquiry'}
      </h3>

      <p>
        {isAm
          ? 'ከOZEN CONNECT ጋር ለመተባበር የሚከተለውን ፎርም ይሙሉ።'
          : 'Complete the form below to explore a business partnership with OZEN CONNECT.'}
      </p>

      <form className="inquiry-form" onSubmit={handleSubmit}>
        <label>
          {isAm ? 'ሙሉ ስም' : 'Full Name'}
          <input
            type="text"
            value={form.full_name}
            onChange={(e) => updateField('full_name', e.target.value)}
            minLength={2}
            maxLength={120}
            required
          />
        </label>

        <label>
          {isAm ? 'ኢሜይል' : 'Email Address'}
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            maxLength={254}
            required
          />
        </label>

        <label>
          {isAm ? 'ስልክ (አማራጭ)' : 'Phone (Optional)'}
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            maxLength={30}
          />
        </label>

        <label>
          {isAm ? 'ሀገር' : 'Country'}
          <input
            type="text"
            value={form.country}
            onChange={(e) => updateField('country', e.target.value)}
            maxLength={100}
            required
          />
        </label>

        <label>
          {isAm ? 'የትብብር መስክ' : 'Area of Interest'}
          <select
            value={form.interest_area}
            onChange={(e) => updateField('interest_area', e.target.value)}
            required
          >
            <option value="">
              {isAm ? 'ይምረጡ' : 'Select an area'}
            </option>
            <option value="Business Partnership">Business Partnership</option>
            <option value="Investment">Investment</option>
            <option value="Distribution">Distribution</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          {isAm ? 'መልዕክት' : 'Your Message'}
          <textarea
            value={form.message}
            onChange={(e) => updateField('message', e.target.value)}
            rows={5}
            maxLength={3000}
            required
          />
        </label>

        <label className="inquiry-consent">
          <input
            type="checkbox"
            checked={form.privacy_consent}
            onChange={(e) => updateField('privacy_consent', e.target.checked)}
            required
          />
          <span>
            {isAm
              ? 'የግላዊነት መመሪያውን አንብቤ መረጃዬ እንዲጠቀም እስማማለሁ።'
              : 'I have read the Privacy Policy and consent to the use of my information for this inquiry.'}
          </span>
        </label>

        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading'
            ? (isAm ? 'በመላክ ላይ...' : 'Submitting...')
            : (isAm ? 'ጥያቄዬን ላክ' : 'Submit Inquiry')}
        </button>

        {status === 'success' && (
          <p role="status" className="inquiry-success">
            {isAm
              ? 'ጥያቄዎ በተሳካ ሁኔታ ተልኳል። እናመሰግናለን!'
              : 'Your inquiry has been submitted successfully. Thank you!'}
          </p>
        )}

        {status === 'error' && (
          <p role="alert" className="inquiry-error">
            {isAm
              ? 'ጥያቄዎን መላክ አልተቻለም። እባክዎ እንደገና ይሞክሩ።'
              : 'We could not submit your inquiry. Please try again.'}
          </p>
        )}
      </form>
    </div>
  )
}

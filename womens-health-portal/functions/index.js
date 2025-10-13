/* eslint-env node */
const { onRequest } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')
const express = require('express')
const cors = require('cors')
const sgMail = require('@sendgrid/mail')

const SENDGRID_API_KEY = defineSecret('SENDGRID_API_KEY')

const app = express()
app.use(express.json())
app.use(cors({ origin: true }))

app.post('/sendEmail', async (req, res) => {
  const { to, subject, text, html } = req.body || {}
  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ success: false, message: 'Missing required fields' })
  }

  try {
    sgMail.setApiKey(SENDGRID_API_KEY.value())

    const msg = {
      to,
      from: 'dlia0013@student.monash.edu',
      subject,
      text: text || undefined,
      html: html || undefined,
    }

    await sgMail.send(msg)
    res.json({ success: true, message: 'Email sent successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

exports.api = onRequest({ secrets: [SENDGRID_API_KEY], region: 'australia-southeast1' }, app)
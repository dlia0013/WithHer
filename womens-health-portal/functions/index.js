import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2/options';
import { defineSecret, defineString } from 'firebase-functions/params';
import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';

setGlobalOptions({ region: 'australia-southeast1' });

const SENDGRID_API_KEY = defineSecret('SENDGRID_API_KEY');           
const FROM_EMAIL        = defineString('FROM_EMAIL', {               
  default: 'ldc532111@163.com',
});

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: true }));

app.get('/', (_, res) => res.status(200).send('running'));

app.post('/sendEmail', async (req, res) => {
  try {
    const key  = SENDGRID_API_KEY.value();
    const from = FROM_EMAIL.value();

    if (!key?.startsWith('SG.')) {
      return res.status(500).json({ success:false, message:'SendGrid key not configured' });
    }
    if (!from) {
      return res.status(500).json({ success:false, message:'FROM_EMAIL not configured' });
    }

    try { sgMail.setApiKey(key); } catch (e) {
      console.error('setApiKey failed:', e);
      return res.status(500).json({ success:false, message:'SendGrid init failed' });
    }

    const { to, subject, text, html, attachment } = req.body || {};
    if (!to || !subject) {
      return res.status(400).json({ success:false, message:'Missing "to" or "subject"' });
    }

    const msg = {
      to: Array.isArray(to) ? to : [to],
      from,
      subject,
      text: text || 'Your appointment has been confirmed.',
      html: html || '<p>Your appointment has been confirmed.</p>',
    };

    if (attachment?.content && attachment?.filename) {
      msg.attachments = [{
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type || 'application/octet-stream',
        disposition: 'attachment',
      }];
    }

    const [resp] = await sgMail.send(msg);
    return res.json({ success:true, messageId: resp.headers['x-message-id'] });
  } catch (err) {
    console.error(err?.response?.body || err);
    return res.status(500).json({
      success:false,
      message: err?.response?.body?.errors?.[0]?.message || err.message || 'Send failed',
    });
  }
});

export const api = onRequest({ secrets: [SENDGRID_API_KEY] }, app);
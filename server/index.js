// Express server for Fly.io deployment
// Serves both static frontend and email API

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const RESEND_API_KEY = process.env.RESEND_API_KEY;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Email API endpoint
app.post('/api/send-contact-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log('Received contact form submission:', { name, email, subject });

    // Send confirmation email to sender
    const confirmationRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Rayhan Rathi <onboarding@resend.dev>',
        to: [email],
        subject: 'Thank you for your message!',
        html: `
          <h1>Thank you for reaching out, ${name}!</h1>
          <p>I have received your message and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <hr />
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr />
          <p>Best regards,<br>Rayhan Rathi</p>
        `,
      }),
    });

    const confirmationData = await confirmationRes.json();
    console.log('Confirmation email response:', confirmationData);

    if (!confirmationRes.ok) {
      throw new Error(confirmationData.message || 'Failed to send confirmation email');
    }

    // Send notification email to you
    try {
      const notificationRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Contact Form <onboarding@resend.dev>',
          to: ['rathirayhan888@gmail.com'],
          subject: `New Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        }),
      });
      const notificationData = await notificationRes.json();
      console.log('Notification email response:', notificationData);
    } catch (notifError) {
      console.log('Notification email failed:', notifError);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message });
  }
});

// Catch-all: serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

# Deploying to Fly.io

## Prerequisites
1. Install Fly CLI: https://fly.io/docs/hands-on/install-flyctl/
2. Sign up/login: `fly auth login`

## Deploy Steps

1. **Connect to GitHub** and clone your repo locally

2. **Launch your app** (first time only):
   ```bash
   fly launch
   ```
   - Say "no" to copying the existing config if prompted
   - Choose a unique app name
   - Select your preferred region

3. **Set your Resend API key**:
   ```bash
   fly secrets set RESEND_API_KEY="your_resend_api_key_here"
   ```

4. **Deploy**:
   ```bash
   fly deploy
   ```

5. **Your site is live!** Visit `https://your-app-name.fly.dev`

## Update the Frontend API Call

Before deploying, update `src/components/ContactSection.tsx` to use relative URL:

```javascript
// Change from:
const { error } = await supabase.functions.invoke("send-contact-email", {...})

// To:
const response = await fetch('/api/send-contact-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
const data = await response.json();
if (!response.ok) throw new Error(data.error);
```

## Useful Commands

```bash
fly status          # Check app status
fly logs            # View logs
fly secrets list    # List secrets
fly open            # Open your app in browser
```

## Custom Domain

```bash
fly certs create yourdomain.com
```
Then add the CNAME record shown to your DNS.

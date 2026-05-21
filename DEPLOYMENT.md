# AutoPhotography — Deployment Guide

## Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase free tier)
- Clerk account (free tier)
- OpenAI account with org verification for gpt-image-1
- Cloudflare R2 account (free tier: 10GB storage)
- Stripe account

## Step 1 — Database (Supabase)
1. https://supabase.com → New project
2. Settings → Database → Connection string → URI mode → copy URL
3. Append: `?pgbouncer=true&connection_limit=1`
4. Set as DATABASE_URL in environment

## Step 2 — Clerk Auth
1. https://dashboard.clerk.com → Create application → enable Google OAuth
2. Copy Publishable Key and Secret Key
3. Webhooks → Add endpoint: `https://yourdomain.com/api/webhooks/clerk`
4. Subscribe to: `user.created`, `user.updated`
5. Copy Signing Secret → CLERK_WEBHOOK_SECRET

## Step 3 — OpenAI
1. https://platform.openai.com/api-keys → Create key → set as OPENAI_API_KEY
2. REQUIRED: Verify your organisation at https://platform.openai.com/settings/organization/general
   (gpt-image-1 will return a 403 without this — takes 2 minutes)
3. Models used:
   - gpt-4.1-mini (prompt engine) — ~$0.0004 per call
   - gpt-image-1 at medium quality (image generation) — ~$0.04 per image

## Step 4 — Cloudflare R2 (Storage)
1. Cloudflare dashboard → R2 → Create bucket: `autophotography-images`
2. Enable public access → copy public URL → STORAGE_PUBLIC_URL
3. R2 → Manage R2 API tokens → Create token (Object Read & Write)
4. Copy Account ID, Access Key ID, Secret Access Key

## Step 5 — Stripe
1. https://dashboard.stripe.com → Developers → API Keys
2. Copy Secret Key and Publishable Key
3. Webhooks → Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Subscribe to: `checkout.session.completed`, `customer.subscription.created`,
   `customer.subscription.updated`, `customer.subscription.deleted`
5. Copy webhook signing secret

## Step 6 — Deploy to Vercel
1. Push to GitHub
2. https://vercel.com → Import repository
3. Add all environment variables from `.env.local.example`
4. Deploy

## Step 7 — Run database migration
After first deploy:
```bash
DATABASE_URL="your-prod-url" npx prisma migrate deploy
```
Or run the migration SQL directly in Supabase's SQL editor.

## Cost per 100 generations
- OpenAI gpt-4.1-mini (prompt engine): ~$0.04
- OpenAI gpt-image-1 medium quality:   ~$4.00
- Cloudflare R2 storage:               ~$0.00 (free tier)
- **Total: ~$4.04 = $0.04/image**

At $0.30/credit (30-pack pricing), margin is ~87%.

## gpt-image-1 quality tiers
| Quality  | Cost/image | Use case               |
|----------|------------|------------------------|
| `low`    | ~$0.01     | Fast previews          |
| `medium` | ~$0.04     | Production (default)   |
| `high`   | ~$0.08     | Future premium tier    |

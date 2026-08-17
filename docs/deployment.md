# Deployment and development workflow

## Environments

- Pull requests receive a Vercel Preview deployment.
- `main` is the production branch. Merging a reviewed pull request triggers the production deployment.
- Supabase credentials are configured separately for Vercel Preview and Production environments.

Required variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

The publishable key is intended for browser use and must be protected by Row Level Security policies. Never expose a `service_role` key through a `VITE_` variable.

## Change workflow

1. Create a branch from the latest `main` using `feat/`, `fix/`, or `chore/`.
2. Implement the requested change and add database changes as timestamped files in `supabase/migrations/`.
3. Run `bun run check` and `bun run build` locally.
4. Push the branch and open a pull request into `main`.
5. Review the code, CI result, Vercel Preview URL, and any migration.
6. Merge only after all required checks pass. Vercel then deploys `main` to Production automatically.

## Initial service setup

1. Create or select a Supabase project and copy its Project URL and publishable key.
2. In Vercel, import `JavadBeigi/ai-insight-navigator`, select `main` as the Production Branch, and keep the detected TanStack Start settings.
3. Add both required variables to the Preview and Production environments in Vercel.
4. Enable branch protection for `main`: require a pull request, one approval, the `quality` status check, and dismissal of stale approvals.
5. Add the custom domain in Vercel, apply the DNS records Vercel provides, and wait until SSL is issued.
6. Add the production and preview callback URLs to Supabase Auth URL Configuration before enabling OAuth or magic links.

## Database changes

Keep every schema change in source control. Create a new migration for each change; do not edit a migration that has already been applied to a shared environment. Enable RLS on browser-accessible tables and add explicit policies before granting access to `anon` or `authenticated`.

# GitHub Pages deployment

This project is configured for a static Next.js export.

## Repository settings

1. Push the project to a GitHub repository.
2. Open Settings → Pages.
3. Set the source to GitHub Actions.
4. Add repository secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `PORTFOLIO_IDS` — comma-separated project IDs that should have prebuilt detail pages, for example `1,2,3`.
5. Push to `main` or run the workflow manually.

The workflow builds the site and publishes the `out` directory through GitHub Pages.

Because GitHub Pages is static hosting, server-only features cannot run there. The portfolio UI and client-side Supabase features can still run in the browser. Admin/server functionality should remain on a server-capable deployment if needed.

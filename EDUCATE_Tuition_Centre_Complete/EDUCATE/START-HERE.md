# EDUCATE Tuition Centre
The homepage is at / and staff callback tracking is at /admin.

## Local setup
Use Node.js 22.13 or later. Extract the project, open a terminal in EDUCATE, then run:

```sh
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_closed_brood.sql
npm run dev
```

Apply the SQL migration once per new database. Use a sample number when trying the demo callback form.

## Hosting
Configure a D1 binding named DB and the server-side setting EDUCATE_ADMIN_EMAIL for the designated administrator. The hosted admin portal requires trusted Sites sign-in. The included hosting manifest identifies the published demo. Use a separate project identity for a new deployment.

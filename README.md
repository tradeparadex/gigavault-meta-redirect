# Gigavault Meta Redirect

A Cloudflare Pages application that generates dynamic metadata for the Gigavault LP page and redirects users to the Paradex app using Server-Side Rendering (SSR).

## Features

- Dynamically fetches vault data from the Paradex API on each request
- Server-Side Rendering (SSR) to generate HTML with proper metadata tags (title, description, OpenGraph, Twitter cards)
- Includes APR information in the metadata when available
- Automatically redirects users to the Paradex vault page

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

## Deployment

Deploy to Cloudflare Pages:

```bash
npm run deploy
```

Or use the Cloudflare dashboard to connect your repository and deploy automatically.

## How It Works

The Pages function:
1. Uses SSR to fetch vault summary data from the Paradex API on each request
2. Extracts the APR from the last month's return
3. Generates HTML with dynamic metadata including the APR
4. Includes a client-side redirect script to send users to the Paradex app

The `functions/[[path]].js` file handles all routes and performs server-side rendering to ensure search engines and social media crawlers receive the correct metadata.

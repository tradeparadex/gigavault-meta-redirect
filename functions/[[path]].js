function escapeHtml(text) {
  if (text == null) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return String(text).replace(/[&<>"']/g, (char) => map[char]);
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Skip function execution for static assets (Cloudflare Pages will serve these automatically)
  // This is just a safeguard for common static file extensions
  const staticExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.css', '.js', '.woff', '.woff2', '.ttf', '.eot'];
  if (staticExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext))) {
    return context.next();
  }

  // Fetch vault data
  let metadata = {
    title: 'Gigavault LP',
    description: 'The Liquidity Provider vault powers liquidity across all Paradex perpetuals markets through advanced market-making strategies while accruing platform fees',
    apr: null,
  };

  try {
    const response = await fetch('https://api.prod.paradex.trade/v1/vaults/summary?address=0x5f43c92dbe4e995115f351254407e7e84abf04cbe32a536345b9d6c36bc750f', {
      method: 'GET',
      headers: {},
    });
    const data = await response.json();
    const apr = (data.results[0].last_month_return * 100).toFixed(2);
    metadata.title = `Gigavault LP : ${apr}% APR`;
    metadata.apr = apr;
  } catch (error) {
    // Use fallback metadata on error
    console.error('Failed to fetch vault data:', error);
  }

  // Escape all dynamic values to prevent XSS
  const escapedTitle = escapeHtml(metadata.title);
  const escapedDescription = escapeHtml(metadata.description);
  const escapedApr = metadata.apr ? escapeHtml(metadata.apr) : null;
  const escapedOgTitle = escapedApr ? escapeHtml(`Gigavault LP ${escapedApr}% APR`) : 'Gigavault LP';
  const escapedTwitterTitle = escapedApr ? escapeHtml(`Gigavault LP ${escapedApr}% APR`) : 'Gigavault LP';

  // Generate HTML with metadata and redirect
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${escapedTitle}</title>
      <meta name="description" content="${escapedDescription}">
      
      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:title" content="${escapedOgTitle}">
      <meta property="og:description" content="${escapedDescription}">
      <meta property="og:image" content="https://gigavault.paradex.trade/paradex-gigavault.webp">
      
      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image">
      <meta property="twitter:title" content="${escapedTwitterTitle}">
      <meta property="twitter:description" content="${escapedDescription}">
      <meta property="twitter:image" content="https://gigavault.paradex.trade/paradex-gigavault.webp">
      
      <script>
        window.location.replace("https://app.paradex.trade/vaults/0x5f43c92dbe4e995115f351254407e7e84abf04cbe32a536345b9d6c36bc750f");
      </script>
    </head>
    <body>
    </body>
    </html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
  });
}


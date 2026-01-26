// 301 Redirects from old Shopify site to new static site
const redirects = {
  // Pages redirects
  '/pages/aboutus': '/about',
  '/pages/donations': '/',
  '/pages/untitled-sep-14-16-35-23': '/get-started',
  '/pages/how-to-get-started': '/get-started',
  '/pages/8weekprogram': '/',

  // Collections redirect
  '/collections/all': '/services',

  // Product pages redirect to homepage
  '/products/cropped-t-shirt-for-strong-mamas-womens-champion-heritage-tee-mom-shirt-for-flexing-power-mother-to-be-gift-pregnancy-top-1': '/',
  '/products/ceramic-mug-11oz': '/',
  '/products/huszka-weightlifting-tee-comfort-colors': '/',
  '/products/hwc-white-inside': '/',
  '/products/hwc-next-level-tri-blend-tee': '/',
  '/products/hwc-tri-blend': '/',
  '/products/hwc-tri-blend-white-logo': '/',
  '/products/lift-heavy-spiral-bound-journal-for-weightlifting-training-notes': '/',
  '/products/make-it-strong-ceramic-mug-15oz': '/',
  '/products/mens-fitness-v-neck-tee-lift-heavy-live-long': '/',
  '/products/new-design-alert-huszka-weightlifting-club-t-shirt': '/',
  '/products/this-is-the-weightlifting-t-shirt-you-need': '/',
  '/products/this-is-the-weightlifting-tee-you-need': '/',
  '/products/weightlifter-unisex-garment-dyed-t-shirt-workout-tee-fitness-shirt-gym-apparel-muscle-lover-top': '/',
  '/products/weightlifter-unisex-ultra-cotton-tee': '/',
  '/products/motivational-gym-hoodie-get-under-fast-the-weights-wont-wait-unisex-dryblend-sweatshirt': '/',
  '/products/huszka-weightlifting-club-stainless-steel-water-bottle-durable-hydration-for-fitness-enthusiasts': '/',

  // Policy pages redirects
  '/policies/privacy-policy': '/privacy',
  '/policies/terms-of-service': '/terms',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Remove trailing slash for consistent matching (except root)
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    // Decode URL-encoded characters for matching
    const decodedPath = decodeURIComponent(path);

    // Check exact redirects first
    if (redirects[path]) {
      return Response.redirect(new URL(redirects[path], url.origin).href, 301);
    }

    // Check decoded path (handles URL-encoded characters like Cyrillic)
    if (redirects[decodedPath]) {
      return Response.redirect(new URL(redirects[decodedPath], url.origin).href, 301);
    }

    // Catch-all: any /products/* path redirects to homepage
    if (path.startsWith('/products/') || path === '/products') {
      return Response.redirect(new URL('/', url.origin).href, 301);
    }

    // Catch-all: any /collections/* path redirects to services
    if (path.startsWith('/collections/') || path === '/collections') {
      return Response.redirect(new URL('/services', url.origin).href, 301);
    }

    // Catch-all: any /pages/* path redirects to homepage
    if (path.startsWith('/pages/') || path === '/pages') {
      return Response.redirect(new URL('/', url.origin).href, 301);
    }

    // Catch-all: any /policies/* path redirects to homepage
    if (path.startsWith('/policies/') || path === '/policies') {
      return Response.redirect(new URL('/', url.origin).href, 301);
    }

    // No redirect needed, pass through to static assets
    return env.ASSETS.fetch(request);
  },
};

<script>
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/config.js';

	let {
		title,
		description,
		image,
		imageWidth,
		imageHeight,
		type = 'website',
		jsonLd,
		noindex = false
	} = $props();

	const baseUrl = siteConfig.siteUrl.replace(/\/+$/, '');

	let fullTitle = $derived(
		title === siteConfig.title ? siteConfig.title : `${title} — ${siteConfig.title}`
	);
	let canonical = $derived(`${baseUrl}${$page.url.pathname}`.replace(/\/+$/, '') || baseUrl);

	let usingDefaultImage = $derived(!image);
	let absImage = $derived(
		image
			? image.startsWith('http')
				? image
				: `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`
			: `${baseUrl}${siteConfig.defaultOgImage}`
	);

	// Default OG image is 1200x630. For custom images, use provided dims or omit.
	let ogWidth = $derived(usingDefaultImage ? 1200 : imageWidth);
	let ogHeight = $derived(usingDefaultImage ? 630 : imageHeight);

	let jsonLdString = $derived(
		jsonLd ? JSON.stringify(jsonLd).replace(/</g, '\\u003c') : null
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={siteConfig.title} />
	<meta property="og:locale" content={siteConfig.locale} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={absImage} />
	{#if ogWidth}
		<meta property="og:image:width" content={String(ogWidth)} />
	{/if}
	{#if ogHeight}
		<meta property="og:image:height" content={String(ogHeight)} />
	{/if}
	<meta property="og:image:alt" content={fullTitle} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absImage} />

	{#if jsonLdString}
		{@html `<script type="application/ld+json">${jsonLdString}<\/script>`}
	{/if}
</svelte:head>

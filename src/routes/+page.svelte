<script>
	import { siteConfig } from '$lib/config.js';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import Hero from '$lib/components/landing/Hero.svelte';
	import QuienesSomos from '$lib/components/landing/QuienesSomos.svelte';
	import PropuestaValor from '$lib/components/landing/PropuestaValor.svelte';

	let { data } = $props();
	let stats = $derived(data.stats ?? { total: 0, government: 0, countries: 0 });

	let description = $derived(
		`MisTec diseña, desarrolla e implementa soluciones digitales para organizaciones públicas y privadas. ${stats.total} proyectos en ${stats.countries} países.`
	);

	const organizationJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'MisTec',
		url: siteConfig.siteUrl,
		logo: `${siteConfig.siteUrl}/brand/mistec-logo-512.png`,
		image: `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
		description:
			'Empresa dedicada al diseño, desarrollo e implementación de soluciones digitales para organizaciones públicas y privadas. Ingeniería de software, productos digitales y consultoría tecnológica.',
		foundingDate: siteConfig.founded,
		foundingLocation: { '@type': 'Place', name: 'Posadas, Misiones, Argentina' },
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Posadas',
			addressRegion: 'Misiones',
			addressCountry: 'AR'
		},
		contactPoint: {
			'@type': 'ContactPoint',
			email: siteConfig.contact.email,
			telephone: siteConfig.contact.whatsapp,
			contactType: 'customer support',
			availableLanguage: ['Spanish', 'English']
		},
		sameAs: [
			siteConfig.socialLinks.github,
			siteConfig.socialLinks.linkedin,
			siteConfig.socialLinks.instagram
		].filter(Boolean)
	};
</script>

<SeoHead title={siteConfig.title} {description} jsonLd={organizationJsonLd} />

<div use:scrollReveal>
	<Hero />
	<QuienesSomos />
	<PropuestaValor />
</div>

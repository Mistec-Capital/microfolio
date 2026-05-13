<script>
	import { siteConfig } from '$lib/config.js';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import Manifiesto from '$lib/components/landing/Manifiesto.svelte';
	import ObraReciente from '$lib/components/landing/ObraReciente.svelte';
	import Plataformas from '$lib/components/landing/Plataformas.svelte';
	import Gobierno from '$lib/components/landing/Gobierno.svelte';
	import IA from '$lib/components/landing/IA.svelte';
	import Capacidades from '$lib/components/landing/Capacidades.svelte';
	import Contacto from '$lib/components/landing/Contacto.svelte';

	let { data } = $props();
	let projects = $derived(data.projects ?? []);
	let featuredProjects = $derived(data.featuredProjects ?? []);
	let stats = $derived(data.stats ?? { total: 0, government: 0, countries: 0, featured: 0 });
	let obraProjects = $derived(
		(featuredProjects.length >= 9 ? featuredProjects : projects).slice(0, 9)
	);

	let description = $derived(
		`Mistec Capital construye software desde Posadas, Misiones. ${stats.total}+ proyectos en LATAM — plataformas SaaS propias, sistemas para el Estado, IA aplicada y soluciones a medida.`
	);

	const organizationJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Mistec Capital S.R.L.',
		alternateName: 'Mistec Capital',
		legalName: 'MISTEC CAPITAL S.R.L.',
		url: siteConfig.siteUrl,
		logo: `${siteConfig.siteUrl}/mistec.png`,
		image: `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
		description:
			'Compañía de ingeniería de software basada en Posadas, Misiones, Argentina. Construye plataformas SaaS, sistemas para gobiernos municipales y soluciones de IA aplicada para LATAM.',
		foundingDate: siteConfig.founded,
		foundingLocation: {
			'@type': 'Place',
			name: 'Posadas, Misiones, Argentina'
		},
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Posadas',
			addressRegion: 'Misiones',
			addressCountry: 'AR'
		},
		areaServed: ['AR', 'PY', 'UY', 'CL', 'BR', 'BO', 'PE'],
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

<SeoHead
	title={siteConfig.title}
	description={description}
	jsonLd={organizationJsonLd}
/>

<Hero {stats} />
<Manifiesto {stats} />
<ObraReciente projects={obraProjects} totalCount={stats.total} />
<Plataformas {projects} />
<Gobierno {projects} />
<IA {projects} />
<Capacidades />
<Contacto />

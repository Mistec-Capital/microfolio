<script>
	import { siteConfig } from '$lib/config.js';
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
</script>

<svelte:head>
	<title>{siteConfig.title} — {siteConfig.description}</title>
	<meta
		name="description"
		content="MisTec Capital: construimos software desde Posadas, Misiones. {stats.total}+ proyectos en LATAM — SaaS, gobierno digital, IA aplicada y soluciones a medida."
	/>
</svelte:head>

<Hero {stats} />
<Manifiesto {stats} />
<ObraReciente projects={obraProjects} totalCount={stats.total} />
<Plataformas {projects} />
<Gobierno {projects} />
<IA {projects} />
<Capacidades />
<Contacto />

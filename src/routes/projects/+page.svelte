<script>
	import AkProjectCard from '$lib/components/AkProjectCard.svelte';
	import AkFilters from '$lib/components/AkFilters.svelte';
	import Kicker from '$lib/components/editorial/Kicker.svelte';
	import SerialNumber from '$lib/components/editorial/SerialNumber.svelte';
	import { siteConfig } from '$lib/config.js';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';

	let { data } = $props();
	let projects = $derived(data.projects);

	let selectedType = $state('todos');
	let searchTerm = $state('');
	let filteredProjects = $state(data.projects);
</script>

<svelte:head>
	<title>{siteConfig.title} • Proyectos</title>
	<meta name="description" content="Índice completo de proyectos de Mistec Capital." />
</svelte:head>

<div use:scrollReveal>
	<!-- Section label -->
	<div
		class="flex items-baseline gap-6 pb-4 mb-16 border-b border-[#2A2A28] reveal flex-wrap"
	>
		<SerialNumber n={3} />
		<Kicker>/ ÍNDICE COMPLETO</Kicker>
		<Kicker class="ml-auto">{String(projects.length).padStart(3, '0')} OBRAS</Kicker>
	</div>

	<!-- Title -->
	<div class="grid grid-cols-12 gap-8 mb-16">
		<h1
			class="col-span-12 lg:col-span-8 text-headline font-display text-[#E8E3D6] reveal reveal-delay-1"
		>
			Índice completo de la obra.
		</h1>
		<p
			class="col-span-12 lg:col-span-4 text-body text-[#8A857A] pt-3 reveal reveal-delay-2"
		>
			Todos los proyectos que hemos construido y mantenido desde 2020 — filtrables por categoría
			y búsqueda por título, descripción o tags.
		</p>
	</div>

	<!-- Filters -->
	<AkFilters {projects} bind:searchTerm bind:selectedType bind:filteredProjects />

	<!-- Projects grid (border grid, no gaps) -->
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#2A2A28]"
	>
		{#each filteredProjects as project (project.slug)}
			<AkProjectCard {project} />
		{/each}
	</div>

	<!-- Empty state -->
	{#if filteredProjects.length === 0}
		<div class="py-20 text-center">
			<Kicker>SIN PROYECTOS QUE COINCIDAN</Kicker>
		</div>
	{/if}
</div>

<script>
	import AkProjectCard from '$lib/components/AkProjectCard.svelte';
	import AkFilters from '$lib/components/AkFilters.svelte';
	import Kicker from '$lib/components/editorial/Kicker.svelte';
	import SerialNumber from '$lib/components/editorial/SerialNumber.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';

	let { data } = $props();
	let projects = $derived(data.projects);

	let selectedType = $state('todos');
	let searchTerm = $state('');
	let filteredProjects = $state(data.projects);

	let description = $derived(
		`Índice completo de los ${projects.length} proyectos construidos por Mistec Capital desde 2020 — plataformas SaaS, sistemas de gobierno, IA aplicada y desarrollos a medida en LATAM.`
	);
</script>

<SeoHead title="Proyectos" {description} />

<div use:scrollReveal>
	<!-- Section label -->
	<div class="reveal mb-16 flex flex-wrap items-baseline gap-6 border-b border-[#2A2A28] pb-4">
		<SerialNumber n={3} />
		<Kicker>/ ÍNDICE COMPLETO</Kicker>
		<Kicker class="ml-auto">{String(projects.length).padStart(3, '0')} OBRAS</Kicker>
	</div>

	<!-- Title -->
	<div class="mb-16 grid grid-cols-12 gap-8">
		<h1
			class="text-headline font-display reveal reveal-delay-1 col-span-12 text-[#E8E3D6] lg:col-span-8"
		>
			Índice completo de la obra.
		</h1>
		<p class="text-body reveal reveal-delay-2 col-span-12 pt-3 text-[#8A857A] lg:col-span-4">
			Todos los proyectos que hemos construido y mantenido desde 2020 — filtrables por categoría y
			búsqueda por título, descripción o tags.
		</p>
	</div>

	<!-- Filters -->
	<AkFilters {projects} bind:searchTerm bind:selectedType bind:filteredProjects />

	<!-- Projects grid (border grid, no gaps) -->
	<div class="grid grid-cols-1 border-t border-l border-[#2A2A28] md:grid-cols-2 lg:grid-cols-3">
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

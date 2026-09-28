<script>
	import AkProjectCard from '$lib/components/AkProjectCard.svelte';
	import AkFilters from '$lib/components/AkFilters.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';

	let { data } = $props();
	let projects = $derived(data.projects);

	let selectedType = $state('todos');
	let searchTerm = $state('');
	let filteredProjects = $state(data.projects);

	// Celdas vacías para cerrar la última fila de la grilla (si no, el fondo `rule` queda a la vista)
	let huecosMd = $derived([...Array(filteredProjects.length % 2).keys()]);
	let huecosLg = $derived([...Array((3 - (filteredProjects.length % 3)) % 3).keys()]);

	let description = $derived(
		`Índice de los ${projects.length} proyectos desarrollados por MisTec desde 2020: productos digitales, sistemas para organismos públicos y desarrollos a medida.`
	);
</script>

<SeoHead title="Proyectos" {description} />

<div use:scrollReveal>
	<header class="grid-12">
		<p class="t-kicker reveal col-span-12">Índice</p>
		<h1 class="t-titulo reveal reveal-1 mt-s2 col-span-12 lg:col-span-8">
			Todos los <span class="accent">proyectos</span>.
		</h1>
		<p class="t-bajada reveal reveal-2 mt-s2 col-span-12">
			{projects.length} proyectos desde 2020, filtrables por categoría y búsqueda.
		</p>
	</header>

	<div class="mt-s4">
		<AkFilters {projects} bind:searchTerm bind:selectedType bind:filteredProjects />
	</div>

	{#if filteredProjects.length > 0}
		<div class="grid-rule mt-s3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredProjects as project (project.slug)}
				<AkProjectCard {project} />
			{/each}
			{#each huecosMd as hueco (hueco)}
				<div class="hidden md:block lg:hidden" aria-hidden="true"></div>
			{/each}
			{#each huecosLg as hueco (hueco)}
				<div class="hidden lg:block" aria-hidden="true"></div>
			{/each}
		</div>
	{:else}
		<p class="t-cuerpo mt-s3 text-mist">No hay proyectos que coincidan con la búsqueda.</p>
	{/if}
</div>

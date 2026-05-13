<script>
	import { base } from '$app/paths';
	import { DataHandler } from '@vincjo/datatables/legacy';
	import Datatable from '$lib/components/Datatable.svelte';
	import ThSort from '$lib/components/ThSort.svelte';
	import RowsPerPage from '$lib/components/RowsPerPage.svelte';
	import RowCount from '$lib/components/RowCount.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import AkFilters from '$lib/components/AkFilters.svelte';
	import Kicker from '$lib/components/editorial/Kicker.svelte';
	import SerialNumber from '$lib/components/editorial/SerialNumber.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import { siteConfig } from '$lib/config.js';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';

	let { data } = $props();
	let projects = $derived(data.projects);

	let handler = $state();

	let selectedType = $state('todos');
	let searchTerm = $state('');
	let filteredProjects = $state(data.projects);

	let rows = $derived(handler ? handler.getRows() : []);

	$effect(() => {
		if (filteredProjects && filteredProjects.length >= 0) {
			handler = new DataHandler(filteredProjects, { rowsPerPage: 12 });
		}
	});

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toISOString().slice(0, 7);
	}

	function truncate(text, max = 60) {
		if (!text) return '';
		return text.length > max ? text.substring(0, max) + '…' : text;
	}

	function categoryLabel(type) {
		switch ((type || '').toLowerCase()) {
			case 'saas':
				return 'SaaS';
			case 'mobile-app':
				return 'App Móvil';
			case 'e-commerce':
				return 'E-commerce';
			case 'gobierno-digital':
				return 'Gobierno';
			case 'logistica':
				return 'Logística';
			case 'recursos-humanos':
				return 'RRHH';
			case 'gestion-administrativa':
				return 'Admin';
			case 'gestion-deportiva':
				return 'Deportiva';
			case 'gis-mapas':
				return 'GIS';
			case 'ia':
				return 'IA';
			case 'iot':
				return 'IoT';
			default:
				return type;
		}
	}
</script>

<svelte:head>
	<title>{siteConfig.title} • Lista de Proyectos</title>
	<meta name="description" content="Lista ordenable con búsqueda de los proyectos." />
</svelte:head>

<div use:scrollReveal>
	<!-- Section label -->
	<div
		class="flex items-baseline gap-6 pb-4 mb-16 border-b border-[#2A2A28] reveal flex-wrap"
	>
		<SerialNumber n={5} />
		<Kicker>/ TABLA EDITORIAL</Kicker>
		<Kicker class="ml-auto">{String(projects.length).padStart(3, '0')} REGISTROS</Kicker>
	</div>

	<!-- Title -->
	<div class="grid grid-cols-12 gap-8 mb-16">
		<h1
			class="col-span-12 lg:col-span-8 text-headline font-display text-[#E8E3D6] reveal reveal-delay-1"
		>
			Datos ordenables.
		</h1>
		<p
			class="col-span-12 lg:col-span-4 text-body text-[#8A857A] pt-3 reveal reveal-delay-2"
		>
			Ordenable por columna, paginado y con búsqueda combinada por título, descripción, tags y
			ubicación.
		</p>
	</div>

	<!-- Filters -->
	<AkFilters
		{projects}
		bind:searchTerm
		bind:selectedType
		bind:filteredProjects
		showResultsCount={false}
	/>

	<!-- Table controls -->
	{#if handler}
		<div
			class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 font-mono text-xs text-[#8A857A] reveal"
		>
			<div class="flex items-center gap-6">
				<RowsPerPage {handler} />
				<RowCount {handler} />
			</div>
		</div>
	{/if}

	<!-- Datatable -->
	{#if handler}
		<div class="overflow-x-auto border border-[#2A2A28]">
			<Datatable {handler} class="w-full">
				<table class="w-full">
					<thead>
						<tr class="border-b border-[#2A2A28] bg-[#141413]">
							<ThSort
								{handler}
								orderBy="title"
								class="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#FFB840]"
							>
								Título
							</ThSort>
							<ThSort
								{handler}
								orderBy="type"
								class="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#FFB840]"
							>
								Tipo
							</ThSort>
							<ThSort
								{handler}
								orderBy="location"
								class="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#FFB840]"
							>
								Ubicación
							</ThSort>
							<ThSort
								{handler}
								orderBy="date"
								class="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#FFB840]"
							>
								Fecha
							</ThSort>
							<th
								class="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#FFB840]"
							>
								Descripción
							</th>
							<th
								class="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#FFB840]"
							>
								Tags
							</th>
							<th
								class="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-[#FFB840]"
							>
								Acción
							</th>
						</tr>
					</thead>
					<tbody>
						{#each $rows as project (project.slug)}
							<tr
								class="border-t border-[#2A2A28] hover:bg-[#141413] transition-colors group"
							>
								<td class="px-4 py-3">
									<a
										href="{base}/projects/{project.slug}"
										class="font-display text-[#E8E3D6] font-medium hover:text-[#FFB840] transition-colors"
									>
										{project.title}
									</a>
								</td>
								<td class="px-4 py-3">
									<span class="tag-pill">{categoryLabel(project.type)}</span>
								</td>
								<td class="px-4 py-3 font-mono text-xs text-[#8A857A]">
									{project.location || '—'}
								</td>
								<td class="px-4 py-3 font-mono text-xs text-[#8A857A] tabular-nums">
									{formatDate(project.date)}
								</td>
								<td class="px-4 py-3 text-sm text-[#8A857A] max-w-md">
									{truncate(project.description)}
								</td>
								<td class="px-4 py-3">
									{#if project.tags}
										<div class="flex flex-wrap gap-1">
											{#each project.tags.slice(0, 3) as tag}
												<span
													class="font-mono text-[10px] text-[#8A857A]/80 px-1.5 py-0.5 border border-[#2A2A28]"
													>{tag}</span
												>
											{/each}
											{#if project.tags.length > 3}
												<span
													class="font-mono text-[10px] text-[#FFB840]/80 px-1.5 py-0.5"
													>+{project.tags.length - 3}</span
												>
											{/if}
										</div>
									{/if}
								</td>
								<td class="px-4 py-3 text-right">
									<a
										href="{base}/projects/{project.slug}"
										class="inline-flex items-center justify-center border border-[#2A2A28] text-[#8A857A] hover:border-[#FFB840] hover:text-[#FFB840] rounded-full p-2 transition-colors"
										aria-label="Ver proyecto"
									>
										<IconArrowUpRight class="size-3.5" />
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</Datatable>
		</div>

		<!-- Pagination -->
		<div class="flex justify-center mt-8 font-mono text-xs">
			<Pagination {handler} />
		</div>
	{:else}
		<div class="flex items-center justify-center py-12">
			<p class="font-mono text-xs text-[#8A857A]">CARGANDO REGISTROS...</p>
		</div>
	{/if}
</div>

<style>
	:global(.datatable-search input) {
		background: transparent !important;
		border: 1px solid #2a2a28 !important;
		color: #e8e3d6 !important;
		font-family: 'JetBrains Mono', ui-monospace, monospace !important;
	}
	:global(.datatable-search input:focus) {
		border-color: #ffb840 !important;
		outline: none !important;
	}
</style>

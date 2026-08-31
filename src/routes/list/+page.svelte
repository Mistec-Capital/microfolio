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
	import SeoHead from '$lib/components/SeoHead.svelte';
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

<SeoHead
	title="Lista de Proyectos"
	description="Lista ordenable con búsqueda de los {projects.length} proyectos de Mistec Capital — filtrable por categoría, ubicación, año y tags."
/>

<div use:scrollReveal>
	<!-- Section label -->
	<div class="reveal mb-16 flex flex-wrap items-baseline gap-6 border-b border-[#2A2A28] pb-4">
		<SerialNumber n={5} />
		<Kicker>/ TABLA EDITORIAL</Kicker>
		<Kicker class="ml-auto">{String(projects.length).padStart(3, '0')} REGISTROS</Kicker>
	</div>

	<!-- Title -->
	<div class="mb-16 grid grid-cols-12 gap-8">
		<h1
			class="text-headline font-display reveal reveal-delay-1 col-span-12 text-[#E8E3D6] lg:col-span-8"
		>
			Datos ordenables.
		</h1>
		<p class="text-body reveal reveal-delay-2 col-span-12 pt-3 text-[#8A857A] lg:col-span-4">
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
			class="reveal mb-6 flex flex-col gap-4 font-mono text-xs text-[#8A857A] sm:flex-row sm:items-center sm:justify-between"
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
								class="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-[#FFB840] uppercase"
							>
								Título
							</ThSort>
							<ThSort
								{handler}
								orderBy="type"
								class="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-[#FFB840] uppercase"
							>
								Tipo
							</ThSort>
							<ThSort
								{handler}
								orderBy="location"
								class="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-[#FFB840] uppercase"
							>
								Ubicación
							</ThSort>
							<ThSort
								{handler}
								orderBy="date"
								class="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-[#FFB840] uppercase"
							>
								Fecha
							</ThSort>
							<th
								class="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-[#FFB840] uppercase"
							>
								Descripción
							</th>
							<th
								class="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-[#FFB840] uppercase"
							>
								Tags
							</th>
							<th
								class="px-4 py-3 text-right font-mono text-[10px] tracking-[0.12em] text-[#FFB840] uppercase"
							>
								Acción
							</th>
						</tr>
					</thead>
					<tbody>
						{#each $rows as project (project.slug)}
							<tr class="group border-t border-[#2A2A28] transition-colors hover:bg-[#141413]">
								<td class="px-4 py-3">
									<a
										href="{base}/projects/{project.slug}"
										class="font-display font-medium text-[#E8E3D6] transition-colors hover:text-[#FFB840]"
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
								<td class="max-w-md px-4 py-3 text-sm text-[#8A857A]">
									{truncate(project.description)}
								</td>
								<td class="px-4 py-3">
									{#if project.tags}
										<div class="flex flex-wrap gap-1">
											{#each project.tags.slice(0, 3) as tag}
												<span
													class="border border-[#2A2A28] px-1.5 py-0.5 font-mono text-[10px] text-[#8A857A]/80"
													>{tag}</span
												>
											{/each}
											{#if project.tags.length > 3}
												<span class="px-1.5 py-0.5 font-mono text-[10px] text-[#FFB840]/80"
													>+{project.tags.length - 3}</span
												>
											{/if}
										</div>
									{/if}
								</td>
								<td class="px-4 py-3 text-right">
									<a
										href="{base}/projects/{project.slug}"
										class="inline-flex items-center justify-center rounded-full border border-[#2A2A28] p-2 text-[#8A857A] transition-colors hover:border-[#FFB840] hover:text-[#FFB840]"
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
		<div class="mt-8 flex justify-center font-mono text-xs">
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

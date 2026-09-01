<script>
	import { base } from '$app/paths';
	import { DataHandler } from '@vincjo/datatables/legacy';
	import Datatable from '$lib/components/Datatable.svelte';
	import ThSort from '$lib/components/ThSort.svelte';
	import RowsPerPage from '$lib/components/RowsPerPage.svelte';
	import RowCount from '$lib/components/RowCount.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import AkFilters from '$lib/components/AkFilters.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import { categoryLabel } from '$lib/utils/categories.js';

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
		return dateString ? new Date(dateString).toISOString().slice(0, 7) : '';
	}

	function truncate(text, max = 60) {
		if (!text) return '';
		return text.length > max ? text.substring(0, max) + '…' : text;
	}

	const th = 'px-s2 py-s2 text-left';
	const td = 'px-s2 py-s2 align-top';
</script>

<SeoHead
	title="Lista de proyectos"
	description="Tabla ordenable de los {projects.length} proyectos de MisTec, con búsqueda por título, descripción, tags y ubicación."
/>

<div use:scrollReveal>
	<header class="grid-12">
		<p class="t-kicker reveal col-span-12">Lista</p>
		<h1 class="t-titulo reveal reveal-1 mt-s2 col-span-12 lg:col-span-8">
			Proyectos en <span class="accent">tabla</span>.
		</h1>
		<p class="t-bajada reveal reveal-2 mt-s2 col-span-12">
			Ordenable por columna, con búsqueda y paginado.
		</p>
	</header>

	<div class="mt-s4">
		<AkFilters
			{projects}
			bind:searchTerm
			bind:selectedType
			bind:filteredProjects
			showResultsCount={false}
		/>
	</div>

	{#if handler}
		<div class="mt-s3 gap-s2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
			<RowsPerPage {handler} />
			<RowCount {handler} />
		</div>

		<div class="mt-s2 border-rule overflow-x-auto border">
			<Datatable class="w-full">
				<table class="w-full">
					<thead>
						<tr class="border-rule bg-ink-2 border-b">
							<ThSort {handler} orderBy="title" class={th}>Título</ThSort>
							<ThSort {handler} orderBy="type" class={th}>Tipo</ThSort>
							<ThSort {handler} orderBy="location" class={th}>Ubicación</ThSort>
							<ThSort {handler} orderBy="date" class={th}>Fecha</ThSort>
							<th class="{th} t-kicker">Descripción</th>
							<th class="{th} t-kicker">Tags</th>
							<th class="{th} text-right"><span class="sr-only">Ver</span></th>
						</tr>
					</thead>
					<tbody>
						{#each $rows as project (project.slug)}
							<tr
								class="border-rule hover:bg-ink-2 border-t"
								style="transition: background-color var(--d-breve) var(--ease)"
							>
								<td class={td}>
									<a href="{base}/projects/{project.slug}" class="btn-text">{project.title}</a>
								</td>
								<td class={td}><span class="tag">{categoryLabel(project.type)}</span></td>
								<td class="{td} t-nota">{project.location || '—'}</td>
								<td class="{td} t-nota tnum whitespace-nowrap">{formatDate(project.date)}</td>
								<td class="{td} t-nota max-w-md">{truncate(project.description)}</td>
								<td class={td}>
									{#if project.tags}
										<div class="gap-s1 flex flex-wrap">
											{#each project.tags.slice(0, 3) as tag (tag)}
												<span class="tag">{tag}</span>
											{/each}
											{#if project.tags.length > 3}
												<span class="t-nota">+{project.tags.length - 3}</span>
											{/if}
										</div>
									{/if}
								</td>
								<td class="{td} text-right">
									<a
										href="{base}/projects/{project.slug}"
										class="link inline-flex"
										aria-label="Ver {project.title}"
									>
										<Icon name="arrow-up-right" size={16} />
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</Datatable>
		</div>

		<div class="mt-s3">
			<Pagination {handler} />
		</div>
	{:else}
		<p class="t-nota mt-s3">Cargando registros…</p>
	{/if}
</div>

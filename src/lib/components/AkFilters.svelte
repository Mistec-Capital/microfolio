<script>
	import { categoryLabel } from '$lib/utils/categories.js';

	let {
		projects,
		searchTerm = $bindable(''),
		selectedType = $bindable('todos'),
		showResultsCount = true,
		filteredProjects = $bindable([])
	} = $props();

	let projectTypes = $derived(['todos', ...new Set(projects.map((p) => p.type))]);

	$effect(() => {
		const term = searchTerm.toLowerCase();
		filteredProjects = projects
			.filter((project) => {
				const matchesType = selectedType === 'todos' || project.type === selectedType;
				const matchesSearch =
					term === '' ||
					project.title?.toLowerCase().includes(term) ||
					project.description?.toLowerCase().includes(term) ||
					project.tags?.some((tag) => tag.toLowerCase().includes(term));
				return matchesType && matchesSearch;
			})
			.sort((a, b) => new Date(b.date) - new Date(a.date));
	});
</script>

<div class="reveal gap-s2 border-rule pb-s3 flex flex-col border-b">
	<label class="block max-w-md">
		<span class="sr-only">Buscar proyectos</span>
		<input
			type="search"
			class="input"
			placeholder="Buscar por título, descripción o tag"
			bind:value={searchTerm}
		/>
	</label>

	<div class="gap-s1 flex flex-wrap" role="group" aria-label="Filtrar por categoría">
		{#each projectTypes as type (type)}
			<button
				type="button"
				class="tag {selectedType === type ? 'tag-active' : ''}"
				aria-pressed={selectedType === type}
				onclick={() => (selectedType = type)}
			>
				{categoryLabel(type)}
			</button>
		{/each}
	</div>

	{#if showResultsCount}
		<p class="t-nota">
			<span class="tnum text-bone">{filteredProjects.length}</span>
			{filteredProjects.length === 1 ? 'proyecto' : 'proyectos'}
		</p>
	{/if}
</div>

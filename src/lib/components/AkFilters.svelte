<script>
	import IconSearch from '~icons/lucide/search';

	let {
		projects,
		searchTerm = $bindable(''),
		selectedType = $bindable('todos'),
		showResultsCount = true,
		filteredProjects = $bindable([])
	} = $props();

	function categoryLabel(type) {
		switch ((type || '').toLowerCase()) {
			case 'todos':
				return 'Todos';
			case 'saas':
				return 'SaaS';
			case 'mobile-app':
				return 'App Móvil';
			case 'e-commerce':
				return 'E-commerce';
			case 'gobierno-digital':
				return 'Gobierno Digital';
			case 'logistica':
				return 'Logística';
			case 'recursos-humanos':
				return 'RRHH';
			case 'gestion-administrativa':
				return 'Administrativo';
			case 'gestion-deportiva':
				return 'Gestión Deportiva';
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

	let projectTypes = $derived(['todos', ...new Set(projects.map((p) => p.type))]);

	$effect(() => {
		filteredProjects = projects
			.filter((project) => {
				const matchesType = selectedType === 'todos' || project.type === selectedType;
				const matchesSearch =
					searchTerm === '' ||
					project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					project.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
				return matchesType && matchesSearch;
			})
			.sort((a, b) => new Date(b.date) - new Date(a.date));
	});
</script>

<div class="reveal mb-12 flex flex-col gap-5 border-b border-[#2A2A28] pb-6">
	<!-- Search -->
	<div class="relative max-w-md">
		<IconSearch class="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#8A857A]" />
		<input
			type="text"
			placeholder="Buscar proyectos..."
			bind:value={searchTerm}
			class="w-full rounded-sm border border-[#2A2A28] bg-transparent py-2 pr-4 pl-9 font-mono text-sm text-[#E8E3D6] placeholder-[#8A857A]/70 transition-colors focus:border-[#FFB840] focus:outline-none"
		/>
	</div>

	<!-- Category tag pills -->
	<div class="flex flex-wrap gap-2">
		{#each projectTypes as type}
			<button
				onclick={() => (selectedType = type)}
				class="cursor-pointer transition-all duration-200 {selectedType === type
					? 'tag-pill-active'
					: 'tag-pill hover:border-[#8A857A] hover:text-[#E8E3D6]'}"
			>
				{categoryLabel(type)}
			</button>
		{/each}
	</div>

	<!-- Results count -->
	{#if showResultsCount}
		<p class="font-mono text-[11px] tracking-wider text-[#8A857A] uppercase">
			<span class="text-[#FFB840] tabular-nums"
				>{String(filteredProjects.length).padStart(3, '0')}</span
			>
			proyecto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1
				? 's'
				: ''}
		</p>
	{/if}
</div>

<script>
	import { base } from '$app/paths';
	import AkOptimizedImage from './AkOptimizedImage.svelte';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';
	import Kicker from '$lib/components/editorial/Kicker.svelte';
	import Rule from '$lib/components/editorial/Rule.svelte';
	import Marginalia from '$lib/components/editorial/Marginalia.svelte';

	let { project, class: className = '' } = $props();

	function shortTitle(title) {
		return (title || '').split(' - ')[0].split(' — ')[0];
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
				return type || 'Proyecto';
		}
	}

	let year = $derived(project?.date ? new Date(project.date).getFullYear().toString() : '');
</script>

<a
	href="{base}/projects/{project.slug}"
	class="group block overflow-hidden border-r border-b border-[#2A2A28] transition-colors duration-300 hover:bg-[#141413] {className}"
>
	<!-- Duotone image -->
	<div class="relative h-48 overflow-hidden bg-[#141413]">
		<AkOptimizedImage
			src={project.thumbnailSrc}
			alt={project.title}
			class="h-full w-full object-cover opacity-70 contrast-125 grayscale transition-all duration-500 group-hover:opacity-90 group-hover:grayscale-0"
			hasWebP={project.hasWebP || false}
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"
		></div>
		{#if project.featured}
			<div class="absolute top-3 right-3">
				<Kicker tone="amber">★ DESTACADO</Kicker>
			</div>
		{/if}
	</div>

	<div class="p-6">
		<!-- Top meta -->
		<div class="mb-4 flex items-center justify-between">
			<Kicker>{categoryLabel(project.type)}</Kicker>
			<Kicker>{year}</Kicker>
		</div>

		<Rule />

		<h3
			class="font-display mt-4 mb-3 text-xl leading-tight font-semibold tracking-tight text-[#E8E3D6] transition-colors group-hover:text-[#FFB840]"
		>
			{shortTitle(project.title)}
		</h3>

		<p class="font-body mb-5 line-clamp-3 text-sm leading-relaxed text-[#8A857A]">
			{project.description}
		</p>

		<div class="flex items-end justify-between border-t border-[#2A2A28] pt-4">
			<Marginalia class="max-w-[75%] !leading-tight !text-[#8A857A]/80">
				{project.location}
			</Marginalia>
			<IconArrowUpRight
				class="h-4 w-4 text-[#8A857A] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#FFB840]"
			/>
		</div>
	</div>
</a>

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

	let year = $derived(
		project?.date ? new Date(project.date).getFullYear().toString() : ''
	);
</script>

<a
	href="{base}/projects/{project.slug}"
	class="group block border-r border-b border-[#2A2A28] overflow-hidden hover:bg-[#141413] transition-colors duration-300 {className}"
>
	<!-- Duotone image -->
	<div class="relative h-48 overflow-hidden bg-[#141413]">
		<AkOptimizedImage
			src={project.thumbnailSrc}
			alt={project.title}
			class="w-full h-full object-cover opacity-70 grayscale contrast-125 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500"
			hasWebP={project.hasWebP || false}
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>
		{#if project.featured}
			<div class="absolute top-3 right-3">
				<Kicker tone="amber">★ DESTACADO</Kicker>
			</div>
		{/if}
	</div>

	<div class="p-6">
		<!-- Top meta -->
		<div class="flex items-center justify-between mb-4">
			<Kicker>{categoryLabel(project.type)}</Kicker>
			<Kicker>{year}</Kicker>
		</div>

		<Rule />

		<h3
			class="font-display font-semibold text-[#E8E3D6] text-xl leading-tight tracking-tight mt-4 mb-3 group-hover:text-[#FFB840] transition-colors"
		>
			{shortTitle(project.title)}
		</h3>

		<p class="font-body text-[#8A857A] text-sm leading-relaxed line-clamp-3 mb-5">
			{project.description}
		</p>

		<div class="flex items-end justify-between pt-4 border-t border-[#2A2A28]">
			<Marginalia class="!text-[#8A857A]/80 !leading-tight max-w-[75%]">
				{project.location}
			</Marginalia>
			<IconArrowUpRight
				class="w-4 h-4 text-[#8A857A] group-hover:text-[#FFB840] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
			/>
		</div>
	</div>
</a>

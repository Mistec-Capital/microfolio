<script>
	import { base } from '$app/paths';
	import AkOptimizedImage from './AkOptimizedImage.svelte';
	import Icon from './Icon.svelte';
	import { categoryLabel, isInDevelopment, yearOf } from '$lib/utils/categories.js';

	let { project, class: className = '' } = $props();

	function shortTitle(title) {
		return (title || '').split(' - ')[0].split(' — ')[0];
	}
</script>

<a href="{base}/projects/{project.slug}" class="card {className}">
	<!-- Imagen plana, cortada por la retícula. Sin filtros ni degradados. -->
	<div class="border-rule bg-ink-2 aspect-[16/10] overflow-hidden border-b">
		<AkOptimizedImage
			src={project.thumbnailSrc}
			alt=""
			class="h-full w-full object-cover"
			hasWebP={project.hasWebP || false}
		/>
	</div>

	<div class="p-s3 flex flex-1 flex-col">
		<p class="t-nota gap-s1 flex flex-wrap items-center">
			<span>{categoryLabel(project.type)} · <span class="tnum">{yearOf(project.date)}</span></span>
			{#if isInDevelopment(project.status)}
				<span class="status-dot" aria-hidden="true"></span>
				<span>En desarrollo</span>
			{/if}
		</p>

		<h3 class="t-cuerpo mt-s2 font-medium">{shortTitle(project.title)}</h3>
		<p class="t-nota mt-s1 line-clamp-2">{project.description}</p>

		<div class="mt-s3 gap-s2 border-rule pt-s2 flex flex-1 items-end justify-between border-t">
			<span class="t-nota">{project.location || ''}</span>
			<Icon name="arrow-up-right" size={16} class="text-mist" />
		</div>
	</div>
</a>

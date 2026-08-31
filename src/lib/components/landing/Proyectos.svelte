<script>
	import { base } from '$app/paths';
	import SectionHead from './SectionHead.svelte';
	import AkProjectCard from '$lib/components/AkProjectCard.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { projects, total } = $props();
</script>

<SectionHead id="proyectos" n="06" label="Proyectos">
	{#snippet title()}
		Proyectos <span class="accent">destacados</span>.
	{/snippet}
	{#snippet lead()}
		Una selección de plataformas propias, sistemas para organismos públicos y desarrollos a medida,
		en producción o en desarrollo activo.
	{/snippet}

	<div class="grid-rule grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#each projects as project (project.slug)}
			<AkProjectCard {project} class="reveal" />
		{/each}
	</div>

	<p class="reveal mt-s3">
		<a class="btn-text" href="{base}/projects">
			Ver los {total} proyectos <Icon name="arrow-right" size={20} />
		</a>
	</p>
</SectionHead>

<script>
	import SeoHead from '$lib/components/SeoHead.svelte';

	let { data } = $props();
	let page = $derived(data.page);
</script>

<SeoHead title={page.title} description={page.description} />

<header class="grid-12">
	<p class="t-kicker col-span-12">Institucional</p>
	<h1 class="t-titulo mt-s2 col-span-12 lg:col-span-8">{page.title}</h1>
	{#if page.description}
		<p class="t-bajada mt-s2 col-span-12">{page.description}</p>
	{/if}
</header>

<div class="grid-12 mt-s4">
	<article class="prose-brand col-span-12 lg:col-span-8">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- Markdown propio, renderizado en build -->
		{@html page.content}
	</article>
</div>

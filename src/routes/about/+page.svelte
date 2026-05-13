<script>
	import SeoHead from '$lib/components/SeoHead.svelte';
	let { data } = $props();
	let page = $derived(data.page);
</script>

<SeoHead title={page.title} description={page.description} />

<header class="mb-8">
	<h1 class="font-display text-headline text-[#E8E3D6] mb-3">
		{page.title}
	</h1>
	{#if page.description}
		<p class="text-lg text-[#8A857A] max-w-[58ch]">
			{page.description}
		</p>
	{/if}
</header>

<article class="prose prose-invert max-w-none
		prose-headings:font-display prose-headings:tracking-tight prose-headings:text-[#E8E3D6]
		prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
		prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#FFB840]
		prose-p:text-[#E8E3D6]/85 prose-p:leading-relaxed
		prose-li:text-[#E8E3D6]/85
		prose-strong:text-[#E8E3D6]
		prose-a:text-[#FFB840] hover:prose-a:text-[#CC8F1A]">
	{@html page.content}
</article>

<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import AkHeader from '$lib/components/AkHeader.svelte';
	import AkFooter from '$lib/components/AkFooter.svelte';

	let { children } = $props();

	// La landing compone sus propias secciones a sangre; el resto usa el contenedor.
	let isHome = $derived(
		$page.url.pathname === base + '/' || $page.url.pathname === base || $page.url.pathname === '/'
	);
</script>

<AkHeader />

<main class="bg-ink">
	{#if isHome}
		{@render children()}
	{:else}
		<div class="container-brand pb-s5 pt-[calc(64px_+_var(--s-4))]">
			{@render children()}
		</div>
	{/if}
</main>

<AkFooter />

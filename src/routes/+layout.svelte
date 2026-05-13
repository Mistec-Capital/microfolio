<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import AkHeader from '$lib/components/AkHeader.svelte';
	import AkFooter from '$lib/components/AkFooter.svelte';

	let { children } = $props();

	// On the landing the sections are full-bleed; other routes use the
	// constrained editorial container.
	let isHome = $derived(
		$page.url.pathname === base + '/' || $page.url.pathname === base || $page.url.pathname === '/'
	);
</script>

<AkHeader />

{#if isHome}
	<main class="bg-[#0A0A0A]">
		{@render children()}
	</main>
{:else}
	<main class="bg-[#0A0A0A] pt-24 pb-24">
		<div class="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
			{@render children()}
		</div>
	</main>
{/if}

<AkFooter />

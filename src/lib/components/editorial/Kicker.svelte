<script>
	let { tone = 'muted', as = 'span', class: className = '', children } = $props();
	let toneClass = $derived(
		tone === 'amber' ? 'kicker-amber' : tone === 'bone' ? 'kicker-bone' : 'kicker'
	);
</script>

<svelte:element this={as} class="{toneClass} {className}">
	{@render children?.()}
</svelte:element>

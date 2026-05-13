<script>
	let { as = 'aside', class: className = '', children } = $props();
</script>

<svelte:element this={as} class="marginalia {className}">
	{@render children?.()}
</svelte:element>

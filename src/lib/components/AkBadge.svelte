<script>
	let { children, small = false, class: className } = $props();
</script>

{#if !small}
	<span
		class="bg-accent inline-block rounded-full px-3 py-1 text-sm font-medium capitalize text-white {className}"
	>
		{@render children()}
	</span>
{:else}
	<span class="bg-accent rounded px-2 py-1 text-xs font-medium text-white {className}">
		{@render children()}
	</span>
{/if}

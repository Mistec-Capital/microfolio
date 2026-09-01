<script>
	let { handler, orderBy, children, class: className = '', ...props } = $props();

	function handleSort() {
		handler.sort(orderBy);
	}

	let sortState = $derived(handler.getSort());
</script>

<th class={className} {...props}>
	<button
		type="button"
		onclick={handleSort}
		class="link t-kicker gap-s1 flex w-full cursor-pointer items-center text-left"
	>
		{@render children()}
		{#if $sortState && $sortState.identifier === orderBy}
			<span class="t-nota" aria-hidden="true">{$sortState.direction === 'asc' ? '↑' : '↓'}</span>
		{/if}
	</button>
</th>

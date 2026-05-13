<script>
	let { handler, orderBy, children, class: className = '', ...props } = $props();

	function handleSort() {
		handler.sort(orderBy);
	}

	let sortState = $derived(handler.getSort());
</script>

<th class={className} {...props}>
	<button
		onclick={handleSort}
		class="flex w-full items-center gap-1.5 px-1 py-1 text-left cursor-pointer text-[#FFB840] hover:text-[#E8E3D6] transition-colors"
	>
		{@render children()}
		{#if $sortState && $sortState.identifier === orderBy}
			<span class="text-[10px] tabular-nums">
				{$sortState.direction === 'asc' ? '▲' : '▼'}
			</span>
		{/if}
	</button>
</th>

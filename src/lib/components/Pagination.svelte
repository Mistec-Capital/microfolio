<script>
	let { handler, class: className = '', ...props } = $props();

	let pageNumber = $derived(handler.getPageNumber());
	let pageCount = $derived(handler.getPageCount());
	let pages = $derived(handler.getPages({ ellipsis: true }));

	function goToPage(page) {
		handler.setPage(page);
	}

	function previousPage() {
		handler.setPage('previous');
	}

	function nextPage() {
		handler.setPage('next');
	}
</script>

{#if $pageCount > 1}
	<nav class="flex items-center gap-1 {className}" {...props}>
		<!-- Previous -->
		<button
			onclick={previousPage}
			disabled={$pageNumber === 1}
			class="border border-[#2A2A28] bg-transparent text-[#8A857A] cursor-pointer rounded-sm px-3 py-1 font-mono text-xs uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:border-[#FFB840] enabled:hover:text-[#FFB840]"
			aria-label="Previous page"
		>
			←
		</button>

		<!-- Pages -->
		{#each $pages as page}
			{#if page === '...'}
				<span class="font-mono text-xs text-[#8A857A]/60 px-2">…</span>
			{:else}
				<button
					onclick={() => goToPage(page)}
					class="cursor-pointer rounded-sm border px-3 py-1 font-mono text-xs tabular-nums transition-colors {$pageNumber ===
					page
						? 'border-[#FFB840] text-[#FFB840] bg-[#FFB840]/10'
						: 'border-[#2A2A28] text-[#8A857A] hover:border-[#8A857A] hover:text-[#E8E3D6]'}"
					aria-label={'Go to page ' + page}
				>
					{page}
				</button>
			{/if}
		{/each}

		<!-- Next -->
		<button
			onclick={nextPage}
			disabled={$pageNumber === $pageCount}
			class="border border-[#2A2A28] bg-transparent text-[#8A857A] cursor-pointer rounded-sm px-3 py-1 font-mono text-xs uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:border-[#FFB840] enabled:hover:text-[#FFB840]"
			aria-label="Next page"
		>
			→
		</button>
	</nav>
{/if}

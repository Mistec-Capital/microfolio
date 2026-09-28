<script>
	import Icon from './Icon.svelte';

	let { handler, class: className = '', ...props } = $props();

	let pageNumber = $derived(handler.getPageNumber());
	let pageCount = $derived(handler.getPageCount());
	let pages = $derived(handler.getPages({ ellipsis: true }));
</script>

{#if $pageCount > 1}
	<nav class="gap-s1 flex flex-wrap items-center {className}" aria-label="Paginación" {...props}>
		<button
			type="button"
			class="tag inline-flex items-center disabled:cursor-not-allowed disabled:opacity-40"
			onclick={() => handler.setPage('previous')}
			disabled={$pageNumber === 1}
			aria-label="Página anterior"
		>
			<Icon name="chevron-left" size={16} />
		</button>

		{#each $pages as page, i (`${page}-${i}`)}
			{#if page === '...'}
				<span class="t-nota px-s1">…</span>
			{:else}
				<button
					type="button"
					class="tag tnum {$pageNumber === page ? 'tag-active' : ''}"
					aria-current={$pageNumber === page ? 'page' : undefined}
					onclick={() => handler.setPage(page)}
				>
					{page}
				</button>
			{/if}
		{/each}

		<button
			type="button"
			class="tag inline-flex items-center disabled:cursor-not-allowed disabled:opacity-40"
			onclick={() => handler.setPage('next')}
			disabled={$pageNumber === $pageCount}
			aria-label="Página siguiente"
		>
			<Icon name="chevron-right" size={16} />
		</button>
	</nav>
{/if}

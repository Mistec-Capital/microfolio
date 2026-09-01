<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';

	let currentPage = $derived($page.url.pathname);
	let isHome = $derived(currentPage === base + '/' || currentPage === base || currentPage === '/');
	let navItems = $derived(isHome ? siteConfig.landingNav : siteConfig.navigation);

	let open = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 8);
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	function hrefOf(item) {
		return item.href.startsWith('#') ? item.href : `${base}${item.href}`;
	}

	function isActive(item) {
		if (isHome || item.href.startsWith('#')) return false;
		return currentPage === base + item.href || currentPage.startsWith(base + item.href + '/');
	}
</script>

<!-- La marca aparece una vez, arriba a la izquierda. Fondo plano; al hacer scroll
     solo cambia un recurso: aparece la regla inferior. -->
<header
	class="bg-ink fixed inset-x-0 top-0 z-50 border-b {scrolled || open
		? 'border-rule'
		: 'border-transparent'}"
	style="transition: border-color var(--d-breve) var(--ease)"
>
	<div class="container-brand flex h-16 items-center justify-between">
		<a href="{base}/" aria-label="MisTec — inicio" class="flex items-center">
			<img
				src="{base}/brand/mistec-horizontal-bone.png"
				alt="MisTec"
				width="112"
				height="40"
				class="h-auto w-[112px]"
			/>
		</a>

		<nav class="gap-s3 hidden items-center lg:flex" aria-label="Principal">
			{#each navItems as item (item.href)}
				<a
					href={hrefOf(item)}
					class="link t-ui {isActive(item) ? 'link-active' : ''}"
					aria-current={isActive(item) ? 'page' : undefined}
				>
					{item.name}
				</a>
			{/each}
		</nav>

		<button
			type="button"
			class="text-bone -mr-2 cursor-pointer p-2 lg:hidden"
			onclick={() => (open = !open)}
			aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
			aria-expanded={open}
		>
			<Icon name={open ? 'close' : 'menu'} size={24} />
		</button>
	</div>

	{#if open}
		<nav class="border-rule bg-ink border-t lg:hidden" aria-label="Principal">
			<ul class="container-brand list-rule py-s2">
				{#each navItems as item (item.href)}
					<li>
						<a href={hrefOf(item)} class="t-bajada text-bone block" onclick={() => (open = false)}>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>

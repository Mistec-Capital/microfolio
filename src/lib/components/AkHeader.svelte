<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/config.js';
	import IconMenu from '~icons/lucide/menu';
	import IconClose from '~icons/lucide/x';

	let currentPage = $derived($page.url.pathname);
	let isHome = $derived(currentPage === base + '/' || currentPage === base);
	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 20);
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	let navItems = $derived(isHome ? siteConfig.landingNav : siteConfig.navigation);
</script>

<header
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-300 {scrolled
		? 'border-b border-[#2A2A28] bg-[#0A0A0A]/85 backdrop-blur-md'
		: 'border-b border-transparent bg-transparent'}"
>
	<div
		class="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-6 md:px-10 lg:px-14"
	>
		<!-- Wordmark -->
		<a href="{base}/" class="group flex items-center gap-3" aria-label="MisTec — inicio">
			<span
				class="relative h-10 w-10 overflow-hidden rounded-md bg-[#E8E3D6] ring-1 ring-[#E8E3D6]/15 transition-all duration-300 group-hover:scale-105 group-hover:ring-[#FFB840]/60"
			>
				<img
					src="{base}/mistec.png"
					alt=""
					class="absolute inset-0 h-full w-full object-contain p-[3px]"
					aria-hidden="true"
				/>
			</span>
			<span class="flex flex-col leading-none">
				<span class="font-display text-[15px] font-semibold tracking-tight text-[#E8E3D6]">
					{siteConfig.title}
				</span>
				<span
					class="mt-1 hidden font-mono text-[10px] tracking-[0.18em] text-[#8A857A]/70 uppercase sm:inline"
				>
					{siteConfig.tagline}
				</span>
			</span>
		</a>

		<!-- Desktop nav -->
		<nav class="hidden items-center gap-7 lg:flex">
			{#each navItems as item}
				<a
					href={item.href.startsWith('#') ? item.href : `${base}${item.href}`}
					class="font-body text-[13px] font-medium text-[#8A857A] transition-colors duration-200 hover:text-[#E8E3D6] {!isHome &&
					(currentPage === base + item.href || currentPage.startsWith(base + item.href + '/'))
						? 'text-[#E8E3D6]'
						: ''}"
				>
					{item.name}
				</a>
			{/each}
			{#if isHome}
				<a
					href="{base}/projects"
					class="font-body text-[13px] font-medium text-[#8A857A] transition-colors duration-200 hover:text-[#E8E3D6]"
				>
					Ver todos
				</a>
			{/if}
		</nav>

		<!-- Mobile menu button -->
		<button
			class="cursor-pointer p-2 text-[#E8E3D6] transition-colors hover:text-[#FFB840] lg:hidden"
			onclick={toggleMobileMenu}
			aria-label="Alternar menú móvil"
		>
			{#if mobileMenuOpen}
				<IconClose class="size-6" />
			{:else}
				<IconMenu class="size-6" />
			{/if}
		</button>
	</div>

	{#if mobileMenuOpen}
		<div class="border-t border-[#2A2A28] bg-[#0A0A0A]/95 backdrop-blur-md lg:hidden">
			<nav class="mx-auto max-w-[1440px] px-6 py-6">
				<ul class="flex flex-col gap-4">
					{#each navItems as item}
						<li>
							<a
								href={item.href.startsWith('#') ? item.href : `${base}${item.href}`}
								class="font-body block text-base text-[#E8E3D6] transition-colors hover:text-[#FFB840]"
								onclick={closeMobileMenu}
							>
								{item.name}
							</a>
						</li>
					{/each}
					{#if isHome}
						<li>
							<a
								href="{base}/projects"
								class="font-body block text-base text-[#E8E3D6] transition-colors hover:text-[#FFB840]"
								onclick={closeMobileMenu}
							>
								Ver todos
							</a>
						</li>
					{/if}
				</ul>
			</nav>
		</div>
	{/if}
</header>

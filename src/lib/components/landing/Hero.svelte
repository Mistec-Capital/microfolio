<script>
	import { base } from '$app/paths';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';
	import IconArrowRight from '~icons/lucide/arrow-right';
	import DeployTicker from '$lib/components/editorial/DeployTicker.svelte';

	let { stats } = $props();

	const today = new Date().toISOString().slice(0, 10);
</script>

<section
	id="top"
	use:scrollReveal
	class="section-ink min-h-screen pt-16 flex items-center relative overflow-hidden"
>
	<!-- Ambient amber glow blobs -->
	<div
		class="absolute -top-32 left-[10%] w-[600px] h-[600px] rounded-full pointer-events-none animate-glow-pulse"
		style="background: radial-gradient(circle, rgba(255, 184, 64, 0.14) 0%, transparent 60%); filter: blur(60px);"
		aria-hidden="true"
	></div>
	<div
		class="absolute bottom-0 right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
		style="background: radial-gradient(circle, rgba(255, 184, 64, 0.08) 0%, transparent 60%); filter: blur(80px);"
		aria-hidden="true"
	></div>

	<!-- Blueprint dot grid -->
	<div class="absolute inset-0 bg-blueprint pointer-events-none" aria-hidden="true"></div>
	<div
		class="absolute inset-0 pointer-events-none"
		style="background: radial-gradient(ellipse 85% 70% at 50% 45%, transparent 0%, var(--ink) 85%);"
		aria-hidden="true"
	></div>

	<div class="relative max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-14 py-20 md:py-24">
		<!-- Mono pre-title -->
		<div
			class="mb-10 md:mb-12 font-mono text-xs text-[#8A857A] tracking-wider reveal flex items-center gap-3"
		>
			<span class="text-[#FFB840]">//</span>
			<span>ingeniería de software desde el interior</span>
			<span
				class="hidden md:inline-block flex-1 h-px bg-[#2A2A28] max-w-[100px]"
				aria-hidden="true"
			></span>
			<span class="hidden md:inline text-[#8A857A]/60 tabular-nums">{today}</span>
		</div>

		<div class="grid grid-cols-12 gap-6 md:gap-8 w-full">
			<!-- Headline -->
			<h1
				class="col-span-12 lg:col-span-9 text-display font-display text-[#E8E3D6] reveal reveal-delay-1"
			>
				<span class="block">Tecnología</span>
				<span class="block">que piensa</span>
				<span class="block">
					en <span class="gradient-text-amber">grande.</span>
					<span class="cursor-blink" aria-hidden="true"></span>
				</span>
			</h1>

			<!-- Right live stats -->
			<aside class="hidden lg:flex col-span-3 flex-col justify-end pb-3 reveal reveal-delay-2">
				<div class="font-body text-sm text-[#8A857A] space-y-2.5 leading-relaxed">
					<div class="flex items-center gap-2.5 text-[#E8E3D6]">
						<span class="status-dot-live" aria-hidden="true"></span>
						<span>Shipping desde 2020</span>
					</div>
					<div class="h-px bg-[#2A2A28] my-2"></div>
					<div>
						<span class="text-[#E8E3D6] font-semibold tabular-nums"
							>{String(stats.total).padStart(2, '0')}</span
						>
						<span class="text-[#8A857A]/70"> proyectos en LATAM</span>
					</div>
					<div>
						<span class="text-[#E8E3D6] font-semibold tabular-nums"
							>{String(stats.government).padStart(2, '0')}</span
						>
						<span class="text-[#8A857A]/70"> plataformas de gobierno</span>
					</div>
					<div>
						<span class="text-[#E8E3D6] font-semibold tabular-nums"
							>{String(Math.max(stats.countries, 3)).padStart(2, '0')}</span
						>
						<span class="text-[#8A857A]/70"> países</span>
					</div>
				</div>
			</aside>

			<!-- Mobile stats -->
			<aside class="lg:hidden col-span-12 reveal reveal-delay-2">
				<div
					class="font-body text-sm text-[#8A857A] flex flex-wrap gap-x-6 gap-y-2 pt-6 mt-6 border-t border-[#2A2A28]"
				>
					<span class="flex items-center gap-2 text-[#E8E3D6]">
						<span class="status-dot-live" aria-hidden="true"></span> Shipping
					</span>
					<span><span class="text-[#E8E3D6]">{stats.total}</span> proyectos</span>
					<span><span class="text-[#E8E3D6]">{stats.government}</span> gobiernos</span>
					<span><span class="text-[#E8E3D6]">{Math.max(stats.countries, 3)}</span> países</span>
				</div>
			</aside>
		</div>

		<!-- Sublede with amber-underline keywords -->
		<p
			class="mt-14 md:mt-16 font-body text-base md:text-lg text-[#8A857A] max-w-[58ch] leading-relaxed reveal reveal-delay-3"
		>
			Construimos software desde
			<span class="text-[#E8E3D6]">Posadas, Misiones</span>. <span
				class="text-[#E8E3D6] border-b border-[#FFB840]/50">Plataformas SaaS propias</span
			>,
			<span class="text-[#E8E3D6] border-b border-[#FFB840]/50">sistemas para el Estado</span> y
			<span class="text-[#E8E3D6] border-b border-[#FFB840]/50">soluciones de IA</span> para organizaciones
			de LATAM.
		</p>

		<!-- CTAs -->
		<div class="mt-10 md:mt-12 flex flex-wrap items-center gap-4 reveal reveal-delay-4">
			<a
				href="{base}/projects"
				class="group inline-flex items-center gap-3 bg-[#FFB840] text-[#0A0A0A] hover:bg-[#CC8F1A] transition-all duration-200 h-12 px-6 font-body font-medium text-sm rounded-sm glow-amber-sm hover:glow-amber-md"
			>
				Ver los {stats.total} proyectos
				<IconArrowUpRight
					class="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
				/>
			</a>
			<a
				href="#contacto"
				class="group inline-flex items-center gap-3 border border-[#E8E3D6]/60 text-[#E8E3D6] hover:border-[#FFB840] hover:text-[#FFB840] transition-colors duration-200 h-12 px-6 font-body font-medium text-sm rounded-sm"
			>
				Hablemos
				<IconArrowRight
					class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
				/>
			</a>
		</div>

		<!-- Live deploy ticker -->
		<div class="mt-14 md:mt-16 max-w-[640px] reveal reveal-delay-5">
			<DeployTicker />
		</div>
	</div>
</section>

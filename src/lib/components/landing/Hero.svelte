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
	class="section-ink relative flex min-h-screen items-center overflow-hidden pt-16"
>
	<!-- Ambient amber glow blobs -->
	<div
		class="animate-glow-pulse pointer-events-none absolute -top-32 left-[10%] h-[600px] w-[600px] rounded-full"
		style="background: radial-gradient(circle, rgba(255, 184, 64, 0.14) 0%, transparent 60%); filter: blur(60px);"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute right-[5%] bottom-0 h-[500px] w-[500px] rounded-full"
		style="background: radial-gradient(circle, rgba(255, 184, 64, 0.08) 0%, transparent 60%); filter: blur(80px);"
		aria-hidden="true"
	></div>

	<!-- Blueprint dot grid -->
	<div class="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true"></div>
	<div
		class="pointer-events-none absolute inset-0"
		style="background: radial-gradient(ellipse 85% 70% at 50% 45%, transparent 0%, var(--ink) 85%);"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto w-full max-w-[1440px] px-6 py-20 md:px-10 md:py-24 lg:px-14">
		<!-- Mono pre-title -->
		<div
			class="reveal mb-10 flex items-center gap-3 font-mono text-xs tracking-wider text-[#8A857A] md:mb-12"
		>
			<span class="text-[#FFB840]">//</span>
			<span>ingeniería de software desde el interior</span>
			<span class="hidden h-px max-w-[100px] flex-1 bg-[#2A2A28] md:inline-block" aria-hidden="true"
			></span>
			<span class="hidden text-[#8A857A]/60 tabular-nums md:inline">{today}</span>
		</div>

		<div class="grid w-full grid-cols-12 gap-6 md:gap-8">
			<!-- Headline -->
			<h1
				class="text-display font-display reveal reveal-delay-1 col-span-12 text-[#E8E3D6] lg:col-span-9"
			>
				<span class="block">Construimos</span>
				<span class="block">software que</span>
				<span class="block">
					<span class="gradient-text-amber">dura</span>
					<span class="cursor-blink" aria-hidden="true"></span>
				</span>
			</h1>

			<!-- Right live stats -->
			<aside class="reveal reveal-delay-2 col-span-3 hidden flex-col justify-end pb-3 lg:flex">
				<div class="font-body space-y-2.5 text-sm leading-relaxed text-[#8A857A]">
					<div class="flex items-center gap-2.5 text-[#E8E3D6]">
						<span class="status-dot-live" aria-hidden="true"></span>
						<span>Shipping desde 2020</span>
					</div>
					<div class="my-2 h-px bg-[#2A2A28]"></div>
					<div>
						<span class="font-semibold text-[#E8E3D6] tabular-nums"
							>{String(stats.total).padStart(2, '0')}</span
						>
						<span class="text-[#8A857A]/70"> proyectos en LATAM</span>
					</div>
					<div>
						<span class="font-semibold text-[#E8E3D6] tabular-nums"
							>{String(stats.government).padStart(2, '0')}</span
						>
						<span class="text-[#8A857A]/70"> plataformas de gobierno</span>
					</div>
					<div>
						<span class="font-semibold text-[#E8E3D6] tabular-nums"
							>{String(Math.max(stats.countries, 3)).padStart(2, '0')}</span
						>
						<span class="text-[#8A857A]/70"> países</span>
					</div>
				</div>
			</aside>

			<!-- Mobile stats -->
			<aside class="reveal reveal-delay-2 col-span-12 lg:hidden">
				<div
					class="font-body mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#2A2A28] pt-6 text-sm text-[#8A857A]"
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
			class="font-body reveal reveal-delay-3 mt-14 max-w-[58ch] text-base leading-relaxed text-[#8A857A] md:mt-16 md:text-lg"
		>
			Construimos software desde
			<span class="text-[#E8E3D6]">Posadas, Misiones</span>.
			<span class="border-b border-[#FFB840]/50 text-[#E8E3D6]">Plataformas SaaS propias</span>,
			<span class="border-b border-[#FFB840]/50 text-[#E8E3D6]">sistemas para el Estado</span> y
			<span class="border-b border-[#FFB840]/50 text-[#E8E3D6]">soluciones de IA</span> para organizaciones
			de LATAM.
		</p>

		<!-- CTAs -->
		<div class="reveal reveal-delay-4 mt-10 flex flex-wrap items-center gap-4 md:mt-12">
			<a
				href="{base}/projects"
				class="group font-body glow-amber-sm hover:glow-amber-md inline-flex h-12 items-center gap-3 rounded-sm bg-[#FFB840] px-6 text-sm font-medium text-[#0A0A0A] transition-all duration-200 hover:bg-[#CC8F1A]"
			>
				Ver los {stats.total} proyectos
				<IconArrowUpRight
					class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
				/>
			</a>
			<a
				href="#contacto"
				class="group font-body inline-flex h-12 items-center gap-3 rounded-sm border border-[#E8E3D6]/60 px-6 text-sm font-medium text-[#E8E3D6] transition-colors duration-200 hover:border-[#FFB840] hover:text-[#FFB840]"
			>
				Hablemos
				<IconArrowRight
					class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
				/>
			</a>
		</div>

		<!-- Live deploy ticker -->
		<div class="reveal reveal-delay-5 mt-14 max-w-[640px] md:mt-16">
			<DeployTicker />
		</div>
	</div>
</section>

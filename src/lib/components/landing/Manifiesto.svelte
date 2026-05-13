<script>
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import Ticker from '$lib/components/editorial/Ticker.svelte';

	let { stats } = $props();

	const yearsSince = new Date().getFullYear() - 2020;
	const stat_items = $derived([
		{ target: stats.total, label: 'Proyectos', pad: 2, suffix: '+' },
		{ target: Math.max(stats.countries, 3), label: 'Países', pad: 2 },
		{ target: stats.government, label: 'Gobiernos', pad: 2 },
		{ target: yearsSince, label: 'Años', pad: 2, suffix: '+' }
	]);
</script>

<section
	id="manifiesto"
	use:scrollReveal
	class="section-ink bg-mesh-soft py-32 relative overflow-hidden"
>
	<div
		class="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
		style="background: radial-gradient(ellipse, rgba(255, 184, 64, 0.05) 0%, transparent 60%); filter: blur(80px);"
		aria-hidden="true"
	></div>

	<div class="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-14">
		<!-- Chip -->
		<div class="text-center mb-10 reveal">
			<span class="chip-amber">
				<span class="status-dot" aria-hidden="true"></span>
				NOSOTROS
			</span>
		</div>

		<!-- Quote -->
		<h2
			class="text-center font-display font-bold text-[#E8E3D6] tracking-[-0.04em] leading-[1.05] max-w-[22ch] mx-auto reveal reveal-delay-1"
			style="font-size: clamp(2.5rem, 5.5vw, 5rem)"
		>
			Piensa en grande.
			<span class="gradient-text-amber">Ya estamos ahí.</span>
		</h2>

		<!-- Body -->
		<p
			class="mt-10 mx-auto max-w-[64ch] text-center font-body text-base md:text-lg text-[#8A857A] leading-relaxed reveal reveal-delay-2"
		>
			Somos ingenieros de sistemas formados en Posadas, Misiones — el interior de Argentina.
			Trabajamos con la convicción de que la tecnología de calidad puede y debe desarrollarse desde
			cualquier lugar. Combinamos la calidez del interior con el rigor técnico de la industria IT
			moderna, y construimos desde hace seis años software a medida, plataformas SaaS propias y
			soluciones de IA que hoy corren en gobiernos municipales, comercios, agroindustrias y
			empresas enterprise de tres países.
		</p>

		<!-- Stat cards -->
		<div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-[#2A2A28]">
			{#each stat_items as stat, idx}
				<div
					class="py-10 px-6 text-center reveal reveal-delay-{Math.min(idx + 1, 4)} {idx > 0
						? 'md:border-l border-[#2A2A28]'
						: ''} {idx > 1
						? 'border-t md:border-t-0 border-[#2A2A28]'
						: idx === 1
							? 'border-l md:border-l border-[#2A2A28]'
							: ''}"
				>
					<Ticker
						target={stat.target}
						pad={stat.pad}
						suffix={stat.suffix || ''}
						class="font-display text-5xl md:text-6xl font-bold text-[#E8E3D6] tracking-[-0.04em]"
					/>
					<div class="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8A857A]">
						{stat.label}
					</div>
				</div>
			{/each}
		</div>

		<!-- Origin footnote -->
		<div class="mt-10 text-center font-mono text-xs text-[#8A857A]/60 tracking-wider">
			<span class="text-[#FFB840]">▲</span>  Posadas, Misiones · Argentina  ·  est. 2020
		</div>
	</div>
</section>

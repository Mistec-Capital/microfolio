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
	class="section-paper bg-mesh-soft relative overflow-hidden py-32"
>
	<div
		class="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full"
		style="background: radial-gradient(ellipse, rgba(255, 184, 64, 0.05) 0%, transparent 60%); filter: blur(80px);"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
		<!-- Chip -->
		<div class="reveal mb-10 text-center">
			<span class="chip-amber">
				<span class="status-dot" aria-hidden="true"></span>
				NOSOTROS
			</span>
		</div>

		<!-- Quote -->
		<h2
			class="font-display reveal reveal-delay-1 mx-auto max-w-[22ch] text-center leading-[1.05] font-bold tracking-[-0.04em] text-[#E8E3D6]"
			style="font-size: clamp(2.5rem, 5.5vw, 5rem)"
		>
			Calidad técnica
			<span class="gradient-text-amber">Compromiso humano</span>
		</h2>

		<!-- Body -->
		<p
			class="font-body reveal reveal-delay-2 mx-auto mt-10 max-w-[64ch] text-center text-base leading-relaxed text-[#8A857A] md:text-lg"
		>
			Somos misioneros, ingenieros de sistemas egresados de la UTN. Trabajamos con la convicción de
			que la tecnología de calidad puede y debe desarrollarse desde cualquier lugar. Combinamos la
			calidez del interior con el rigor técnico de la industria IT moderna, y construimos desde hace
			seis años software a medida, plataformas SaaS propias y soluciones de IA que hoy corren en
			gobiernos municipales, comercios, agroindustrias y empresas enterprise de tres países.
		</p>

		<!-- Stat cards -->
		<div class="mt-20 grid grid-cols-2 gap-0 border-t border-b border-[#2A2A28] md:grid-cols-4">
			{#each stat_items as stat, idx}
				<div
					class="reveal px-6 py-10 text-center reveal-delay-{Math.min(idx + 1, 4)} {idx > 0
						? 'border-[#2A2A28] md:border-l'
						: ''} {idx > 1
						? 'border-t border-[#2A2A28] md:border-t-0'
						: idx === 1
							? 'border-l border-[#2A2A28] md:border-l'
							: ''}"
				>
					<Ticker
						target={stat.target}
						pad={stat.pad}
						suffix={stat.suffix || ''}
						class="font-display text-5xl font-bold tracking-[-0.04em] text-[#E8E3D6] md:text-6xl"
					/>
					<div class="mt-3 font-mono text-[11px] tracking-[0.12em] text-[#8A857A] uppercase">
						{stat.label}
					</div>
				</div>
			{/each}
		</div>

		<!-- Origin footnote -->
		<div class="mt-10 text-center font-mono text-xs tracking-wider text-[#8A857A]/60">
			<span class="text-[#FFB840]">▲</span> Posadas, Misiones · Argentina · est. 2020
		</div>
	</div>
</section>

<script>
	import { base } from '$app/paths';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';
	import IconSparkles from '~icons/lucide/sparkles';
	import IconCpu from '~icons/lucide/cpu';

	let { projects = [] } = $props();

	function lookup(slug) {
		return projects.find((p) => p.slug === slug);
	}

	const entries = [
		{
			slug: 'guazuapp',
			fallback: lookup('guazuapp'),
			title: 'MiCopi',
			kicker: 'ASISTENTE MULTICANAL',
			desc: 'Asistente multi-agente para asesoramiento comercial, financiero y operativo. Integra WhatsApp, web, email y API; aprende el contexto de cada empresa mediante un onboarding estructurado y mantiene memoria conversacional persistente.',
			stack: ['multi-agent', 'LLM', 'multicanal', 'onboarding'],
			icon: IconCpu
		},
		{
			slug: 'hcd-digesto-juridico-posadas',
			fallback: lookup('hcd-digesto-juridico-posadas'),
			title: 'Digesto RAG',
			kicker: 'CONSULTA JURÍDICA IA',
			desc: 'Motor RAG sobre el corpus completo del Digesto Jurídico de Posadas. Permite consultas en lenguaje natural sobre ordenanzas municipales y devuelve respuestas con citas a los documentos fuente. Democratiza el acceso ciudadano a la normativa.',
			stack: ['RAG', 'vector DB', 'LLM', 'semantic search'],
			icon: IconSparkles
		}
	];
</script>

<section
	id="ia"
	use:scrollReveal
	class="section-ink bg-mesh-amber py-32 relative overflow-hidden"
>
	<div
		class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
		style="background: radial-gradient(ellipse, rgba(255, 184, 64, 0.08) 0%, transparent 60%); filter: blur(80px);"
		aria-hidden="true"
	></div>

	<div class="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="max-w-[800px] mx-auto text-center mb-16 reveal">
			<span class="chip-amber">
				<IconSparkles class="w-3 h-3" />
				IA & AUTOMATIZACIÓN
			</span>
			<h2
				class="font-display font-bold text-[#E8E3D6] tracking-[-0.04em] leading-[1.05] mt-6"
				style="font-size: clamp(2.25rem, 4.5vw, 3.75rem)"
			>
				Inteligencia aplicada.
			</h2>
			<p
				class="mt-5 font-body text-base md:text-lg text-[#8A857A] max-w-[58ch] mx-auto leading-relaxed"
			>
				No envolvemos un ChatGPT. Construimos agentes especializados, arquitecturas multi-agente y
				pipelines RAG sobre corpus propios.
			</p>
		</div>

		<!-- Research entries -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{#each entries as entry, idx (entry.title)}
				{@const Icon = entry.icon}
				{@const href = entry.fallback ? `${base}/projects/${entry.slug}` : `${base}/projects`}
				<a
					{href}
					class="card-gradient-border group cursor-pointer p-8 reveal reveal-delay-{idx + 1}"
				>
					<div class="flex items-center justify-between mb-7">
						<div
							class="w-12 h-12 rounded-sm bg-[#FFB840]/10 border border-[#FFB840]/30 flex items-center justify-center group-hover:shadow-[0_0_30px_-6px_rgba(255,184,64,0.4)] transition-all duration-300"
						>
							<Icon class="w-5 h-5 text-[#FFB840]" />
						</div>
						<span class="font-mono text-[10px] uppercase tracking-wider text-[#FFB840]">
							{entry.kicker}
						</span>
					</div>

					<h3
						class="font-display font-bold text-[#E8E3D6] text-4xl tracking-[-0.04em] leading-tight group-hover:text-[#FFB840] transition-colors"
					>
						{entry.title}
					</h3>

					<p class="mt-5 font-body text-base text-[#8A857A] leading-relaxed">
						{entry.desc}
					</p>

					<div class="mt-7 flex flex-wrap gap-2">
						{#each entry.stack as s}
							<span
								class="font-mono text-[10px] tracking-wider text-[#8A857A] px-2.5 py-1 rounded-full border border-[#2A2A28] bg-white/[0.02]"
							>
								{s}
							</span>
						{/each}
					</div>

					<div
						class="mt-8 pt-5 border-t border-[#2A2A28] flex items-center justify-between"
					>
						<span
							class="font-mono text-[10px] uppercase tracking-wider text-[#8A857A] group-hover:text-[#FFB840] transition-colors"
						>
							Ver arquitectura
						</span>
						<IconArrowUpRight
							class="w-4 h-4 text-[#8A857A] group-hover:text-[#FFB840] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
						/>
					</div>
				</a>
			{/each}
		</div>

		<!-- Closing principle -->
		<div class="mt-20 text-center reveal">
			<p
				class="font-display font-semibold text-2xl md:text-3xl text-[#E8E3D6] max-w-[42ch] mx-auto leading-tight tracking-[-0.02em]"
			>
				La IA no reemplaza al equipo — lo potencia.
			</p>
		</div>
	</div>
</section>

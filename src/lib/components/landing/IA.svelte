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
			title: 'Guazu',
			kicker: 'ASISTENTE MULTICANAL',
			desc: 'Asistente multi-agente para asesoramiento comercial, financiero y operativo. Integra WhatsApp, web, email y API; aprende el contexto de cada empresa mediante un onboarding estructurado y mantiene memoria conversacional persistente.',
			stack: ['multi-agent', 'LLM', 'multicanal', 'onboarding'],
			icon: IconCpu
		},
		{
			slug: 'digesto-rag-posadas',
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
	class="section-paper bg-mesh-amber relative overflow-hidden py-32"
>
	<div
		class="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full"
		style="background: radial-gradient(ellipse, rgba(255, 184, 64, 0.08) 0%, transparent 60%); filter: blur(80px);"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="reveal mx-auto mb-16 max-w-[800px] text-center">
			<span class="chip-amber">
				<IconSparkles class="h-3 w-3" />
				IA & AUTOMATIZACIÓN
			</span>
			<h2
				class="font-display mt-6 leading-[1.05] font-bold tracking-[-0.04em] text-[#E8E3D6]"
				style="font-size: clamp(2.25rem, 4.5vw, 3.75rem)"
			>
				Inteligencia aplicada.
			</h2>
			<p
				class="font-body mx-auto mt-5 max-w-[58ch] text-base leading-relaxed text-[#8A857A] md:text-lg"
			>
				No envolvemos un ChatGPT. Construimos agentes especializados, arquitecturas multi-agente y
				pipelines RAG sobre corpus propios.
			</p>
		</div>

		<!-- Research entries -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			{#each entries as entry, idx (entry.title)}
				{@const Icon = entry.icon}
				{@const href = entry.fallback ? `${base}/projects/${entry.slug}` : `${base}/projects`}
				<a
					{href}
					class="card-gradient-border group reveal cursor-pointer p-8 reveal-delay-{idx + 1}"
				>
					<div class="mb-7 flex items-center justify-between">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-sm border border-[#FFB840]/30 bg-[#FFB840]/10 transition-all duration-300 group-hover:shadow-[0_0_30px_-6px_rgba(255,184,64,0.4)]"
						>
							<Icon class="h-5 w-5 text-[#FFB840]" />
						</div>
						<span class="font-mono text-[10px] tracking-wider text-[#FFB840] uppercase">
							{entry.kicker}
						</span>
					</div>

					<h3
						class="font-display text-4xl leading-tight font-bold tracking-[-0.04em] text-[#E8E3D6] transition-colors group-hover:text-[#FFB840]"
					>
						{entry.title}
					</h3>

					<p class="font-body mt-5 text-base leading-relaxed text-[#8A857A]">
						{entry.desc}
					</p>

					<div class="mt-7 flex flex-wrap gap-2">
						{#each entry.stack as s}
							<span
								class="rounded-full border border-[#2A2A28] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] tracking-wider text-[#8A857A]"
							>
								{s}
							</span>
						{/each}
					</div>

					<div class="mt-8 flex items-center justify-between border-t border-[#2A2A28] pt-5">
						<span
							class="font-mono text-[10px] tracking-wider text-[#8A857A] uppercase transition-colors group-hover:text-[#FFB840]"
						>
							Ver arquitectura
						</span>
						<IconArrowUpRight
							class="h-4 w-4 text-[#8A857A] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FFB840]"
						/>
					</div>
				</a>
			{/each}
		</div>

		<!-- Closing principle -->
		<div class="reveal mt-20 text-center">
			<p
				class="font-display mx-auto max-w-[42ch] text-2xl leading-tight font-semibold tracking-[-0.02em] text-[#E8E3D6] md:text-3xl"
			>
				La IA no reemplaza al equipo — lo potencia.
			</p>
		</div>
	</div>
</section>

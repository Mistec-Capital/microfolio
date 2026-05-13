<script>
	import { base } from '$app/paths';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';
	import IconLandmark from '~icons/lucide/landmark';
	import IconFileText from '~icons/lucide/file-text';
	import IconScale from '~icons/lucide/scale';
	import IconUsers from '~icons/lucide/users';
	import IconSparkles from '~icons/lucide/sparkles';

	let { projects = [] } = $props();

	const TYPOLOGY = [
		{ icon: IconScale, label: 'Digesto jurídico' },
		{ icon: IconFileText, label: 'Expedientes' },
		{ icon: IconLandmark, label: 'Sesiones legislativas' },
		{ icon: IconUsers, label: 'Registros públicos' },
		{ icon: IconSparkles, label: 'IA aplicada' }
	];

	function statusRank(s) {
		const v = (s ?? '').toLowerCase();
		if (v.includes('activo') || v.includes('entregado')) return 0;
		if (v.includes('desarrollo')) return 1;
		if (v.includes('finaliz') || v.includes('mantenimiento')) return 2;
		return 3;
	}

	function cityOf(location) {
		return (location || '').split(',')[0]?.trim() || location || '—';
	}

	function statusTone(s) {
		const v = (s ?? '').toLowerCase();
		if (v.includes('activo') || v.includes('entregado'))
			return { dot: 'bg-[#7BC97A]', text: 'text-[#9ED99C]', label: 'ACTIVO' };
		if (v.includes('desarrollo'))
			return { dot: 'bg-[#FFB840]', text: 'text-[#FFB840]', label: 'EN DESARROLLO' };
		if (v.includes('finaliz') || v.includes('mantenimiento'))
			return { dot: 'bg-[#8A857A]/60', text: 'text-[#8A857A]', label: 'MANTENIMIENTO' };
		return { dot: 'bg-[#8A857A]/40', text: 'text-[#8A857A]/70', label: (s || '—').toUpperCase() };
	}

	function cleanTitle(title) {
		return (title || '')
			.replace(/^Sistema de\s+/i, '')
			.replace(/^Sistema\s+/i, '')
			.replace(/^H\.C\.D\s+/i, 'H.C.D ')
			.split(' - ')[0]
			.split(' — ')[0]
			.trim();
	}

	let govProjects = $derived(
		projects
			.filter((p) => p.domain === 'government')
			.sort((a, b) => statusRank(a.status) - statusRank(b.status))
	);
	let marqueeItems = $derived([...govProjects, ...govProjects]);
</script>

<section
	id="gobierno"
	use:scrollReveal
	class="section-ink py-32 relative overflow-hidden"
>
	<div
		class="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
		style="background: radial-gradient(circle, rgba(255, 184, 64, 0.05) 0%, transparent 60%); filter: blur(80px);"
		aria-hidden="true"
	></div>

	<div class="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="flex flex-wrap items-end justify-between gap-8 mb-14 reveal">
			<div class="max-w-[700px]">
				<span class="chip mb-6">
					<IconLandmark class="w-3 h-3" />
					GOBIERNO & CIVIC-TECH
				</span>
				<h2
					class="font-display font-bold text-[#E8E3D6] tracking-[-0.04em] leading-[1.05] mt-6"
					style="font-size: clamp(2.25rem, 4.5vw, 3.75rem)"
				>
					Sistemas para el Estado.
				</h2>
				<p class="mt-5 font-body text-base md:text-lg text-[#8A857A] max-w-[58ch] leading-relaxed">
					Instituciones públicas en Argentina y Paraguay confían en nuestras plataformas para
					gestionar expedientes, sesiones, digesto jurídico y registros oficiales. Transparencia,
					eficiencia y acceso ciudadano.
				</p>
			</div>
		</div>

		<!-- Typology row -->
		<div class="flex flex-wrap gap-3 mb-14 reveal reveal-delay-1">
			{#each TYPOLOGY as item}
				{@const Icon = item.icon}
				<div
					class="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[#2A2A28] bg-white/[0.015]"
				>
					<Icon class="w-3.5 h-3.5 text-[#FFB840]" />
					<span class="font-mono text-[11px] text-[#8A857A] tracking-wider">{item.label}</span>
				</div>
			{/each}
		</div>

		<!-- Marquee of institutions -->
		{#if marqueeItems.length > 0}
			<div
				class="relative overflow-hidden py-3 mb-14 border-y border-[#2A2A28] reveal reveal-delay-2"
			>
				<div class="marquee-track gap-12">
					{#each marqueeItems as project, idx (`${project.slug}-${idx}`)}
						<span
							class="flex items-center gap-3 font-mono text-sm text-[#8A857A] whitespace-nowrap pr-12"
						>
							<span class="text-[#FFB840]">◆</span>
							<span>{cityOf(project.location)} — {cleanTitle(project.title)}</span>
						</span>
					{/each}
				</div>
				<div
					class="absolute inset-y-0 left-0 w-32 pointer-events-none"
					style="background: linear-gradient(to right, var(--ink), transparent)"
					aria-hidden="true"
				></div>
				<div
					class="absolute inset-y-0 right-0 w-32 pointer-events-none"
					style="background: linear-gradient(to left, var(--ink), transparent)"
					aria-hidden="true"
				></div>
			</div>
		{/if}

		<!-- Project cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
			{#each govProjects as project, idx (project.slug)}
				{@const isRag = project.slug === 'hcd-digesto-juridico-posadas'}
				{@const s = statusTone(project.status)}
				<a
					href="{base}/projects/{project.slug}"
					class="{isRag
						? 'card-gradient-border'
						: 'card-dark'} group cursor-pointer p-6 reveal reveal-delay-{Math.min(
						(idx % 3) + 1,
						3
					)}"
				>
					<div class="flex items-start justify-between mb-4">
						<div class="flex items-center gap-2">
							<span class="font-mono text-[10px] uppercase tracking-wider text-[#FFB840]">
								{cityOf(project.location)}
							</span>
							{#if isRag}
								<span
									class="font-mono text-[10px] uppercase tracking-wider text-[#FFB840] inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#FFB840]/40 bg-[#FFB840]/10"
								>
									<IconSparkles class="w-2.5 h-2.5" />
									IA · RAG
								</span>
							{/if}
						</div>
						<span class="font-mono text-[10px] text-[#8A857A] tabular-nums">{project.year}</span>
					</div>
					<h3
						class="font-display font-semibold text-[#E8E3D6] text-lg leading-tight tracking-tight group-hover:text-[#FFB840] transition-colors"
					>
						{project.title}
					</h3>
					{#if isRag}
						<p class="mt-2 font-body text-sm text-[#8A857A]/80 leading-relaxed">
							Motor de consulta jurídica por IA — Retrieval Augmented Generation sobre el corpus
							completo del Digesto.
						</p>
					{/if}
					<div class="mt-4 flex items-center justify-between">
						<span
							class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider {s.text}"
						>
							<span class="w-1.5 h-1.5 rounded-full {s.dot}" aria-hidden="true"></span>
							{s.label}
						</span>
						<IconArrowUpRight
							class="w-4 h-4 text-[#8A857A] group-hover:text-[#FFB840] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
						/>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

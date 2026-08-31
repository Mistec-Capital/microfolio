<script>
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
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

<section id="gobierno" use:scrollReveal class="section-paper relative overflow-hidden py-32">
	<div
		class="pointer-events-none absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full"
		style="background: radial-gradient(circle, rgba(255, 184, 64, 0.05) 0%, transparent 60%); filter: blur(80px);"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="reveal mb-14 flex flex-wrap items-end justify-between gap-8">
			<div class="max-w-[700px]">
				<span class="chip mb-6">
					<IconLandmark class="h-3 w-3" />
					GOBIERNO & CIVIC-TECH
				</span>
				<h2
					class="font-display mt-6 leading-[1.05] font-bold tracking-[-0.04em] text-[#E8E3D6]"
					style="font-size: clamp(2.25rem, 4.5vw, 3.75rem)"
				>
					Sistemas para el Estado.
				</h2>
				<p class="font-body mt-5 max-w-[58ch] text-base leading-relaxed text-[#8A857A] md:text-lg">
					Instituciones públicas en Argentina y Paraguay confían en nuestras plataformas para
					gestionar expedientes, sesiones, digesto jurídico y registros oficiales. Transparencia,
					eficiencia y acceso ciudadano.
				</p>
			</div>
		</div>

		<!-- Typology row -->
		<div class="reveal reveal-delay-1 mb-14 flex flex-wrap gap-3">
			{#each TYPOLOGY as item}
				{@const Icon = item.icon}
				<div
					class="inline-flex items-center gap-2 rounded-full border border-[#2A2A28] bg-white/[0.015] px-3 py-2"
				>
					<Icon class="h-3.5 w-3.5 text-[#FFB840]" />
					<span class="font-mono text-[11px] tracking-wider text-[#8A857A]">{item.label}</span>
				</div>
			{/each}
		</div>

		<!-- Marquee of institutions -->
		{#if marqueeItems.length > 0}
			<div
				class="reveal reveal-delay-2 relative mb-14 overflow-hidden border-y border-[#2A2A28] py-3"
			>
				<div class="marquee-track gap-12">
					{#each marqueeItems as project, idx (`${project.slug}-${idx}`)}
						<span
							class="flex items-center gap-3 pr-12 font-mono text-sm whitespace-nowrap text-[#8A857A]"
						>
							<span class="text-[#FFB840]">◆</span>
							<span>{cityOf(project.location)} — {cleanTitle(project.title)}</span>
						</span>
					{/each}
				</div>
				<div
					class="pointer-events-none absolute inset-y-0 left-0 w-32"
					style="background: linear-gradient(to right, var(--paper), transparent)"
					aria-hidden="true"
				></div>
				<div
					class="pointer-events-none absolute inset-y-0 right-0 w-32"
					style="background: linear-gradient(to left, var(--paper), transparent)"
					aria-hidden="true"
				></div>
			</div>
		{/if}
	</div>
</section>

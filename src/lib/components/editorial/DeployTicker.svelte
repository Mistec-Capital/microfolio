<script>
	const EVENTS = [
		{ glyph: '▲', event: 'deploy ok', project: 'digesto-rag', env: 'prod', tone: 'ok' },
		{
			glyph: '◆',
			event: 'commit pushed',
			project: 'guazuapp-mobile',
			env: 'main',
			tone: 'neutral'
		},
		{ glyph: '✓', event: 'ci passed', project: 'hcd-obera', env: 'staging', tone: 'ok' },
		{ glyph: '◇', event: 'build', project: 'micopi-agent', env: 'preview', tone: 'mid' },
		{ glyph: '▲', event: 'release v0.4.2', project: 'mibarrio', env: 'prod', tone: 'ok' },
		{ glyph: '◆', event: 'pr merged', project: 'marcas-santafe', env: 'main', tone: 'neutral' },
		{ glyph: '✓', event: 'tests passed', project: 'minucleo-erp', env: 'main', tone: 'ok' },
		{ glyph: '◇', event: 'migration', project: 'expedientes-garupa', env: 'prod', tone: 'mid' }
	];

	function timestamp(offsetSeconds) {
		const d = new Date(Date.now() - offsetSeconds * 1000);
		return d.toTimeString().slice(0, 8);
	}

	function toneClass(t) {
		return t === 'ok' ? 'text-[#FFB840]' : t === 'mid' ? 'text-[#E8E3D6]' : 'text-[#8A857A]';
	}

	let index = $state(0);

	$effect(() => {
		if (typeof window === 'undefined') return;
		const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;
		const id = window.setInterval(() => {
			index = (index + 1) % EVENTS.length;
		}, 2600);
		return () => window.clearInterval(id);
	});

	let visible = $derived(
		[0, 1, 2].map((offset) => {
			const i = (index + offset) % EVENTS.length;
			return { ...EVENTS[i], offsetSeconds: 12 + offset * 41 };
		})
	);
</script>

<div
	class="overflow-hidden rounded-sm border border-[#2A2A28] bg-white/[0.015] font-mono text-[11px] leading-none"
	aria-label="Live deployment ticker"
>
	<div class="flex items-center gap-2 border-b border-[#2A2A28] bg-white/[0.02] px-3 py-2">
		<span class="status-dot-live" aria-hidden="true"></span>
		<span class="text-[10px] tracking-[0.18em] text-[#FFB840] uppercase">LIVE</span>
		<span class="ml-auto hidden tracking-wider text-[#8A857A]/50 sm:inline">
			mistec.deploy / stream
		</span>
	</div>
	<div class="divide-y divide-[#2A2A28]/70">
		{#each visible as e, idx (`${index}-${idx}`)}
			<div
				class="flex items-center gap-3 px-3 py-2 tabular-nums transition-opacity duration-500 {idx ===
				0
					? 'opacity-100'
					: idx === 1
						? 'opacity-70'
						: 'opacity-40'}"
			>
				<span class="w-[60px] text-[#8A857A]/60">[{timestamp(e.offsetSeconds)}]</span>
				<span class="{toneClass(e.tone)} w-3">{e.glyph}</span>
				<span class="min-w-[110px] text-[#E8E3D6]">{e.event}</span>
				<span class="flex-1 truncate text-[#FFB840]/80">{e.project}</span>
				<span class="hidden text-[#8A857A]/60 md:inline">{e.env}</span>
			</div>
		{/each}
	</div>
</div>

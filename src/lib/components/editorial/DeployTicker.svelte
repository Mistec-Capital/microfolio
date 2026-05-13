<script>
	const EVENTS = [
		{ glyph: '▲', event: 'deploy ok',      project: 'digesto-rag',        env: 'prod',    tone: 'ok' },
		{ glyph: '◆', event: 'commit pushed',  project: 'guazuapp-mobile',    env: 'main',    tone: 'neutral' },
		{ glyph: '✓', event: 'ci passed',      project: 'hcd-obera',          env: 'staging', tone: 'ok' },
		{ glyph: '◇', event: 'build',          project: 'micopi-agent',       env: 'preview', tone: 'mid' },
		{ glyph: '▲', event: 'release v0.4.2', project: 'mibarrio',           env: 'prod',    tone: 'ok' },
		{ glyph: '◆', event: 'pr merged',      project: 'marcas-santafe',     env: 'main',    tone: 'neutral' },
		{ glyph: '✓', event: 'tests passed',   project: 'minucleo-erp',       env: 'main',    tone: 'ok' },
		{ glyph: '◇', event: 'migration',      project: 'expedientes-garupa', env: 'prod',    tone: 'mid' }
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
	class="border-[#2A2A28] bg-white/[0.015] rounded-sm font-mono text-[11px] leading-none overflow-hidden border"
	aria-label="Live deployment ticker"
>
	<div class="flex items-center gap-2 px-3 py-2 border-b border-[#2A2A28] bg-white/[0.02]">
		<span class="status-dot-live" aria-hidden="true"></span>
		<span class="text-[#FFB840] tracking-[0.18em] uppercase text-[10px]">LIVE</span>
		<span class="text-[#8A857A]/50 ml-auto tracking-wider hidden sm:inline">
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
				<span class="text-[#8A857A]/60 w-[60px]">[{timestamp(e.offsetSeconds)}]</span>
				<span class="{toneClass(e.tone)} w-3">{e.glyph}</span>
				<span class="text-[#E8E3D6] min-w-[110px]">{e.event}</span>
				<span class="text-[#FFB840]/80 truncate flex-1">{e.project}</span>
				<span class="text-[#8A857A]/60 hidden md:inline">{e.env}</span>
			</div>
		{/each}
	</div>
</div>

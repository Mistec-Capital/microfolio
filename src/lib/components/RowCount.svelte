<script>
	let { handler, class: className = '', ...props } = $props();

	let rowCount = $derived(handler.getRowCount());
</script>

<div class="font-mono text-[11px] uppercase tracking-wider text-[#8A857A] {className}" {...props}>
	<span class="text-[#FFB840] tabular-nums">{$rowCount.start}</span>
	→
	<span class="text-[#FFB840] tabular-nums">{$rowCount.end}</span>
	<span>de</span>
	<span class="text-[#E8E3D6] tabular-nums">{$rowCount.total}</span>
</div>

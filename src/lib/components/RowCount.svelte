<script>
	let { handler, class: className = '', ...props } = $props();

	let rowCount = $derived(handler.getRowCount());
</script>

<p class="t-nota tnum {className}" {...props}>
	<span class="text-bone">{$rowCount.start}–{$rowCount.end}</span> de
	<span class="text-bone">{$rowCount.total}</span>
</p>

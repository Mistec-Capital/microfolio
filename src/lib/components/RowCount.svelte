<script>
	let { handler, class: className = '', ...props } = $props();

	// Get row information from the DataHandler
	let rowCount = $derived(handler.getRowCount());
</script>

<div class="text-sm text-primary {className}" {...props}>
	Mostrando {$rowCount.start} a {$rowCount.end} de {$rowCount.total} entradas
</div>

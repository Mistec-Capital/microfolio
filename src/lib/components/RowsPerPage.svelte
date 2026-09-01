<script>
	let { handler, class: className = '', ...props } = $props();

	let rowsPerPageStore = $derived(handler.getRowsPerPage());
	const options = [5, 10, 20, 50, 100];
</script>

<label class="t-nota gap-s1 flex items-center {className}" {...props}>
	<span>Mostrar</span>
	<select bind:value={$rowsPerPageStore} class="input h-8 w-auto cursor-pointer py-0">
		{#each options as option (option)}
			<option value={option}>{option}</option>
		{/each}
	</select>
	<span>por página</span>
</label>

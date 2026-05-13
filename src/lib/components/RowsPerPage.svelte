<script>
	let { handler, class: className = '', ...props } = $props();

	let rowsPerPageStore = $derived(handler.getRowsPerPage());
	const options = [5, 10, 20, 50, 100];
</script>

<div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#8A857A] {className}" {...props}>
	<span>Mostrar</span>
	<select
		bind:value={$rowsPerPageStore}
		class="border border-[#2A2A28] bg-transparent text-[#E8E3D6] px-2 py-1 rounded-sm focus:outline-none focus:border-[#FFB840] cursor-pointer"
	>
		{#each options as option}
			<option value={option} class="bg-[#0A0A0A]">{option}</option>
		{/each}
	</select>
	<span>entradas</span>
</div>

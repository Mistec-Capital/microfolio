<script>
	let { handler, class: className = '', ...props } = $props();

	let rowsPerPageStore = $derived(handler.getRowsPerPage());
	const options = [5, 10, 20, 50, 100];
</script>

<div
	class="flex items-center gap-2 font-mono text-[11px] tracking-wider text-[#8A857A] uppercase {className}"
	{...props}
>
	<span>Mostrar</span>
	<select
		bind:value={$rowsPerPageStore}
		class="cursor-pointer rounded-sm border border-[#2A2A28] bg-transparent px-2 py-1 text-[#E8E3D6] focus:border-[#FFB840] focus:outline-none"
	>
		{#each options as option}
			<option value={option} class="bg-[#0A0A0A]">{option}</option>
		{/each}
	</select>
	<span>entradas</span>
</div>

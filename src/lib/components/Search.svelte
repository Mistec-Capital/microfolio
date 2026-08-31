<script>
	let { handler, class: className = '', ...props } = $props();

	let searchValue = $state('');

	$effect(() => {
		if (searchValue === '') {
			handler.clearFilter('search');
		} else {
			handler.filter('search', searchValue);
		}
	});
</script>

<input
	type="text"
	placeholder="Search..."
	bind:value={searchValue}
	class="border-primary focus:bg-box rounded-lg border px-4 py-2 focus:outline-none {className}"
	{...props}
/>

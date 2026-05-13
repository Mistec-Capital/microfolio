<script>
	let { n, size = 'md', class: className = '' } = $props();
	const SIZE = {
		sm: 'text-3xl md:text-4xl',
		md: 'text-5xl md:text-6xl',
		lg: 'text-6xl md:text-7xl'
	};
	let padded = $derived(typeof n === 'number' ? String(n).padStart(2, '0') : n);
	let sizeClass = $derived(SIZE[size] ?? SIZE.md);
</script>

<span class="serial {sizeClass} {className}" aria-hidden="true">
	Nº {padded}
</span>

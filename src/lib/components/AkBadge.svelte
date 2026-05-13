<script>
	let { children, small = false, class: className = '' } = $props();
</script>

<span class="tag-pill {small ? 'text-[10px]' : ''} {className}">
	{@render children()}
</span>

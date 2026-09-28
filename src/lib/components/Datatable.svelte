<script>
	let { children, class: className = '', ...props } = $props();
</script>

<div class={className} {...props}>
	{@render children()}
</div>

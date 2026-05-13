<script>
	let { paper = false, class: className = '' } = $props();
</script>

<span role="separator" aria-orientation="horizontal" class="{paper ? 'rule-h-paper' : 'rule-h'} {className}"></span>

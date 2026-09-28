<script>
	import Icon from './Icon.svelte';

	let { onclick = () => {}, class: className = '', ariaLabel = 'Cerrar' } = $props();
</script>

<button type="button" {onclick} class="btn btn-square bg-ink {className}" aria-label={ariaLabel}>
	<Icon name="close" size={20} />
</button>

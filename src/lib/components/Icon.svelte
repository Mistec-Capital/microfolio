<script>
	/**
	 * Íconos del sistema (spec §4.5): caja de 24, trazo 2, remates rectos,
	 * vértice exterior redondeado / interior vivo. Solo trazos verticales,
	 * horizontales y diagonales a 45°. Un tamaño por contexto: 16 junto a
	 * texto, 20 en botones, 24 en el header. Color heredado.
	 */
	const PATHS = {
		menu: 'M3 6h18M3 12h18M3 18h18',
		close: 'M5 5l14 14M19 5L5 19',
		'arrow-right': 'M4 12h16M13 5l7 7-7 7',
		'arrow-up-right': 'M6 18L18 6M8 6h10v10',
		'chevron-left': 'M15 5l-7 7 7 7',
		'chevron-right': 'M9 5l7 7-7 7',
		plus: 'M12 4v16M4 12h16'
	};

	let { name, size = 16, class: className = '' } = $props();
	let d = $derived(PATHS[name] ?? '');
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="butt"
	stroke-linejoin="round"
	aria-hidden="true"
	class="shrink-0 {className}"
>
	<path {d} />
</svg>

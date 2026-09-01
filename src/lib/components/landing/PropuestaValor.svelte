<script>
	import SectionHead from './SectionHead.svelte';

	const DIFERENCIALES = [
		'Ingeniería de software especializada.',
		'Desarrollo de productos digitales.',
		'Experiencia en proyectos públicos y privados.',
		'Equipos multidisciplinarios.',
		'Acompañamiento integral durante todo el ciclo de vida del producto.',
		'Soluciones escalables y mantenibles.',
		'Innovación aplicada a necesidades concretas.',
		'Compromiso con la calidad técnica y la mejora continua.'
	];
</script>

<SectionHead id="propuesta" n="02" label="Propuesta de valor">
	{#snippet title()}
		Acompañar <span class="accent">todo</span> el ciclo de vida de una solución.
	{/snippet}
	{#snippet lead()}
		No limitamos nuestra participación al desarrollo inicial de un sistema. Cada proyecto es una
		inversión de largo plazo y cada solución se diseña considerando escalabilidad, mantenimiento,
		seguridad y experiencia de usuario.
	{/snippet}

	<p class="t-kicker reveal">Diferenciales</p>
	<ol class="mt-s2 grid grid-cols-1 gap-x-[var(--gutter)] md:grid-cols-2">
		{#each DIFERENCIALES as texto, i (texto)}
			<li
				class="reveal gap-s2 border-rule py-s2 flex border-t {i === DIFERENCIALES.length - 1
					? 'border-b'
					: ''} {i >= DIFERENCIALES.length - 2 ? 'md:border-b' : ''}"
			>
				<span class="t-nota tnum w-10 shrink-0">{String(i + 1).padStart(2, '0')}</span>
				<span class="t-cuerpo">{texto}</span>
			</li>
		{/each}
	</ol>
</SectionHead>

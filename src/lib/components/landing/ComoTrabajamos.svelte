<script>
	import SectionHead from './SectionHead.svelte';
	import Icon from '$lib/components/Icon.svelte';

	const PASOS = [
		{
			titulo: 'Descubrimiento',
			texto:
				'Comprender el contexto, identificar necesidades, relevar información y definir los objetivos del proyecto. Esta etapa permite construir una visión compartida entre el cliente y el equipo de trabajo.'
		},
		{
			titulo: 'Estrategia',
			texto:
				'Definir el alcance, priorizar objetivos, seleccionar tecnologías y establecer una hoja de ruta para el desarrollo de la solución.'
		},
		{
			titulo: 'Diseño',
			texto:
				'Diseñar la experiencia de usuario, la arquitectura funcional y los componentes necesarios para garantizar una solución clara, intuitiva y eficiente.'
		},
		{
			titulo: 'Desarrollo',
			texto:
				'Construir la solución mediante procesos de ingeniería de software orientados a la calidad, la seguridad y la escalabilidad.'
		},
		{
			titulo: 'Implementación',
			texto:
				'Desplegar la solución, realizar pruebas, capacitar a los equipos y acompañar la puesta en funcionamiento.'
		},
		{
			titulo: 'Evolución Continua',
			texto:
				'El lanzamiento de un producto representa el inicio de una nueva etapa. Acompañamos la evolución permanente de las soluciones implementadas mediante mantenimiento, incorporación de mejoras, optimización del rendimiento y desarrollo de nuevas funcionalidades.'
		}
	];
</script>

<SectionHead id="metodo" n="04" label="Cómo trabajamos">
	{#snippet title()}
		Un proceso <span class="accent">continuo</span>.
	{/snippet}
	{#snippet lead()}
		Todos los proyectos siguen una metodología estructurada que permite comprender el problema,
		diseñar la solución adecuada y acompañar su evolución en el tiempo.
	{/snippet}

	<ol class="grid grid-cols-1 lg:grid-cols-6">
		{#each PASOS as paso, i (paso.titulo)}
			<li
				class="reveal border-rule py-s3 lg:pr-s3 lg:pl-s2 relative border-t lg:border-t-0 lg:border-l {i ===
				PASOS.length - 1
					? 'border-b lg:border-r lg:border-b-0'
					: ''}"
			>
				{#if i > 0}
					<span class="top-s3 bg-ink text-mist absolute -left-2 hidden lg:block" aria-hidden="true">
						<Icon name="chevron-right" size={16} />
					</span>
				{/if}
				<span class="t-nota tnum">{String(i + 1).padStart(2, '0')}</span>
				<h3 class="t-cuerpo mt-s2 font-medium">{paso.titulo}</h3>
				<p class="t-nota mt-s1">{paso.texto}</p>
			</li>
		{/each}
	</ol>
</SectionHead>

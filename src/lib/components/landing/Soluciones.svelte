<script>
	import SectionHead from './SectionHead.svelte';

	const SOLUCIONES = [
		{
			titulo: 'Desarrollo de Software a Medida',
			texto:
				'Diseño y construcción de aplicaciones adaptadas a procesos específicos, considerando criterios de escalabilidad, seguridad, mantenimiento y evolución continua.'
		},
		{
			titulo: 'Productos Digitales',
			texto:
				'Desarrollo de plataformas y soluciones digitales orientadas a resolver problemáticas comunes mediante productos reutilizables y preparados para crecer junto a las organizaciones.'
		},
		{
			titulo: 'Aplicaciones Web y Mobile',
			texto:
				'Diseño y desarrollo de aplicaciones multiplataforma centradas en la experiencia de usuario, la accesibilidad y el rendimiento.'
		},
		{
			titulo: 'Inteligencia Artificial',
			texto:
				'Incorporación de tecnologías de inteligencia artificial para automatizar procesos, optimizar decisiones y generar nuevas oportunidades de valor mediante el análisis inteligente de la información.'
		},
		{
			titulo: 'Automatización de Procesos',
			texto:
				'Implementación de soluciones que reducen tareas repetitivas, mejoran la eficiencia operativa y favorecen la integración entre procesos y sistemas.'
		},
		{
			titulo: 'Integraciones Tecnológicas',
			texto:
				'Conexión entre plataformas, servicios y aplicaciones para garantizar el intercambio seguro y eficiente de información entre diferentes entornos tecnológicos.'
		},
		{
			titulo: 'Arquitectura e Infraestructura',
			texto:
				'Diseño de arquitecturas tecnológicas escalables y servicios cloud preparados para soportar el crecimiento de cada organización.'
		},
		{
			titulo: 'Experiencia de Usuario (UX/UI)',
			texto:
				'Diseño de experiencias digitales simples, intuitivas y orientadas a facilitar la interacción entre las personas y la tecnología.'
		},
		{
			titulo: 'Consultoría Tecnológica',
			texto:
				'Acompañamiento estratégico para organizaciones que buscan definir, planificar o fortalecer sus procesos de transformación digital.'
		}
	];

	const CAPACIDADES =
		'Ingeniería de Software · Arquitectura de Soluciones · Desarrollo Backend · Desarrollo Frontend · Desarrollo Mobile · Plataformas Cloud · DevOps · Inteligencia Artificial · Automatización · Integraciones · UX Research · UX/UI Design · Bases de Datos · Analítica y Visualización de Información';
</script>

<SectionHead id="soluciones" n="03" label="Soluciones">
	{#snippet title()}
		Un mismo <span class="accent">ecosistema</span>. Servicios, productos y capacidades.
	{/snippet}
	{#snippet lead()}
		Un conjunto de capacidades que pueden implementarse de manera independiente o integrada según
		las necesidades de cada organización.
	{/snippet}

	<ol class="grid-rule grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#each SOLUCIONES as s, i (s.titulo)}
			<li class="reveal p-s3 flex min-h-[240px] flex-col">
				<span class="t-nota tnum">{String(i + 1).padStart(2, '0')}</span>
				<h3 class="t-cuerpo mt-s2 font-medium">{s.titulo}</h3>
				<p class="t-nota mt-s1">{s.texto}</p>
			</li>
		{/each}
	</ol>

	<p class="t-nota reveal mt-s3">Capacidades técnicas — {CAPACIDADES}</p>
</SectionHead>

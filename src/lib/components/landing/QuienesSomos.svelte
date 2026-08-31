<script>
	const VALORES = [
		{
			nombre: 'Compromiso',
			texto:
				'Asumimos cada proyecto como una responsabilidad compartida con nuestros clientes. Trabajamos con dedicación, cercanía y responsabilidad para alcanzar los objetivos definidos.'
		},
		{
			nombre: 'Calidad',
			texto:
				'Buscamos la excelencia técnica en cada etapa del desarrollo, promoviendo soluciones robustas, mantenibles y preparadas para evolucionar en el tiempo.'
		},
		{
			nombre: 'Innovación',
			texto:
				'Incorporamos nuevas tecnologías cuando aportan valor real a las organizaciones, priorizando siempre la utilidad por sobre la novedad.'
		},
		{
			nombre: 'Colaboración',
			texto:
				'Creemos que los mejores resultados se obtienen mediante el trabajo conjunto entre equipos, clientes y especialistas, promoviendo el intercambio permanente de conocimientos.'
		},
		{
			nombre: 'Transparencia',
			texto:
				'Construimos relaciones basadas en la confianza, la comunicación clara y el cumplimiento de los compromisos asumidos.'
		}
	];
</script>

<section id="nosotros" class="section">
	<div class="container-brand">
		<p class="t-kicker reveal"><span class="tnum">01</span> · Quiénes somos</p>

		<div class="grid-12 mt-s2">
			<h2 class="t-titulo reveal reveal-1 col-span-12 lg:col-span-5">
				Ingeniería de software y <span class="accent">soluciones</span> digitales para organizaciones
				públicas y privadas.
			</h2>

			<div class="mt-s3 col-span-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
				<p class="t-cuerpo reveal reveal-2">
					MisTec es una empresa especializada en ingeniería de software y desarrollo de soluciones
					digitales para organizaciones públicas y privadas. Desde sus inicios orientó su
					crecimiento al desarrollo de productos tecnológicos capaces de resolver desafíos reales
					mediante soluciones confiables, escalables y sostenibles.
				</p>
				<p class="t-cuerpo reveal reveal-3 mt-s2">
					Su experiencia integra consultoría tecnológica, arquitectura de software, diseño de
					experiencia de usuario, desarrollo de aplicaciones, automatización de procesos,
					inteligencia artificial e integración de sistemas. Acompaña a sus clientes durante todo el
					ciclo de vida de cada solución, desde la identificación de una necesidad hasta la
					evolución permanente del producto implementado.
				</p>

				<p class="t-kicker reveal mt-s4">Valores</p>
				<ul class="list-rule mt-s2">
					{#each VALORES as valor (valor.nombre)}
						<li class="grid-12 reveal">
							<span class="t-cuerpo col-span-12 font-medium md:col-span-4">{valor.nombre}</span>
							<span class="t-cuerpo text-mist col-span-12 md:col-span-8">{valor.texto}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

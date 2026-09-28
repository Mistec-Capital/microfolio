<script>
	import { base } from '$app/paths';
	import Icon from '$lib/components/Icon.svelte';
</script>

<!-- La entrada: una sola idea. Como la portada de presentación del manual,
     el título ocupa el tercio inferior. Único recurso gráfico del sitio:
     el isotipo seccionado y extendido fuera del borde derecho, a ≤ 14 % de contraste. -->
<section
	id="top"
	class="pb-s4 lg:pb-s5 relative flex min-h-[85vh] flex-col justify-end overflow-hidden pt-16"
>
	<img
		src="{base}/brand/mistec-isotipo-bone.png"
		alt=""
		aria-hidden="true"
		class="pointer-events-none absolute top-1/2 right-[-18%] hidden w-[44vw] max-w-[640px] -translate-y-1/2 opacity-[0.09] lg:block"
	/>

	<div class="container-brand relative">
		<p class="t-kicker reveal">Ingeniería de software y soluciones digitales · Posadas, Misiones</p>

		<div class="grid-12 mt-s2">
			<h1 class="t-titulo reveal reveal-1 col-span-12 lg:col-span-9">
				Ingeniería aplicada a <span class="accent">resolver</span> problemas.
			</h1>
			<p class="t-bajada reveal reveal-2 mt-s2 col-span-12 lg:col-span-7">
				Diseñamos, desarrollamos e implementamos plataformas tecnológicas para organizaciones
				públicas y privadas. Soluciones confiables, escalables y sostenibles.
			</p>
		</div>

		<div class="reveal reveal-3 mt-s3 gap-s2 flex flex-wrap items-center">
			<a class="btn" href="{base}/projects">Ver proyectos</a>
			<a class="btn-text" href="#contacto">Hablemos <Icon name="arrow-right" size={20} /></a>
		</div>
	</div>
</section>

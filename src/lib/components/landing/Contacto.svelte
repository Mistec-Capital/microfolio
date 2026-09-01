<script>
	import { siteConfig } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';

	const wa = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`;
	const fila = 'grid grid-cols-[1fr_auto] items-center gap-s2 md:grid-cols-[8rem_1fr_auto]';
	const label = 't-kicker col-span-2 md:col-span-1';
</script>

<section id="contacto" class="section">
	<div class="container-brand">
		<p class="t-kicker reveal"><span class="tnum">07</span> · Contacto</p>

		<div class="grid-12 mt-s2">
			<div class="col-span-12 lg:col-span-5">
				<h2 class="t-titulo reveal reveal-1">
					Hablemos de tu <span class="accent">proyecto</span>.
				</h2>
				<p class="t-bajada reveal reveal-2 mt-s2">Contanos qué necesitás y te respondemos.</p>
			</div>

			<ul class="list-rule mt-s3 col-span-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
				<li class="reveal">
					<a href={wa} target="_blank" rel="noopener noreferrer" class="link {fila}">
						<span class={label}>WhatsApp</span>
						<span>
							<span class="t-cuerpo text-bone block">{siteConfig.contact.whatsapp}</span>
							<span class="t-nota">Lunes a viernes, 9 a 18 h</span>
						</span>
						<Icon name="arrow-up-right" size={16} />
					</a>
				</li>
				<li class="reveal reveal-1">
					<a href="mailto:{siteConfig.contact.email}" class="link {fila}">
						<span class={label}>Email</span>
						<span class="t-cuerpo text-bone break-all">{siteConfig.contact.email}</span>
						<Icon name="arrow-up-right" size={16} />
					</a>
				</li>
				<li class="reveal reveal-2">
					<div class="gap-s2 grid grid-cols-1 items-center md:grid-cols-[8rem_1fr]">
						<span class="t-kicker">Ubicación</span>
						<span class="t-cuerpo">{siteConfig.contact.location}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</section>

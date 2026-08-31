<script>
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/config.js';

	const year = new Date().getFullYear();
	const wa = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`;

	const empresa = [
		{ name: 'Nosotros', href: `${base}/about` },
		{ name: 'Proyectos', href: `${base}/projects` },
		{ name: 'Lista', href: `${base}/list` },
		{ name: 'Mapa', href: `${base}/map` }
	];
	const soluciones = [
		{ name: 'Soluciones', href: `${base}/#soluciones` },
		{ name: 'Cómo trabajamos', href: `${base}/#metodo` },
		{ name: 'Alcance', href: `${base}/#alcance` }
	];
</script>

<footer class="border-rule border-t">
	<div class="container-brand py-s4">
		<div class="grid-12 gap-y-s4">
			<div class="col-span-12 md:col-span-4">
				<img
					src="{base}/brand/mistec-isotipo-bone.png"
					alt="MisTec"
					width="45"
					height="40"
					class="h-10 w-auto"
				/>
				<p class="t-nota mt-s2 max-w-[32ch]">
					Ingeniería de software y soluciones digitales para organizaciones públicas y privadas.
					Posadas, Misiones, Argentina.
				</p>
			</div>

			<div class="col-span-6 md:col-span-2 md:col-start-6">
				<p class="t-kicker">Empresa</p>
				<ul class="mt-s2 gap-s1 flex flex-col">
					{#each empresa as item (item.href)}
						<li><a href={item.href} class="link t-nota">{item.name}</a></li>
					{/each}
				</ul>
			</div>

			<div class="col-span-6 md:col-span-2">
				<p class="t-kicker">Soluciones</p>
				<ul class="mt-s2 gap-s1 flex flex-col">
					{#each soluciones as item (item.href)}
						<li><a href={item.href} class="link t-nota">{item.name}</a></li>
					{/each}
				</ul>
			</div>

			<div class="col-span-12 md:col-span-3">
				<p class="t-kicker">Contacto</p>
				<ul class="mt-s2 gap-s1 flex flex-col">
					<li>
						<a href="mailto:{siteConfig.contact.email}" class="link t-nota break-all">
							{siteConfig.contact.email}
						</a>
					</li>
					<li>
						<a href={wa} target="_blank" rel="noopener noreferrer" class="link t-nota">
							{siteConfig.contact.whatsapp}
						</a>
					</li>
					<li class="t-nota">{siteConfig.contact.location}</li>
				</ul>
			</div>
		</div>

		<div
			class="t-nota mt-s4 gap-s1 border-rule pt-s2 flex flex-col border-t md:flex-row md:justify-between"
		>
			<span>© {year} MisTec</span>
			<span>Posadas, Misiones · Argentina · Desde 2020</span>
		</div>
	</div>
</footer>

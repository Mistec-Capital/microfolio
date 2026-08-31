<script>
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/config.js';
	import Kicker from '$lib/components/editorial/Kicker.svelte';
	import Rule from '$lib/components/editorial/Rule.svelte';
	import Marginalia from '$lib/components/editorial/Marginalia.svelte';
</script>

<footer class="section-ink relative border-t border-[#2A2A28] pt-20 pb-10">
	<div class="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
		<!-- Sitemap grid -->
		<div class="mb-16 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-12">
			<div>
				<Kicker class="mb-4 block">MISTEC</Kicker>
				<p class="font-body max-w-[28ch] text-sm leading-relaxed text-[#8A857A]">
					Construimos software desde Posadas, Misiones. Desde el interior, desde 2020.
				</p>
			</div>
			<div>
				<Kicker class="mb-4 block">Empresa</Kicker>
				<ul class="space-y-2.5">
					<li>
						<a
							href="{base}/#manifiesto"
							class="font-body text-sm text-[#8A857A] transition-colors hover:text-[#FFB840]"
						>
							Nosotros
						</a>
					</li>
					<li>
						<a
							href="{base}/#obra"
							class="font-body text-sm text-[#8A857A] transition-colors hover:text-[#FFB840]"
						>
							Proyectos
						</a>
					</li>
					<li>
						<a
							href="{base}/projects"
							class="font-body text-sm text-[#8A857A] transition-colors hover:text-[#FFB840]"
						>
							Ver todos
						</a>
					</li>
				</ul>
			</div>
			<div>
				<Kicker class="mb-4 block">Servicios</Kicker>
				<ul class="space-y-2.5">
					<li>
						<a
							href="{base}/#plataformas"
							class="font-body text-sm text-[#8A857A] transition-colors hover:text-[#FFB840]"
						>
							Plataformas
						</a>
					</li>
					<li>
						<a
							href="{base}/#gobierno"
							class="font-body text-sm text-[#8A857A] transition-colors hover:text-[#FFB840]"
						>
							Gobierno
						</a>
					</li>
					<li>
						<a
							href="{base}/#ia"
							class="font-body text-sm text-[#8A857A] transition-colors hover:text-[#FFB840]"
						>
							IA & Automatización
						</a>
					</li>
					<li>
						<a
							href="{base}/#capacidades"
							class="font-body text-sm text-[#8A857A] transition-colors hover:text-[#FFB840]"
						>
							Capacidades
						</a>
					</li>
				</ul>
			</div>
			<div>
				<Kicker class="mb-4 block">Contacto</Kicker>
				<ul class="space-y-2.5">
					<li>
						<a
							href="mailto:{siteConfig.contact.email}"
							class="font-mono text-xs text-[#8A857A] transition-colors hover:text-[#FFB840]"
						>
							{siteConfig.contact.email}
						</a>
					</li>
					<li>
						<a
							href="https://wa.me/{siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}"
							target="_blank"
							rel="noopener noreferrer"
							class="font-mono text-xs text-[#8A857A] transition-colors hover:text-[#FFB840]"
						>
							{siteConfig.contact.whatsapp}
						</a>
					</li>
					<li>
						<span class="font-mono text-xs text-[#8A857A]/60">
							{siteConfig.contact.location}
						</span>
					</li>
				</ul>
			</div>
		</div>

		<Rule />

		<!-- Bottom row -->
		<div class="flex flex-col gap-3 pt-6 md:flex-row md:items-center md:justify-between">
			<Marginalia>
				© {new Date().getFullYear()} MisTec — Fundado en Posadas, Misiones, Argentina — 2020
			</Marginalia>
			<Marginalia>
				v{siteConfig.version} / MisTec — {siteConfig.contact.email}
			</Marginalia>
		</div>
	</div>
</footer>

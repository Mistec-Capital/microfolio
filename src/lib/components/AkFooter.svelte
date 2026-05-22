<script>
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/config.js';
	import Kicker from '$lib/components/editorial/Kicker.svelte';
	import Rule from '$lib/components/editorial/Rule.svelte';
	import Marginalia from '$lib/components/editorial/Marginalia.svelte';
</script>

<footer class="section-ink border-t border-[#2A2A28] pt-20 pb-10 relative">
	<div class="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
		<!-- Sitemap grid -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
			<div>
				<Kicker class="block mb-4">MISTEC CAPITAL</Kicker>
				<p class="font-body text-[#8A857A] text-sm leading-relaxed max-w-[28ch]">
					Construimos software desde Posadas, Misiones. Desde el interior, desde 2020.
				</p>
			</div>
			<div>
				<Kicker class="block mb-4">Empresa</Kicker>
				<ul class="space-y-2.5">
					<li>
						<a
							href="{base}/#manifiesto"
							class="font-body text-[#8A857A] text-sm hover:text-[#FFB840] transition-colors"
						>
							Nosotros
						</a>
					</li>
					<li>
						<a
							href="{base}/#obra"
							class="font-body text-[#8A857A] text-sm hover:text-[#FFB840] transition-colors"
						>
							Proyectos
						</a>
					</li>
					<li>
						<a
							href="{base}/projects"
							class="font-body text-[#8A857A] text-sm hover:text-[#FFB840] transition-colors"
						>
							Ver todos
						</a>
					</li>
				</ul>
			</div>
			<div>
				<Kicker class="block mb-4">Servicios</Kicker>
				<ul class="space-y-2.5">
					<li>
						<a
							href="{base}/#plataformas"
							class="font-body text-[#8A857A] text-sm hover:text-[#FFB840] transition-colors"
						>
							Plataformas
						</a>
					</li>
					<li>
						<a
							href="{base}/#gobierno"
							class="font-body text-[#8A857A] text-sm hover:text-[#FFB840] transition-colors"
						>
							Gobierno
						</a>
					</li>
					<li>
						<a
							href="{base}/#ia"
							class="font-body text-[#8A857A] text-sm hover:text-[#FFB840] transition-colors"
						>
							IA & Automatización
						</a>
					</li>
					<li>
						<a
							href="{base}/#capacidades"
							class="font-body text-[#8A857A] text-sm hover:text-[#FFB840] transition-colors"
						>
							Capacidades
						</a>
					</li>
				</ul>
			</div>
			<div>
				<Kicker class="block mb-4">Contacto</Kicker>
				<ul class="space-y-2.5">
					<li>
						<a
							href="mailto:{siteConfig.contact.email}"
							class="font-mono text-xs text-[#8A857A] hover:text-[#FFB840] transition-colors"
						>
							{siteConfig.contact.email}
						</a>
					</li>
					<li>
						<a
							href="https://wa.me/{siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}"
							target="_blank"
							rel="noopener noreferrer"
							class="font-mono text-xs text-[#8A857A] hover:text-[#FFB840] transition-colors"
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
		<div class="flex flex-col md:flex-row md:justify-between md:items-center pt-6 gap-3">
			<Marginalia>
				© {new Date().getFullYear()} MISTEC CAPITAL S.R.L. — Fundado en Posadas, Misiones, Argentina — 2020
			</Marginalia>
			<Marginalia>
				v{siteConfig.version} / MISTEC Capital S.R.L. — {siteConfig.contact.email}
			</Marginalia>
		</div>
	</div>
</footer>

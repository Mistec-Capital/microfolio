<script>
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import IconGlobe from '~icons/lucide/globe';
	import IconSmartphone from '~icons/lucide/smartphone';
	import IconCpu from '~icons/lucide/cpu';
	import IconShoppingCart from '~icons/lucide/shopping-cart';
	import IconBarChart from '~icons/lucide/bar-chart-3';
	import IconPackage from '~icons/lucide/package';
	import IconBookOpen from '~icons/lucide/book-open';
	import IconWorkflow from '~icons/lucide/workflow';
	import IconUtensils from '~icons/lucide/utensils';
	import IconTruck from '~icons/lucide/truck';
	import IconCalendar from '~icons/lucide/calendar-check';
	import IconCard from '~icons/lucide/credit-card';
	import IconLayers from '~icons/lucide/layers';

	const GROUPS = [
		{
			id: 'plataforma',
			label: 'Plataforma',
			caption: 'Producto y canales',
			items: [
				{ icon: IconGlobe, title: 'Desarrollo Web', kicker: 'SPAs · APIs · PWAs' },
				{ icon: IconSmartphone, title: 'Desarrollo Móvil', kicker: 'iOS · Android · React Native' },
				{ icon: IconCpu, title: 'Desarrollo IoT', kicker: 'MQTT · Edge · Sensores' },
				{ icon: IconShoppingCart, title: 'E-commerce', kicker: 'B2B · B2C · Integraciones' }
			]
		},
		{
			id: 'operaciones',
			label: 'Operaciones',
			caption: 'Backbone empresarial',
			items: [
				{ icon: IconBarChart, title: 'CRM', kicker: 'Pipeline · Seguimiento · Reportes' },
				{ icon: IconPackage, title: 'ERP', kicker: 'Contabilidad · Inventario · RRHH' },
				{
					icon: IconBookOpen,
					title: 'Contabilidad',
					kicker: 'Fiscal LATAM · Facturación electrónica'
				},
				{ icon: IconWorkflow, title: 'BPM', kicker: 'Workflows · Automatización' }
			]
		},
		{
			id: 'verticales',
			label: 'Verticales',
			caption: 'Soluciones de dominio',
			items: [
				{ icon: IconUtensils, title: 'Gastronomía', kicker: 'Mesas · Pedidos · Delivery' },
				{
					icon: IconTruck,
					title: 'Logística y Flotas',
					kicker: 'Trazabilidad · Rutas · Cold chain'
				},
				{
					icon: IconCalendar,
					title: 'Turnos y Reservas',
					kicker: 'Multi-sucursal · Notificaciones'
				},
				{
					icon: IconCard,
					title: 'Suscripciones',
					kicker: 'Recurrente · Billing · Portales'
				}
			]
		}
	];

	let counter = 0;
	function nextNumber() {
		counter += 1;
		return counter;
	}
</script>

<section
	id="capacidades"
	use:scrollReveal
	class="section-ink py-32 relative overflow-hidden"
>
	<div class="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="max-w-[700px] mb-14 reveal">
			<span class="chip">
				<IconLayers class="w-3 h-3" />
				CAPACIDADES
			</span>
			<h2
				class="font-display font-bold text-[#E8E3D6] tracking-[-0.04em] leading-[1.05] mt-6"
				style="font-size: clamp(2.25rem, 4.5vw, 3.75rem)"
			>
				Doce disciplinas bajo un mismo techo.
			</h2>
			<p class="mt-5 font-body text-base md:text-lg text-[#8A857A] max-w-[58ch] leading-relaxed">
				Equipos de desarrollo multidisciplinarios que cubren desde frontend moderno hasta
				integración IoT y contabilidad fiscal LATAM.
			</p>
		</div>

		<!-- Three-column domain layout -->
		<div
			class="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2A2A28] border border-[#2A2A28] rounded-sm overflow-hidden"
		>
			{#each GROUPS as group, groupIdx (group.id)}
				<div
					class="section-ink bg-white/[0.005] p-7 md:p-8 reveal reveal-delay-{groupIdx + 1}"
				>
					<!-- Column header -->
					<div class="flex items-baseline justify-between pb-5 mb-5 border-b border-[#2A2A28]">
						<div>
							<div class="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FFB840] mb-1.5">
								{String(groupIdx + 1).padStart(2, '0')} · {group.label}
							</div>
							<div class="font-body text-xs text-[#8A857A]/70">
								{group.caption}
							</div>
						</div>
						<span class="font-mono text-[10px] text-[#8A857A]/40 tabular-nums">
							{String(group.items.length).padStart(2, '0')}
						</span>
					</div>

					<!-- Items -->
					<ul class="space-y-1">
						{#each group.items as cap}
							{@const number = nextNumber()}
							{@const Icon = cap.icon}
							<li
								class="group flex items-start gap-4 py-3 px-2 -mx-2 rounded-sm hover:bg-[#FFB840]/[0.04] transition-colors"
							>
								<span
									class="font-mono text-[10px] text-[#8A857A]/40 tabular-nums shrink-0 mt-1.5 w-5"
								>
									{String(number).padStart(2, '0')}
								</span>
								<Icon
									class="w-4 h-4 text-[#FFB840]/80 shrink-0 mt-1 group-hover:text-[#FFB840] transition-colors"
								/>
								<div class="flex-1 min-w-0">
									<div
										class="font-display font-medium text-[#E8E3D6] text-sm group-hover:text-[#FFB840] transition-colors"
									>
										{cap.title}
									</div>
									<div
										class="mt-0.5 font-mono text-[10px] tracking-wider text-[#8A857A]/70 leading-relaxed"
									>
										{cap.kicker}
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Footnote -->
		<div
			class="mt-10 font-mono text-xs text-[#8A857A]/60 tracking-wider flex items-center gap-3"
		>
			<span class="text-[#FFB840]">▲</span>
			<span>12 disciplinas · 1 stack común · equipos formados in-house</span>
		</div>
	</div>
</section>

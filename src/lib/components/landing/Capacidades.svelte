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

<section id="capacidades" use:scrollReveal class="section-ink relative overflow-hidden py-32">
	<div class="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="reveal mb-14 max-w-[700px]">
			<span class="chip">
				<IconLayers class="h-3 w-3" />
				CAPACIDADES
			</span>
			<h2
				class="font-display mt-6 leading-[1.05] font-bold tracking-[-0.04em] text-[#E8E3D6]"
				style="font-size: clamp(2.25rem, 4.5vw, 3.75rem)"
			>
				Doce disciplinas bajo un mismo techo.
			</h2>
			<p class="font-body mt-5 max-w-[58ch] text-base leading-relaxed text-[#8A857A] md:text-lg">
				Equipos de desarrollo multidisciplinarios que cubren desde frontend moderno hasta
				integración IoT y contabilidad fiscal LATAM.
			</p>
		</div>

		<!-- Three-column domain layout -->
		<div
			class="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[#2A2A28] bg-[#2A2A28] md:grid-cols-3"
		>
			{#each GROUPS as group, groupIdx (group.id)}
				<div class="section-ink reveal bg-white/[0.005] p-7 md:p-8 reveal-delay-{groupIdx + 1}">
					<!-- Column header -->
					<div class="mb-5 flex items-baseline justify-between border-b border-[#2A2A28] pb-5">
						<div>
							<div class="mb-1.5 font-mono text-[10px] tracking-[0.18em] text-[#FFB840] uppercase">
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
								class="group -mx-2 flex items-start gap-4 rounded-sm px-2 py-3 transition-colors hover:bg-[#FFB840]/[0.04]"
							>
								<span
									class="mt-1.5 w-5 shrink-0 font-mono text-[10px] text-[#8A857A]/40 tabular-nums"
								>
									{String(number).padStart(2, '0')}
								</span>
								<Icon
									class="mt-1 h-4 w-4 shrink-0 text-[#FFB840]/80 transition-colors group-hover:text-[#FFB840]"
								/>
								<div class="min-w-0 flex-1">
									<div
										class="font-display text-sm font-medium text-[#E8E3D6] transition-colors group-hover:text-[#FFB840]"
									>
										{cap.title}
									</div>
									<div
										class="mt-0.5 font-mono text-[10px] leading-relaxed tracking-wider text-[#8A857A]/70"
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
		<div class="mt-10 flex items-center gap-3 font-mono text-xs tracking-wider text-[#8A857A]/60">
			<span class="text-[#FFB840]">▲</span>
			<span>12 disciplinas · 1 stack común · equipos formados in-house</span>
		</div>
	</div>
</section>

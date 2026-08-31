<script>
	import { base } from '$app/paths';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';
	import IconMessageSquare from '~icons/lucide/message-square';
	import IconTicket from '~icons/lucide/ticket';
	import IconTrendingUp from '~icons/lucide/trending-up';
	import IconHome from '~icons/lucide/home';
	import IconBoxes from '~icons/lucide/boxes';
	import IconBot from '~icons/lucide/bot';
	import IconCalendar from '~icons/lucide/calendar-check';

	let { projects = [] } = $props();

	const PLATFORMS = [
		{
			slug: 'guazuapp',
			icon: IconMessageSquare,
			title: 'GuazuApp',
			desc: 'Mensajería multicanal y gestión de tickets para equipos de soporte.',
			stack: ['react', 'ws', 'postgres'],
			version: 'v0.6.2'
		},
		{
			slug: 'miturno',
			icon: IconCalendar,
			title: 'MiTurno',
			desc: 'Sistema de turnos y reservas multi-sucursal con agenda online y pagos.',
			stack: ['react', 'rails', 'redis'],
			version: 'v0.4.0'
		},
		{
			slug: 'mirevenue',
			icon: IconTrendingUp,
			title: 'MiRevenue',
			desc: 'CRM especializado en pipeline de ventas e ingresos comerciales.',
			stack: ['next', 'postgres', 'tRPC'],
			version: 'v0.3.1'
		},
		{
			slug: 'mibarrio',
			icon: IconHome,
			title: 'MiBarrio',
			desc: 'Administración integral de barrios cerrados, socios y servicios.',
			stack: ['react', 'postgres', 'stripe'],
			version: 'v0.5.4'
		},
		{
			slug: 'benicio-franquicias',
			icon: IconBoxes,
			title: 'Benicio · ERP',
			desc: 'ERP modular para gestión de franquicias: stock, ventas y caja.',
			stack: ['rails', 'postgres', 'sidekiq'],
			version: 'v0.2.0'
		},
		{
			slug: 'miticket',
			icon: IconTicket,
			title: 'MiTicket',
			desc: 'Gestión de equipos técnicos, órdenes de trabajo y SLA en tiempo real.',
			stack: ['react', 'rails', 'redis'],
			version: 'v0.4.0'
		}
	];

	// Look up real project from microfolio content (if present) to link to /projects/<slug>
	function lookup(slug) {
		return projects.find((p) => p.slug === slug);
	}

	function isInDev(realProject) {
		const v = (realProject?.status || '').toLowerCase();
		return v.includes('desarrollo');
	}
</script>

<section
	id="plataformas"
	use:scrollReveal
	class="section-paper bg-mesh-amber relative overflow-hidden py-32"
>
	<div class="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="reveal mb-14 flex flex-wrap items-end justify-between gap-8">
			<div class="max-w-[700px]">
				<span class="chip-amber mb-6">
					<span class="status-dot" aria-hidden="true"></span>
					PLATAFORMAS Mi*
				</span>
				<h2
					class="font-display mt-6 leading-[1.05] font-bold tracking-[-0.04em] text-[#E8E3D6]"
					style="font-size: clamp(2.25rem, 4.5vw, 3.75rem)"
				>
					Productos SaaS propios, hechos en Argentina.
				</h2>
				<p class="font-body mt-5 max-w-[58ch] text-base leading-relaxed text-[#8A857A] md:text-lg">
					Software de gestión construido desde nuestra experiencia, pensado para el mercado LATAM.
				</p>
			</div>
		</div>

		<!-- Bento grid -->
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each PLATFORMS as platform, idx (platform.slug)}
				{@const real = lookup(platform.slug)}
				{@const href = real ? `${base}/projects/${platform.slug}` : `${base}/projects`}
				{@const dev = isInDev(real)}
				{@const Icon = platform.icon}
				<a
					{href}
					class="card-gradient-border group reveal cursor-pointer p-7 reveal-delay-{Math.min(
						(idx % 3) + 1,
						3
					)}"
				>
					<!-- Icon + status -->
					<div class="mb-8 flex items-start justify-between">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-sm border border-[#FFB840]/30 bg-[#FFB840]/10 transition-all duration-300 group-hover:border-[#FFB840]/50 group-hover:bg-[#FFB840]/15 group-hover:shadow-[0_0_30px_-6px_rgba(255,184,64,0.4)]"
						>
							<Icon class="h-5 w-5 text-[#FFB840]" />
						</div>
						<div class="flex flex-col items-end gap-1.5">
							<span
								class="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase {dev
									? 'text-[#FFB840]'
									: 'text-[#8A857A]'}"
							>
								<span class={dev ? 'status-dot' : 'status-dot-muted'} aria-hidden="true"></span>
								{dev ? 'EN DESARROLLO' : 'ACTIVO'}
							</span>
							<span class="font-mono text-[10px] text-[#8A857A]/50 tabular-nums">
								{platform.version}
							</span>
						</div>
					</div>

					<!-- Name -->
					<h3
						class="font-display mb-3 text-2xl font-semibold tracking-[-0.02em] text-[#E8E3D6] transition-colors group-hover:text-[#FFB840]"
					>
						{platform.title}
					</h3>

					<!-- Description -->
					<p class="font-body mb-5 min-h-[2.5rem] text-sm leading-relaxed text-[#8A857A]">
						{platform.desc}
					</p>

					<!-- Stack badges -->
					<div class="mb-7 flex flex-wrap gap-1.5">
						{#each platform.stack as s}
							<span
								class="rounded-sm border border-[#2A2A28] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#8A857A]/80 transition-colors group-hover:border-[#FFB840]/30 group-hover:text-[#E8E3D6]"
							>
								{s}
							</span>
						{/each}
					</div>

					<!-- Footer link -->
					<div class="flex items-center justify-between border-t border-[#2A2A28] pt-5">
						<span
							class="font-mono text-[10px] tracking-wider text-[#8A857A] uppercase transition-colors group-hover:text-[#FFB840]"
						>
							Ver ficha
						</span>
						<IconArrowUpRight
							class="h-4 w-4 text-[#8A857A] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FFB840]"
						/>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<script>
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';
	import IconMessageCircle from '~icons/lucide/message-circle';
	import IconMail from '~icons/lucide/mail';

	const phone = '+54 9 3764 734375';
	const email = 'mistec.capital@gmail.com';
	const waLink = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
</script>

<section id="contacto" use:scrollReveal class="section-ink relative overflow-hidden py-32">
	<div
		class="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
		style="background: radial-gradient(ellipse, rgba(255, 184, 64, 0.07) 0%, transparent 60%); filter: blur(80px);"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="reveal mx-auto mb-14 max-w-[800px] text-center">
			<span class="chip-amber">
				<span class="status-dot" aria-hidden="true"></span>
				CONTACTO
			</span>
			<h2
				class="font-display mt-6 leading-[1.02] font-bold tracking-[-0.04em] text-[#E8E3D6]"
				style="font-size: clamp(2.75rem, 6vw, 5rem)"
			>
				Agendemos una reunión. <span class="gradient-text-amber">→</span>
			</h2>
			<p
				class="font-body mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-[#8A857A] md:text-lg"
			>
				¿Tenés un proyecto en mente? Contanos qué necesitás y charlemos cómo podemos ayudarte.
			</p>
		</div>

		<!-- Contact cards -->
		<div class="mx-auto grid max-w-[800px] grid-cols-1 gap-5 md:grid-cols-2">
			<a
				href={waLink}
				target="_blank"
				rel="noopener noreferrer"
				class="card-gradient-border group reveal reveal-delay-1 p-7"
			>
				<div class="mb-5 flex items-start justify-between">
					<div
						class="flex h-11 w-11 items-center justify-center rounded-sm border border-[#FFB840]/30 bg-[#FFB840]/10 transition-all duration-300 group-hover:shadow-[0_0_24px_-6px_rgba(255,184,64,0.4)]"
					>
						<IconMessageCircle class="h-5 w-5 text-[#FFB840]" />
					</div>
					<span class="font-mono text-[10px] tracking-wider text-[#8A857A] uppercase">
						WhatsApp
					</span>
				</div>
				<div
					class="font-mono text-base text-[#E8E3D6] transition-colors group-hover:text-[#FFB840] md:text-lg"
				>
					{phone}
				</div>
				<div class="mt-5 flex items-center justify-between border-t border-[#2A2A28] pt-4">
					<span class="font-mono text-[10px] tracking-wider text-[#8A857A] uppercase">
						Lunes a Viernes 9 a 18hs
					</span>
					<IconArrowUpRight
						class="h-4 w-4 text-[#8A857A] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FFB840]"
					/>
				</div>
			</a>

			<a href="mailto:{email}" class="card-gradient-border group reveal reveal-delay-2 p-7">
				<div class="mb-5 flex items-start justify-between">
					<div
						class="flex h-11 w-11 items-center justify-center rounded-sm border border-[#FFB840]/30 bg-[#FFB840]/10 transition-all duration-300 group-hover:shadow-[0_0_24px_-6px_rgba(255,184,64,0.4)]"
					>
						<IconMail class="h-5 w-5 text-[#FFB840]" />
					</div>
					<span class="font-mono text-[10px] tracking-wider text-[#8A857A] uppercase"> Email </span>
				</div>
				<div
					class="font-mono text-base break-all text-[#E8E3D6] transition-colors group-hover:text-[#FFB840] md:text-lg"
				>
					{email}
				</div>
				<div class="mt-5 flex items-center justify-between border-t border-[#2A2A28] pt-4">
					<span class="font-mono text-[10px] tracking-wider text-[#8A857A] uppercase">
						Respondemos en &lt; 24H
					</span>
					<IconArrowUpRight
						class="h-4 w-4 text-[#8A857A] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FFB840]"
					/>
				</div>
			</a>
		</div>
	</div>
</section>

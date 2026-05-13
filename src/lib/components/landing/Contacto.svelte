<script>
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';
	import IconMessageCircle from '~icons/lucide/message-circle';
	import IconMail from '~icons/lucide/mail';

	const phone = '+54 9 3764 123456';
	const email = 'mistec.capital@gmail.com';
	const waLink = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
</script>

<section
	id="contacto"
	use:scrollReveal
	class="section-ink py-32 relative overflow-hidden"
>
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
		style="background: radial-gradient(ellipse, rgba(255, 184, 64, 0.07) 0%, transparent 60%); filter: blur(80px);"
		aria-hidden="true"
	></div>

	<div class="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="text-center max-w-[800px] mx-auto mb-14 reveal">
			<span class="chip-amber">
				<span class="status-dot" aria-hidden="true"></span>
				CONTACTO
			</span>
			<h2
				class="font-display font-bold text-[#E8E3D6] tracking-[-0.04em] leading-[1.02] mt-6"
				style="font-size: clamp(2.75rem, 6vw, 5rem)"
			>
				Agendemos una reunión. <span class="gradient-text-amber">→</span>
			</h2>
			<p
				class="mt-6 font-body text-base md:text-lg text-[#8A857A] max-w-[52ch] mx-auto leading-relaxed"
			>
				¿Tenés un proyecto en mente? Contanos qué necesitás y charlemos cómo podemos ayudarte.
			</p>
		</div>

		<!-- Contact cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[800px] mx-auto">
			<a
				href={waLink}
				target="_blank"
				rel="noopener noreferrer"
				class="card-gradient-border group p-7 reveal reveal-delay-1"
			>
				<div class="flex items-start justify-between mb-5">
					<div
						class="w-11 h-11 rounded-sm bg-[#FFB840]/10 border border-[#FFB840]/30 flex items-center justify-center group-hover:shadow-[0_0_24px_-6px_rgba(255,184,64,0.4)] transition-all duration-300"
					>
						<IconMessageCircle class="w-5 h-5 text-[#FFB840]" />
					</div>
					<span class="font-mono text-[10px] uppercase tracking-wider text-[#8A857A]">
						WhatsApp
					</span>
				</div>
				<div
					class="font-mono text-base md:text-lg text-[#E8E3D6] group-hover:text-[#FFB840] transition-colors"
				>
					{phone}
				</div>
				<div class="mt-5 flex items-center justify-between pt-4 border-t border-[#2A2A28]">
					<span class="font-mono text-[10px] uppercase tracking-wider text-[#8A857A]">
						Lunes a Viernes 9 a 18hs
					</span>
					<IconArrowUpRight
						class="w-4 h-4 text-[#8A857A] group-hover:text-[#FFB840] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
					/>
				</div>
			</a>

			<a
				href="mailto:{email}"
				class="card-gradient-border group p-7 reveal reveal-delay-2"
			>
				<div class="flex items-start justify-between mb-5">
					<div
						class="w-11 h-11 rounded-sm bg-[#FFB840]/10 border border-[#FFB840]/30 flex items-center justify-center group-hover:shadow-[0_0_24px_-6px_rgba(255,184,64,0.4)] transition-all duration-300"
					>
						<IconMail class="w-5 h-5 text-[#FFB840]" />
					</div>
					<span class="font-mono text-[10px] uppercase tracking-wider text-[#8A857A]">
						Email
					</span>
				</div>
				<div
					class="font-mono text-base md:text-lg text-[#E8E3D6] group-hover:text-[#FFB840] transition-colors break-all"
				>
					{email}
				</div>
				<div class="mt-5 flex items-center justify-between pt-4 border-t border-[#2A2A28]">
					<span class="font-mono text-[10px] uppercase tracking-wider text-[#8A857A]">
						Respondemos en &lt; 24H
					</span>
					<IconArrowUpRight
						class="w-4 h-4 text-[#8A857A] group-hover:text-[#FFB840] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
					/>
				</div>
			</a>
		</div>
	</div>
</section>

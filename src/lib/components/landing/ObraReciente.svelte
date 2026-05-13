<script>
	import { base } from '$app/paths';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';

	let { projects, totalCount } = $props();

	function shortTitle(title) {
		return (title || '').split(' - ')[0].split(' — ')[0];
	}
</script>

<section
	id="obra"
	use:scrollReveal
	class="section-ink py-32 relative"
>
	<div class="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="flex flex-wrap items-end justify-between gap-8 mb-14 reveal">
			<div class="max-w-[700px]">
				<span class="chip mb-6">
					<span class="status-dot" aria-hidden="true"></span>
					PROYECTOS
				</span>
				<h2
					class="font-display font-bold text-[#E8E3D6] tracking-[-0.04em] leading-[1.05] mt-6"
					style="font-size: clamp(2.25rem, 4.5vw, 3.75rem)"
				>
					Nueve proyectos destacados.
				</h2>
				<p class="mt-5 font-body text-base md:text-lg text-[#8A857A] max-w-[58ch] leading-relaxed">
					Una selección de plataformas propias, sistemas para el Estado y desarrollos a medida
					actualmente en producción o en desarrollo activo.
				</p>
			</div>
			<a
				href="{base}/projects"
				class="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#FFB840] hover:text-[#CC8F1A] transition-colors"
			>
				Ver los {totalCount}
				<IconArrowUpRight
					class="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
				/>
			</a>
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each projects as project, idx (project.slug)}
				<a
					href="{base}/projects/{project.slug}"
					class="card-dark group cursor-pointer overflow-hidden reveal reveal-delay-{Math.min((idx % 3) + 1, 3)}"
				>
					<!-- Thumb -->
					<div class="relative h-44 overflow-hidden bg-[#141413]">
						<img
							src={project.thumbnailSrc}
							alt={project.title}
							class="w-full h-full object-cover opacity-50 grayscale contrast-125 group-hover:opacity-80 group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-500"
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent"
						></div>
						<div class="absolute top-3 left-3 flex items-center gap-2">
							<span
								class="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-[#0A0A0A]/80 backdrop-blur border border-[#2A2A28] text-[#E8E3D6]"
							>
								{project.category}
							</span>
						</div>
						<div class="absolute top-3 right-3 font-mono text-[10px] text-[#8A857A] tabular-nums">
							{project.year}
						</div>
					</div>

					<!-- Body -->
					<div class="p-6">
						<h3
							class="font-display font-semibold text-[#E8E3D6] text-xl leading-tight tracking-tight mb-2 group-hover:text-[#FFB840] transition-colors"
						>
							{shortTitle(project.title)}
						</h3>
						<p class="font-body text-sm text-[#8A857A] line-clamp-2 mb-5 leading-relaxed">
							{project.description}
						</p>
						<div class="flex items-end justify-between pt-4 border-t border-[#2A2A28]">
							<div class="flex flex-wrap gap-1.5 max-w-[75%]">
								{#if project.tags}
									{#each project.tags.slice(0, 2) as tag}
										<span class="font-mono text-[10px] text-[#8A857A]/70">#{tag}</span>
									{/each}
								{/if}
							</div>
							<IconArrowUpRight
								class="w-4 h-4 text-[#8A857A] group-hover:text-[#FFB840] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
							/>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

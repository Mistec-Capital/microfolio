<script>
	import { base } from '$app/paths';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';

	let { projects, totalCount } = $props();

	function shortTitle(title) {
		return (title || '').split(' - ')[0].split(' — ')[0];
	}
</script>

<section id="obra" use:scrollReveal class="section-ink relative py-32">
	<div class="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
		<!-- Header -->
		<div class="reveal mb-14 flex flex-wrap items-end justify-between gap-8">
			<div class="max-w-[700px]">
				<span class="chip mb-6">
					<span class="status-dot" aria-hidden="true"></span>
					PROYECTOS
				</span>
				<h2
					class="font-display mt-6 leading-[1.05] font-bold tracking-[-0.04em] text-[#E8E3D6]"
					style="font-size: clamp(2.25rem, 4.5vw, 3.75rem)"
				>
					Nueve proyectos destacados
				</h2>
				<p class="font-body mt-5 max-w-[58ch] text-base leading-relaxed text-[#8A857A] md:text-lg">
					Una selección de plataformas propias, sistemas para el Estado y desarrollos a medida,
					actualmente en producción o en desarrollo activo.
				</p>
			</div>
			<a
				href="{base}/projects"
				class="group inline-flex items-center gap-2 font-mono text-xs tracking-wider text-[#FFB840] uppercase transition-colors hover:text-[#CC8F1A]"
			>
				Ver los {totalCount}
				<IconArrowUpRight
					class="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
				/>
			</a>
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, idx (project.slug)}
				<a
					href="{base}/projects/{project.slug}"
					class="card-dark group reveal cursor-pointer overflow-hidden reveal-delay-{Math.min(
						(idx % 3) + 1,
						3
					)} flex flex-col"
				>
					<div class="flex h-full flex-col p-6">
						<!-- Header: avatar + meta -->
						<div class="mb-6 flex items-center justify-between gap-3">
							<div
								class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-[#2A2A28] bg-[#141413]"
							>
								<img
									src={project.thumbnailSrc}
									alt={project.title}
									class="h-full w-full object-cover"
									loading="lazy"
								/>
							</div>
							<div class="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase">
								<span class="text-[#E8E3D6]">{project.category}</span>
								<span class="text-[#2A2A28]">·</span>
								<span class="text-[#8A857A] tabular-nums">{project.year}</span>
							</div>
						</div>

						<!-- Title + description -->
						<h3
							class="font-display mb-2 text-xl leading-tight font-semibold tracking-tight text-[#E8E3D6] transition-colors group-hover:text-[#FFB840]"
						>
							{shortTitle(project.title)}
						</h3>
						<p class="font-body line-clamp-3 flex-1 text-sm leading-relaxed text-[#8A857A]">
							{project.description}
						</p>

						<!-- Footer: tags + arrow -->
						<div class="mt-5 flex items-end justify-between border-t border-[#2A2A28] pt-5">
							<div class="flex max-w-[75%] flex-wrap gap-1.5">
								{#if project.tags}
									{#each project.tags.slice(0, 2) as tag}
										<span class="font-mono text-[10px] text-[#8A857A]/70">#{tag}</span>
									{/each}
								{/if}
							</div>
							<IconArrowUpRight
								class="h-4 w-4 text-[#8A857A] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FFB840]"
							/>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

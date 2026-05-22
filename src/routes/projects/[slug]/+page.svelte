<script>
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/config.js';
	import AkBtnClose from '$lib/components/AkBtnClose.svelte';
	import AkBtnMetadata from '$lib/components/AkBtnMetadata.svelte';
	import AkOptimizedImage from '$lib/components/AkOptimizedImage.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Kicker from '$lib/components/editorial/Kicker.svelte';
	import Rule from '$lib/components/editorial/Rule.svelte';
	import SerialNumber from '$lib/components/editorial/SerialNumber.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import IconArrowLeft from '~icons/lucide/arrow-left';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';
	import IconDocument from '~icons/lucide/file-text';
	import IconChevronLeft from '~icons/lucide/chevron-left';
	import IconChevronRight from '~icons/lucide/chevron-right';

	let { data } = $props();
	let project = $derived(data.project);

	let thumbnailMetadata = $derived(data.project.thumbnailMetadata);
	let metadataCount = $derived(project.resources?.images?.length || 0);

	let selectedImage = $state(null);
	let showLightbox = $state(false);
	let currentImageIndex = $state(0);
	let showTechnicalInfo = $state(false);

	function categoryLabel(type) {
		switch ((type || '').toLowerCase()) {
			case 'saas':
				return 'SaaS';
			case 'mobile-app':
				return 'App Móvil';
			case 'e-commerce':
				return 'E-commerce';
			case 'gobierno-digital':
				return 'Gobierno Digital';
			case 'logistica':
				return 'Logística';
			case 'recursos-humanos':
				return 'RRHH';
			case 'gestion-administrativa':
				return 'Administrativo';
			case 'gestion-deportiva':
				return 'Gestión Deportiva';
			case 'gis-mapas':
				return 'GIS';
			case 'ia':
				return 'IA';
			case 'iot':
				return 'IoT';
			default:
				return type || 'Proyecto';
		}
	}

	let year = $derived(
		project?.date ? new Date(project.date).getFullYear().toString() : ''
	);

	function openLightbox(image) {
		selectedImage = image;
		showLightbox = true;
		if (project.resources?.images) {
			currentImageIndex = project.resources.images.findIndex((img) => img.path === image.path);
		}
	}

	function closeLightbox() {
		showLightbox = false;
		selectedImage = null;
		currentImageIndex = 0;
		showTechnicalInfo = false;
	}

	function toggleTechnicalInfo() {
		showTechnicalInfo = !showTechnicalInfo;
	}

	function navigateToImage(index) {
		if (project.resources?.images && index >= 0 && index < project.resources.images.length) {
			currentImageIndex = index;
			selectedImage = project.resources.images[index];
		}
	}

	function nextImage() {
		if (project.resources?.images) {
			const nextIndex = (currentImageIndex + 1) % project.resources.images.length;
			navigateToImage(nextIndex);
		}
	}

	function previousImage() {
		if (project.resources?.images) {
			const prevIndex =
				currentImageIndex === 0 ? project.resources.images.length - 1 : currentImageIndex - 1;
			navigateToImage(prevIndex);
		}
	}

	function handleKeydown(event) {
		if (!showLightbox) return;
		if (event.key === 'Escape') closeLightbox();
		else if (event.key === 'ArrowRight') {
			event.preventDefault();
			nextImage();
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			previousImage();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<SeoHead
	title={project.title}
	description={project.description}
	image="/content/projects/{project.slug}/thumbnail.jpg"
	type="article"
/>

<!-- Back link -->
<a
	href="{base}/projects"
	class="inline-flex items-center gap-2 kicker hover:!text-[#FFB840] transition-colors mb-8"
>
	<IconArrowLeft class="w-3 h-3" />
	VOLVER
</a>

<!-- Editorial hero with duotone image -->
<div class="relative h-[420px] md:h-[520px] overflow-hidden bg-[#141413] mb-20">
	<img
		src="{base}/content/projects/{project.slug}/thumbnail.jpg"
		alt={project.title}
		class="w-full h-full object-cover opacity-60 grayscale contrast-125"
	/>
	<div
		class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/10"
	></div>

	<div class="absolute bottom-0 left-0 right-0 pb-10 px-6 md:px-10 lg:px-14">
		<div class="flex items-baseline gap-4 mb-5 flex-wrap">
			<Kicker tone="amber">{categoryLabel(project.type)}</Kicker>
			{#if project.featured}
				<Kicker tone="amber">★ DESTACADO</Kicker>
			{/if}
			<Kicker class="ml-auto">{year}</Kicker>
		</div>
		<Rule />
		<h1
			class="font-display font-extrabold text-[#E8E3D6] leading-[1.02] tracking-tight mt-6"
			style="font-size: clamp(2.5rem, 5.5vw, 5rem)"
		>
			{project.title}
		</h1>
	</div>
</div>

<div use:scrollReveal class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
	<!-- Main column -->
	<div class="lg:col-span-8 space-y-20">
		<!-- Overview -->
		<section>
			<div
				class="flex items-baseline gap-5 pb-3 mb-8 border-b border-[#2A2A28] reveal flex-wrap"
			>
				<SerialNumber n={1} size="sm" />
				<Kicker>/ DESCRIPCIÓN</Kicker>
			</div>
			<p
				class="font-body text-[#E8E3D6]/85 text-lg leading-[1.75] reveal reveal-delay-1"
			>
				{project.description}
			</p>
		</section>

		<!-- Markdown content (features, technical details, etc.) -->
		{#if project.content}
			<section>
				<div
					class="flex items-baseline gap-5 pb-3 mb-8 border-b border-[#2A2A28] reveal flex-wrap"
				>
					<SerialNumber n={2} size="sm" />
					<Kicker>/ DETALLES</Kicker>
				</div>
				<article
					class="prose prose-invert max-w-none reveal reveal-delay-1
						prose-headings:font-display prose-headings:tracking-tight prose-headings:text-[#E8E3D6]
						prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
						prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#FFB840]
						prose-p:text-[#E8E3D6]/85 prose-p:leading-relaxed
						prose-li:text-[#E8E3D6]/85
						prose-strong:text-[#E8E3D6]
						prose-a:text-[#FFB840] hover:prose-a:text-[#CC8F1A]"
				>
					{@html project.content}
				</article>
			</section>
		{/if}

		<!-- Image gallery -->
		{#if project.resources?.images && project.resources.images.length > 0}
			<section>
				<div
					class="flex items-baseline gap-5 pb-3 mb-8 border-b border-[#2A2A28] reveal flex-wrap"
				>
					<SerialNumber n={3} size="sm" />
					<Kicker>/ GALERÍA</Kicker>
					<Kicker class="ml-auto">
						{String(project.resources.images.length).padStart(2, '0')} IMÁGENES
					</Kicker>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each project.resources.images as image}
						<div class="group reveal">
							<button
								type="button"
								onclick={() => openLightbox(image)}
								class="block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-[#141413] border border-[#2A2A28]"
							>
								<AkOptimizedImage
									src={image.path}
									alt={image.name}
									class="h-full w-full object-cover opacity-70 grayscale contrast-125 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
									hasWebP={image.hasWebP || false}
								/>
							</button>
							<div class="font-mono text-xs text-[#8A857A] mt-2 leading-snug">
								{#if image.metadata?.headline}
									<p class="text-[#E8E3D6]">{image.metadata.headline}</p>
								{:else}
									<p class="text-[#E8E3D6]">{image.name}</p>
								{/if}
								{#if image.metadata?.description}
									<p class="italic">{image.metadata.description}</p>
								{/if}
								{#if image.metadata?.creditLine}
									<p class="mt-1">Crédito: {image.metadata.creditLine}</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Videos -->
		{#if project.resources?.videos && project.resources.videos.length > 0}
			<section>
				<div
					class="flex items-baseline gap-5 pb-3 mb-8 border-b border-[#2A2A28] reveal flex-wrap"
				>
					<SerialNumber n={4} size="sm" />
					<Kicker>/ VIDEOS</Kicker>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each project.resources.videos as video}
						<div class="border border-[#2A2A28] overflow-hidden">
							<video controls class="w-full" preload="metadata">
								<source src={video.path} type="video/mp4" />
								<track kind="captions" />
								Tu navegador no soporta la reproducción de videos.
							</video>
							<p class="font-mono text-xs text-[#E8E3D6] mt-2 px-3 py-2">{video.name}</p>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Documents -->
		{#if project.resources?.documents && project.resources.documents.length > 0}
			<section>
				<div
					class="flex items-baseline gap-5 pb-3 mb-8 border-b border-[#2A2A28] reveal flex-wrap"
				>
					<SerialNumber n={5} size="sm" />
					<Kicker>/ DOCUMENTOS</Kicker>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					{#each project.resources.documents as document}
						<a
							href={document.path}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 p-4 border border-[#2A2A28] hover:border-[#FFB840] hover:bg-[#141413] transition-colors"
						>
							<IconDocument class="text-[#FFB840] shrink-0 h-5 w-5" />
							<div class="flex-1 min-w-0">
								<p class="font-mono text-sm text-[#E8E3D6] truncate">{document.name}</p>
								<p class="font-mono text-[10px] text-[#8A857A]">Click para descargar</p>
							</div>
							<IconArrowUpRight class="w-4 h-4 text-[#8A857A]" />
						</a>
					{/each}
				</div>
			</section>
		{/if}
	</div>

	<!-- Sidebar -->
	<aside class="lg:col-span-4">
		<div class="lg:sticky lg:top-24 space-y-8">
			<!-- Ficha -->
			<div class="border border-[#2A2A28] p-6 space-y-6 reveal reveal-right">
				<Kicker tone="amber" as="div">FICHA</Kicker>

				<dl class="space-y-4">
					<div class="pb-3 border-b border-[#2A2A28]/60">
						<dt><Kicker>Categoría</Kicker></dt>
						<dd class="font-mono text-sm text-[#E8E3D6] mt-1 leading-snug">
							{categoryLabel(project.type)}
						</dd>
					</div>
					{#if project.location}
						<div class="pb-3 border-b border-[#2A2A28]/60">
							<dt><Kicker>Ubicación</Kicker></dt>
							<dd class="font-mono text-sm text-[#E8E3D6] mt-1 leading-snug">
								{project.location}
							</dd>
						</div>
					{/if}
					{#if year}
						<div class="pb-3 border-b border-[#2A2A28]/60">
							<dt><Kicker>Año</Kicker></dt>
							<dd class="font-mono text-sm text-[#E8E3D6] mt-1 leading-snug tabular-nums">
								{year}
							</dd>
						</div>
					{/if}
					{#if project.status}
						<div class="pb-3 border-b border-[#2A2A28]/60 last:border-0">
							<dt><Kicker>Estado</Kicker></dt>
							<dd class="font-mono text-sm text-[#E8E3D6] mt-1 leading-snug capitalize">
								{project.status}
							</dd>
						</div>
					{/if}
				</dl>
			</div>

			<!-- Equipo -->
			{#if project.authors && project.authors.length > 0}
				<div class="border border-[#2A2A28] p-6 space-y-4 reveal reveal-right reveal-delay-1">
					<Kicker as="div">EQUIPO</Kicker>
					<ul class="space-y-3">
						{#each project.authors as author}
							<li class="font-mono text-sm leading-snug">
								<div class="text-[#E8E3D6]">{author.name}</div>
								<div class="text-[#8A857A] text-xs">› {author.role}</div>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Tags -->
			{#if project.tags && project.tags.length > 0}
				<div class="border border-[#2A2A28] p-6 reveal reveal-right reveal-delay-2">
					<Kicker class="block mb-4">Tags</Kicker>
					<div class="flex flex-wrap gap-2">
						{#each project.tags as tag}
							<span class="tag-pill">{tag}</span>
						{/each}
					</div>
				</div>
			{/if}

			<a
				href="{base}/projects"
				class="block text-center w-full border border-[#E8E3D6]/60 text-[#E8E3D6] hover:border-[#FFB840] hover:text-[#FFB840] transition-colors h-12 leading-[3rem] font-body font-medium text-sm rounded-sm"
			>
				Ver todos los proyectos →
			</a>
		</div>
	</aside>
</div>

<!-- Lightbox -->
{#if showLightbox && selectedImage}
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Image lightbox"
		tabindex="-1"
		class="bg-[#0A0A0A]/95 fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm"
		onclick={closeLightbox}
		onkeydown={handleKeydown}
	>
		<div class="relative flex h-full w-full items-center justify-center">
			{#if project.resources?.images && project.resources.images.length > 1}
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						previousImage();
					}}
					class="absolute top-0 left-0 z-20 h-full w-1/4 cursor-pointer"
					aria-label="Previous image"
				></button>
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						nextImage();
					}}
					class="absolute top-0 right-0 z-20 h-full w-1/4 cursor-pointer"
					aria-label="Next image"
				></button>
			{/if}

			{#if selectedImage.metadata && (selectedImage.metadata.camera || selectedImage.metadata.lens || selectedImage.metadata.focalLength || selectedImage.metadata.aperture || selectedImage.metadata.shutterSpeed || selectedImage.metadata.iso || selectedImage.metadata.dateTime || selectedImage.metadata.city || selectedImage.metadata.state || selectedImage.metadata.country || selectedImage.metadata.location || selectedImage.metadata.gps || (selectedImage.metadata.keywords && selectedImage.metadata.keywords.length > 0))}
				<AkBtnMetadata
					class="absolute top-4 right-16 z-30"
					onclick={(e) => {
						e.stopPropagation();
						toggleTechnicalInfo();
					}}
				/>
			{/if}

			<AkBtnClose
				class="absolute top-4 right-4"
				onclick={(e) => {
					e.stopPropagation();
					closeLightbox();
				}}
			/>

			{#if project.resources?.images && project.resources.images.length > 1}
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						previousImage();
					}}
					class="absolute top-1/2 left-4 z-30 -translate-y-1/2 cursor-pointer border border-[#2A2A28] bg-[#0A0A0A]/80 text-[#E8E3D6] hover:border-[#FFB840] hover:text-[#FFB840] rounded-full p-3 transition-colors"
					aria-label="Previous image"
				>
					<IconChevronLeft class="size-5" />
				</button>
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						nextImage();
					}}
					class="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer border border-[#2A2A28] bg-[#0A0A0A]/80 text-[#E8E3D6] hover:border-[#FFB840] hover:text-[#FFB840] rounded-full p-3 transition-colors"
					aria-label="Next image"
				>
					<IconChevronRight class="size-5" />
				</button>
			{/if}

			<div class="pointer-events-none flex h-full w-full items-center justify-center">
				<div class="flex max-h-[90vh] max-w-[95vw] flex-col items-center gap-6 lg:flex-row">
					<div class="flex flex-col items-center gap-4">
						<div class="relative">
							<img
								src={selectedImage.path}
								alt={selectedImage.name}
								class="max-h-[60vh] max-w-[90vw] object-contain shadow-2xl lg:max-w-[60vw]"
								fetchpriority="high"
							/>
						</div>

						<div class="font-mono pointer-events-auto max-w-[90vw] text-center lg:max-w-[60vw] text-[#E8E3D6]">
							{#if selectedImage.metadata?.headline}
								<p class="text-base">{selectedImage.metadata.headline}</p>
							{:else}
								<p class="text-base">{selectedImage.name}</p>
							{/if}
							{#if selectedImage.metadata?.description}
								<p class="mt-1 text-xs italic text-[#8A857A]">
									{selectedImage.metadata.description}
								</p>
							{/if}
							{#if selectedImage.metadata?.creditLine}
								<p class="mt-1 text-xs text-[#8A857A]">
									Crédito: {selectedImage.metadata.creditLine}
								</p>
							{/if}
						</div>

						{#if project.resources?.images && project.resources.images.length > 1}
							<div
								class="font-mono border border-[#2A2A28] bg-[#0A0A0A]/80 text-[#E8E3D6] rounded-full px-3 py-1 text-xs tabular-nums"
							>
								{currentImageIndex + 1} / {project.resources.images.length}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

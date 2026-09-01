<script>
	import { base } from '$app/paths';
	import AkBtnClose from '$lib/components/AkBtnClose.svelte';
	import AkOptimizedImage from '$lib/components/AkOptimizedImage.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import { categoryLabel, isInDevelopment, yearOf } from '$lib/utils/categories.js';

	let { data } = $props();
	let project = $derived(data.project);
	let images = $derived(project.resources?.images ?? []);

	let selectedImage = $state(null);
	let currentImageIndex = $state(0);

	function openLightbox(image) {
		currentImageIndex = images.findIndex((img) => img.path === image.path);
		selectedImage = image;
	}

	function closeLightbox() {
		selectedImage = null;
		currentImageIndex = 0;
	}

	function navigateToImage(index) {
		if (index >= 0 && index < images.length) {
			currentImageIndex = index;
			selectedImage = images[index];
		}
	}

	function nextImage() {
		navigateToImage((currentImageIndex + 1) % images.length);
	}

	function previousImage() {
		navigateToImage(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
	}

	function handleKeydown(event) {
		if (!selectedImage) return;
		if (event.key === 'Escape') closeLightbox();
		else if (event.key === 'ArrowRight') {
			event.preventDefault();
			nextImage();
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			previousImage();
		}
	}

	// Los botones del lightbox no deben cerrar el diálogo al hacer click.
	function stop(fn) {
		return (event) => {
			event.stopPropagation();
			fn();
		};
	}

	function caption(image) {
		const head = image.metadata?.headline ?? image.name;
		return image.metadata?.description ? `${head} — ${image.metadata.description}` : head;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<SeoHead
	title={project.title}
	description={project.description}
	image="/content/projects/{project.slug}/thumbnail.jpg"
	type="article"
/>

<a href="{base}/projects" class="link t-nota gap-s1 inline-flex items-center">
	<Icon name="chevron-left" size={16} /> Proyectos
</a>

<header class="grid-12 mt-s3">
	<p class="t-kicker gap-s1 col-span-12 flex flex-wrap items-center">
		<span>{categoryLabel(project.type)} · <span class="tnum">{yearOf(project.date)}</span></span>
		{#if isInDevelopment(project.status)}
			<span>·</span>
			<span class="status-dot" aria-hidden="true"></span>
			<span>En desarrollo</span>
		{/if}
	</p>
	<h1 class="t-titulo mt-s2 col-span-12 lg:col-span-9">{project.title}</h1>
	<p class="t-bajada mt-s2 col-span-12">{project.description}</p>
</header>

<div class="my-s4 border-rule bg-ink-2 aspect-video overflow-hidden border">
	<img
		src="{base}/content/projects/{project.slug}/thumbnail.jpg"
		alt=""
		class="h-full w-full object-cover"
	/>
</div>

<div use:scrollReveal class="grid-12">
	<div class="gap-s4 col-span-12 flex flex-col lg:col-span-8">
		{#if project.content}
			<section class="reveal">
				<p class="t-kicker">Detalles</p>
				<hr class="rule mt-s2" />
				<article class="prose-brand mt-s3">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -- Markdown propio, renderizado en build -->
					{@html project.content}
				</article>
			</section>
		{/if}

		{#if images.length > 0}
			<section class="reveal">
				<div class="flex items-baseline justify-between">
					<p class="t-kicker">Galería</p>
					<p class="t-nota tnum">{images.length} {images.length === 1 ? 'imagen' : 'imágenes'}</p>
				</div>
				<hr class="rule mt-s2" />
				<ul class="mt-s3 gap-s2 grid grid-cols-1 md:grid-cols-2">
					{#each images as image (image.path)}
						<li>
							<button
								type="button"
								onclick={() => openLightbox(image)}
								class="border-rule bg-ink-2 block aspect-[4/3] w-full cursor-pointer overflow-hidden border"
								aria-label="Ampliar {image.metadata?.headline ?? image.name}"
							>
								<AkOptimizedImage
									src={image.path}
									alt=""
									class="h-full w-full object-cover"
									hasWebP={image.hasWebP || false}
								/>
							</button>
							<p class="t-nota mt-s1">{caption(image)}</p>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if project.resources?.videos?.length}
			<section class="reveal">
				<p class="t-kicker">Videos</p>
				<hr class="rule mt-s2" />
				<ul class="mt-s3 gap-s2 grid grid-cols-1 md:grid-cols-2">
					{#each project.resources.videos as video (video.path)}
						<li class="border-rule border">
							<video controls class="w-full" preload="metadata">
								<source src={video.path} type="video/mp4" />
								<track kind="captions" />
								Tu navegador no reproduce este video.
							</video>
							<p class="t-nota px-s2 py-s1">{video.name}</p>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if project.resources?.documents?.length}
			<section class="reveal">
				<p class="t-kicker">Documentos</p>
				<hr class="rule mt-s2" />
				<ul class="list-rule mt-s2">
					{#each project.resources.documents as document (document.path)}
						<li>
							<a
								href={document.path}
								target="_blank"
								rel="noopener noreferrer"
								class="link gap-s2 flex items-center justify-between"
							>
								<span class="t-cuerpo text-bone">{document.name}</span>
								<Icon name="arrow-up-right" size={16} />
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>

	<aside class="col-span-12 lg:col-span-3 lg:col-start-10">
		<div class="gap-s2 flex flex-col lg:sticky lg:top-24">
			<div class="card p-s3">
				<p class="t-kicker">Ficha</p>
				<dl class="mt-s2">
					<div class="border-rule py-s2 border-t">
						<dt class="t-nota">Categoría</dt>
						<dd class="t-cuerpo mt-s1">{categoryLabel(project.type)}</dd>
					</div>
					{#if project.location}
						<div class="border-rule py-s2 border-t">
							<dt class="t-nota">Ubicación</dt>
							<dd class="t-cuerpo mt-s1">{project.location}</dd>
						</div>
					{/if}
					{#if project.date}
						<div class="border-rule py-s2 border-t">
							<dt class="t-nota">Año</dt>
							<dd class="t-cuerpo tnum mt-s1">{yearOf(project.date)}</dd>
						</div>
					{/if}
					{#if project.status}
						<div class="border-rule py-s2 border-t">
							<dt class="t-nota">Estado</dt>
							<dd class="t-cuerpo mt-s1 capitalize">{project.status}</dd>
						</div>
					{/if}
				</dl>
			</div>

			{#if project.authors?.length}
				<div class="card p-s3">
					<p class="t-kicker">Equipo</p>
					<ul class="mt-s2 gap-s2 flex flex-col">
						{#each project.authors as author (author.name + author.role)}
							<li>
								<p class="t-cuerpo">{author.name}</p>
								<p class="t-nota">{author.role}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if project.tags?.length}
				<div class="card p-s3">
					<p class="t-kicker">Tags</p>
					<ul class="mt-s2 gap-s1 flex flex-wrap">
						{#each project.tags as tag (tag)}
							<li class="tag">{tag}</li>
						{/each}
					</ul>
				</div>
			{/if}

			<a href="{base}/projects" class="btn justify-center">Ver todos los proyectos</a>
		</div>
	</aside>
</div>

{#if selectedImage}
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Imagen ampliada"
		tabindex="-1"
		class="gap-s2 bg-ink/95 p-s2 fixed inset-0 z-[60] flex flex-col items-center justify-center"
		onclick={closeLightbox}
		onkeydown={handleKeydown}
	>
		<AkBtnClose class="top-s2 right-s2 absolute" onclick={stop(closeLightbox)} />

		{#if images.length > 1}
			<button
				type="button"
				class="btn btn-square left-s2 bg-ink absolute top-1/2 -translate-y-1/2"
				onclick={stop(previousImage)}
				aria-label="Imagen anterior"
			>
				<Icon name="chevron-left" size={20} />
			</button>
			<button
				type="button"
				class="btn btn-square right-s2 bg-ink absolute top-1/2 -translate-y-1/2"
				onclick={stop(nextImage)}
				aria-label="Imagen siguiente"
			>
				<Icon name="chevron-right" size={20} />
			</button>
		{/if}

		<img
			src={selectedImage.path}
			alt={selectedImage.metadata?.headline ?? selectedImage.name}
			class="max-h-[75vh] max-w-[90vw] object-contain"
		/>
		<p class="t-nota text-bone max-w-[60ch]">{caption(selectedImage)}</p>
		{#if images.length > 1}
			<p class="t-nota tnum">{currentImageIndex + 1} / {images.length}</p>
		{/if}
	</div>
{/if}

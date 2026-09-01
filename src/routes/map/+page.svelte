<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import AkProjectCard from '$lib/components/AkProjectCard.svelte';
	import AkFilters from '$lib/components/AkFilters.svelte';
	import AkBtnClose from '$lib/components/AkBtnClose.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';

	let { data } = $props();
	let projects = $derived(data.projects);

	let selectedType = $state('todos');
	let searchTerm = $state('');
	let filteredProjects = $state([]);

	let mapContainer;
	let map;
	let selectedProject = $state(null);
	let markers = [];
	let windowHeight = $state(0);
	let mapHeight = $state('600px');

	$effect(() => {
		if (windowHeight > 0) {
			const height = Math.max(600, Math.min(800, windowHeight * 0.7));
			const newMapHeight = `${height}px`;
			if (newMapHeight !== mapHeight) {
				mapHeight = newMapHeight;
				if (map) {
					const currentBounds = map.getBounds();
					requestAnimationFrame(() => {
						requestAnimationFrame(() => {
							map.invalidateSize(true);
							if (currentBounds) map.fitBounds(currentBounds);
						});
					});
				}
			}
		}
	});

	onMount(async () => {
		windowHeight = window.innerHeight;

		let resizeTimeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				const newHeight = window.innerHeight;
				if (newHeight !== windowHeight) windowHeight = newHeight;
			}, 100);
		};
		window.addEventListener('resize', handleResize);

		const L = await import('leaflet');

		delete L.Icon.Default.prototype._getIconUrl;
		L.Icon.Default.mergeOptions({
			iconRetinaUrl: `${base}/marker-icon@2x.png`,
			iconUrl: `${base}/marker-icon.png`,
			shadowUrl: `${base}/marker-shadow.png`
		});

		map = L.map(mapContainer, {
			center: [-27.3671, -55.8961],
			zoom: 5,
			zoomControl: true,
			scrollWheelZoom: false,
			doubleClickZoom: true,
			touchZoom: true,
			dragging: true,
			attributionControl: true
		});

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap',
			className: 'map-tiles-dark'
		}).addTo(map);

		setTimeout(() => {
			updateMarkers();
		}, 100);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (map) map.remove();
		};
	});

	$effect(() => {
		void filteredProjects; // registra la dependencia
		if (map) updateMarkers();
	});

	async function updateMarkers() {
		if (!map) return;

		const L = await import('leaflet');

		markers.forEach((marker) => map.removeLayer(marker));
		markers = [];

		filteredProjects.forEach((project) => {
			if (
				project.coordinates &&
				Array.isArray(project.coordinates) &&
				project.coordinates.length === 2
			) {
				const [lat, lng] = project.coordinates;

				try {
					const iconOptions = project.featured
						? {
								iconUrl: `${base}/marker-featured.png`,
								iconRetinaUrl: `${base}/marker-featured@2x.png`,
								shadowUrl: `${base}/marker-shadow.png`,
								iconSize: [25, 41],
								iconAnchor: [12, 41],
								popupAnchor: [1, -34],
								shadowSize: [41, 41]
							}
						: undefined;

					const marker = iconOptions
						? L.marker([lat, lng], { title: project.title, icon: L.icon(iconOptions) }).addTo(map)
						: L.marker([lat, lng], { title: project.title }).addTo(map);

					marker.on('click', () => {
						selectedProject = project;
					});

					marker.bindTooltip(project.title, { permanent: false, direction: 'top' });

					markers.push(marker);
				} catch (error) {
					console.error('Error creating marker:', error);
				}
			}
		});

		if (markers.length > 0) {
			const group = L.featureGroup(markers);
			map.fitBounds(group.getBounds().pad(0.15));
		} else {
			map.setView([-27.3671, -55.8961], 5);
		}
	}

	function closeProjectCard() {
		selectedProject = null;
	}
</script>

<SeoHead
	title="Mapa de proyectos"
	description="Mapa georreferenciado de los {projects.length} proyectos de MisTec."
/>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<div use:scrollReveal>
	<header class="grid-12">
		<p class="t-kicker reveal col-span-12">Mapa</p>
		<h1 class="t-titulo reveal reveal-1 mt-s2 col-span-12 lg:col-span-8">
			Proyectos en el <span class="accent">territorio</span>.
		</h1>
		<p class="t-bajada reveal reveal-2 mt-s2 col-span-12">
			Cada marcador es un proyecto. Filtrá por categoría o búsqueda.
		</p>
	</header>

	<div class="mt-s4">
		<AkFilters {projects} bind:searchTerm bind:selectedType bind:filteredProjects />
	</div>

	<div class="reveal mt-s3 border-rule bg-ink-2 relative overflow-hidden border">
		<div
			bind:this={mapContainer}
			class="w-full"
			style="height: {mapHeight}; max-height: 80vh;"
		></div>

		<p class="t-nota tnum right-s2 bottom-s2 pointer-events-none absolute z-[400]">
			{filteredProjects.length} de {projects.length}
		</p>

		{#if selectedProject}
			<div class="bg-ink p-s2 absolute inset-0 z-[1000] flex items-center justify-center">
				<div class="relative w-full max-w-sm">
					<AkBtnClose class="-top-s2 -right-s2 absolute z-10" onclick={closeProjectCard} />
					<AkProjectCard project={selectedProject} />
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Cara ink aplicada a los tiles: no es decoración, es el sistema cromático. */
	:global(.map-tiles-dark) {
		filter: invert(1) hue-rotate(180deg) brightness(0.85) contrast(0.95) grayscale(0.4);
	}
	:global(.leaflet-container) {
		background: #141413;
		font-family: inherit;
	}
	:global(.leaflet-bar) {
		border: 1px solid #2a2a28 !important;
		border-radius: 2px !important;
		box-shadow: none !important;
	}
	:global(.leaflet-control-zoom a) {
		background-color: #0a0a0a !important;
		color: #e8e3d6 !important;
		border-color: #2a2a28 !important;
	}
	:global(.leaflet-control-zoom a:hover) {
		background-color: #141413 !important;
	}
	:global(.leaflet-control-attribution) {
		background: #0a0a0a !important;
		color: #8a857a !important;
		font-family: inherit;
		font-size: 11px !important;
	}
	:global(.leaflet-control-attribution a) {
		color: #e8e3d6 !important;
	}
	:global(.leaflet-tooltip) {
		background: #0a0a0a !important;
		color: #e8e3d6 !important;
		border: 1px solid #2a2a28 !important;
		border-radius: 2px !important;
		font-family: inherit;
		font-size: 13px !important;
		box-shadow: none !important;
	}
	:global(.leaflet-tooltip-top:before) {
		border-top-color: #2a2a28 !important;
	}
</style>

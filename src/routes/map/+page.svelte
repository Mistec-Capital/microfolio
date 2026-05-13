<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import AkProjectCard from '$lib/components/AkProjectCard.svelte';
	import AkFilters from '$lib/components/AkFilters.svelte';
	import AkBtnClose from '$lib/components/AkBtnClose.svelte';
	import Kicker from '$lib/components/editorial/Kicker.svelte';
	import SerialNumber from '$lib/components/editorial/SerialNumber.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import { siteConfig } from '$lib/config.js';

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
		const _ = filteredProjects;
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

					marker.bindTooltip(project.title, {
						permanent: false,
						direction: 'top'
					});

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

<svelte:head>
	<title>{siteConfig.title} • Mapa de Proyectos</title>
	<meta name="description" content="Mapa interactivo geolocalizado de los proyectos de Mistec Capital." />
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<div use:scrollReveal>
	<!-- Section label -->
	<div
		class="flex items-baseline gap-6 pb-4 mb-16 border-b border-[#2A2A28] reveal flex-wrap"
	>
		<SerialNumber n={4} />
		<Kicker>/ MAPA GEORREFERENCIADO</Kicker>
		<Kicker class="ml-auto">{String(projects.length).padStart(3, '0')} UBICACIONES</Kicker>
	</div>

	<!-- Title -->
	<div class="grid grid-cols-12 gap-8 mb-16">
		<h1
			class="col-span-12 lg:col-span-8 text-headline font-display text-[#E8E3D6] reveal reveal-delay-1"
		>
			La obra, sobre el territorio.
		</h1>
		<p
			class="col-span-12 lg:col-span-4 text-body text-[#8A857A] pt-3 reveal reveal-delay-2"
		>
			Cada marcador es un proyecto en producción o desarrollo. Filtrá por categoría o búsqueda
			para reducir el alcance.
		</p>
	</div>

	<!-- Filters -->
	<AkFilters {projects} bind:searchTerm bind:selectedType bind:filteredProjects />

	<!-- Map Container (editorial frame) -->
	<div
		class="relative overflow-hidden border border-[#2A2A28] reveal reveal-delay-1 bg-[#141413]"
	>
		<div
			bind:this={mapContainer}
			class="w-full"
			style="height: {mapHeight}; max-height: 80vh;"
		></div>

		<!-- Corner ticks -->
		<div
			class="absolute top-2 left-2 font-mono text-[10px] uppercase tracking-wider text-[#FFB840]/70 pointer-events-none z-[400]"
		>
			<span class="status-dot-live mr-2"></span>LIVE / GEO STREAM
		</div>
		<div
			class="absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-wider text-[#8A857A]/70 pointer-events-none z-[400]"
		>
			{filteredProjects.length} de {projects.length}
		</div>

		<!-- Project card overlay -->
		{#if selectedProject}
			<div
				class="absolute inset-0 z-[1000] flex items-center justify-center bg-[#0A0A0A]/85 backdrop-blur-sm"
			>
				<div class="relative max-w-sm w-full mx-6">
					<button
						type="button"
						class="absolute -top-3 -right-3 z-10 border border-[#2A2A28] bg-[#0A0A0A] text-[#E8E3D6] hover:border-[#FFB840] hover:text-[#FFB840] rounded-full p-2 transition-colors cursor-pointer"
						aria-label="Cerrar"
						onclick={closeProjectCard}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M18 6 6 18M6 6l12 12" />
						</svg>
					</button>
					<div class="border border-[#2A2A28] bg-[#0A0A0A]">
						<AkProjectCard project={selectedProject} />
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Dark editorial map tiles (invert + slight desat) */
	:global(.map-tiles-dark) {
		filter: invert(1) hue-rotate(180deg) brightness(0.85) contrast(0.95) grayscale(0.4);
	}

	/* Editorial leaflet controls */
	:global(.leaflet-container) {
		background: #141413;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
	}
	:global(.leaflet-control-zoom a) {
		background-color: #0a0a0a !important;
		color: #e8e3d6 !important;
		border-color: #2a2a28 !important;
	}
	:global(.leaflet-control-zoom a:hover) {
		background-color: #141413 !important;
		color: #ffb840 !important;
	}
	:global(.leaflet-control-attribution) {
		background: rgba(10, 10, 10, 0.7) !important;
		color: #8a857a !important;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 10px !important;
	}
	:global(.leaflet-control-attribution a) {
		color: #ffb840 !important;
	}
	:global(.leaflet-tooltip) {
		background: #0a0a0a !important;
		color: #e8e3d6 !important;
		border: 1px solid #2a2a28 !important;
		border-radius: 2px !important;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 11px !important;
		box-shadow: none !important;
	}
	:global(.leaflet-tooltip-top:before) {
		border-top-color: #2a2a28 !important;
	}
</style>

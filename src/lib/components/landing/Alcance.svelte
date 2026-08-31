<script>
	import SectionHead from './SectionHead.svelte';

	let { stats } = $props();

	const anios = new Date().getFullYear() - 2020;

	let cifras = $derived([
		{ valor: stats.total, label: 'proyectos desarrollados' },
		{ valor: stats.countries, label: 'países' },
		{ valor: stats.government, label: 'organismos públicos' },
		{ valor: anios, label: 'años de trayectoria' }
	]);

	// Bordes de la fila 2×2 (mobile) / 1×4 (desktop), por índice.
	const CELDA = [
		'',
		'border-l border-rule pl-s2',
		'border-t border-rule lg:border-t-0 lg:border-l lg:pl-s2',
		'border-l border-t border-rule pl-s2 lg:border-t-0'
	];

	const SECTORES =
		'Administración Pública · Empresas Privadas · Industria · Comercio · Salud · Educación · Servicios · Organizaciones Sociales';
</script>

<SectionHead id="alcance" n="05" label="Alcance">
	{#snippet title()}
		Experiencia <span class="accent">consolidada</span> en organizaciones de distintas características.
	{/snippet}

	<ul class="border-rule grid grid-cols-2 border-y lg:grid-cols-4">
		{#each cifras as c, i (c.label)}
			<li class="reveal py-s3 pr-s2 {CELDA[i]}">
				<span class="t-cifra block">{c.valor}</span>
				<span class="t-nota mt-s2 block">{c.label}</span>
			</li>
		{/each}
	</ul>

	<p class="t-nota reveal mt-s3">Sectores — {SECTORES}</p>
</SectionHead>

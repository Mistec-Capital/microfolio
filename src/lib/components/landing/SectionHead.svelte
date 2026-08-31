<script>
	/**
	 * Cabecera numerada de sección (Sistema Editorial: numeración continua y
	 * visible). `title` y `lead` son snippets para poder marcar una palabra
	 * con <span class="accent">.
	 */
	let { id, n, label, title, lead, children } = $props();
</script>

<section {id} class="section">
	<div class="container-brand">
		<p class="t-kicker reveal"><span class="tnum">{n}</span> · {label}</p>
		{#if title}
			<h2 class="t-titulo reveal reveal-1 mt-s2 max-w-[22ch]">{@render title()}</h2>
		{/if}
		{#if lead}
			<p class="t-bajada reveal reveal-2 mt-s2">{@render lead()}</p>
		{/if}
		<div class="mt-s4">
			{@render children?.()}
		</div>
	</div>
</section>

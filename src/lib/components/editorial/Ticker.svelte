<script>
	let {
		target,
		prefix = '',
		suffix = '',
		pad = 0,
		duration,
		class: className = ''
	} = $props();

	let value = $state(0);
	let el;

	function easeOutCubic(t) {
		return 1 - Math.pow(1 - t, 3);
	}

	$effect(() => {
		if (typeof window === 'undefined' || !el) return;

		const computedDuration = duration ?? Math.max(800, Math.min(target * 18, 2400));
		const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

		let raf;
		let hasRun = false;

		const run = () => {
			if (hasRun) return;
			hasRun = true;
			if (prefersReducedMotion) {
				value = target;
				return;
			}
			const start = performance.now();
			const step = (now) => {
				const elapsed = now - start;
				const progress = Math.min(elapsed / computedDuration, 1);
				const eased = easeOutCubic(progress);
				value = Math.round(target * eased);
				if (progress < 1) raf = requestAnimationFrame(step);
			};
			raf = requestAnimationFrame(step);
		};

		const rect = el.getBoundingClientRect();
		if (rect.top < window.innerHeight && rect.bottom > 0) {
			run();
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						run();
						observer.unobserve(el);
					}
				});
			},
			{ threshold: 0.15, rootMargin: '0px 0px 10% 0px' }
		);
		observer.observe(el);

		const safety = window.setTimeout(run, 4000);

		return () => {
			observer.disconnect();
			window.clearTimeout(safety);
			if (raf) cancelAnimationFrame(raf);
		};
	});

	let displayed = $derived(pad > 0 ? String(value).padStart(pad, '0') : String(value));
</script>

<span
	bind:this={el}
	class="font-mono tabular-nums {className}"
	style="font-feature-settings: 'tnum' 1"
>
	{prefix}{displayed}{suffix}
</span>

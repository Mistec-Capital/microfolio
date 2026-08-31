/**
 * Acción Svelte: cuando un descendiente `.reveal` entra en el viewport
 * recibe `.visible` y dispara el revelado (opacidad + clip sobre su eje).
 * Respeta prefers-reduced-motion y tiene un fallback de 3 s.
 */
export function scrollReveal(node) {
	if (typeof window === 'undefined') return;

	const targets = node.querySelectorAll('.reveal');
	const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	if (reduce || !('IntersectionObserver' in window)) {
		targets.forEach((t) => t.classList.add('visible'));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.05, rootMargin: '0px 0px 10% 0px' }
	);

	targets.forEach((target) => {
		const rect = target.getBoundingClientRect();
		if (rect.top < window.innerHeight && rect.bottom > 0) {
			target.classList.add('visible');
		} else {
			observer.observe(target);
		}
	});

	const safety = window.setTimeout(() => {
		targets.forEach((t) => t.classList.add('visible'));
	}, 3000);

	return {
		destroy() {
			observer.disconnect();
			window.clearTimeout(safety);
		}
	};
}

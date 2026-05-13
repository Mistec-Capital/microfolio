/**
 * Svelte action: when this node enters the viewport, mark its
 * descendant .reveal / .reveal-scale / .reveal-left / .reveal-right
 * elements with `.visible` to trigger the CSS reveal transition.
 *
 * Honors prefers-reduced-motion and has a 3s safety fallback.
 */
export function scrollReveal(node) {
	if (typeof window === 'undefined') return;

	const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
	const targets = node.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');

	if (prefersReducedMotion || !('IntersectionObserver' in window)) {
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
		targets.forEach((t) => {
			if (!t.classList.contains('visible')) t.classList.add('visible');
		});
	}, 3000);

	return {
		destroy() {
			observer.disconnect();
			window.clearTimeout(safety);
		}
	};
}

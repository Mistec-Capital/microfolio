#!/usr/bin/env bash
# Regresión del sistema de marca MisTec (spec §4.7 y §8.2).
# Falla si src/ usa recursos prohibidos por los manuales o si el ámbar
# aparece fuera del presupuesto. Uso: bun run check:brand
set -u
set -f
cd "$(dirname "$0")/.."
fail=0
files=$(find src -type f \( -name '*.svelte' -o -name '*.css' -o -name '*.js' -o -name '*.html' \) | sort)

forbidden=(
	'font-mono' 'JetBrains' 'Geist' '~icons' 'iconify' 'lucide'
	'font-bold' 'font-semibold' 'font-extrabold' 'font-weight: *[6-9]00'
	'rounded-full' 'backdrop-blur' 'gradient' 'glow' 'shadow-' 'blur\(' 'grain' 'marquee' 'animate-'
	'section-paper' 'chip' '(^|[^-])kicker' 'Kicker' 'serial' 'Serial' 'marginalia' 'Marginalia'
	'tag-pill' 'card-dark' 'ed-card' 'bg-mesh' 'bg-blueprint' 'text-center' '\[#[0-9A-Fa-f]'
	'mistec\.png' 'Mistec Capital' 'LATAM'
)
for p in "${forbidden[@]}"; do
	hits=$(grep -nE -- "$p" $files || true)
	if [ -n "$hits" ]; then
		echo "✗ prohibido «$p»:"
		echo "$hits" | sed 's/^/    /'
		fail=1
	fi
done

# Ámbar fuera de theme.css: nada.
others=$(echo "$files" | grep -v '^src/lib/theme.css$')
hits=$(grep -nEi -- 'ffb840|amber' $others || true)
if [ -n "$hits" ]; then
	echo "✗ ámbar fuera de src/lib/theme.css:"
	echo "$hits" | sed 's/^/    /'
	fail=1
fi

# Ámbar dentro de theme.css: solo el presupuesto (spec §4.7).
while IFS= read -r line; do
	[ -z "$line" ] && continue
	case "$line" in
		*'--amber:'* | *'--amber-dim:'* | *'outline: 2px solid var(--amber)'* | *'background-color: var(--amber)'* | *'color: var(--amber)'*) ;;
		*)
			echo "✗ ámbar fuera de presupuesto en theme.css: $line"
			fail=1
			;;
	esac
done < <(grep -nEi -- 'ffb840|amber' src/lib/theme.css || true)

if [ "$fail" -eq 0 ]; then
	echo "✓ check-brand: sin violaciones"
fi
exit $fail

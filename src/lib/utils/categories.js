// Etiquetas y helpers puros para las fichas de proyecto.
// No importa fs: se usa tanto en el servidor como en el cliente.

const LABELS = {
	todos: 'Todos',
	saas: 'SaaS',
	'mobile-app': 'App móvil',
	mobile: 'App móvil',
	'e-commerce': 'E-commerce',
	ecommerce: 'E-commerce',
	'gobierno-digital': 'Gobierno digital',
	logistica: 'Logística',
	'recursos-humanos': 'RRHH',
	'gestion-administrativa': 'Administrativo',
	'gestion-deportiva': 'Gestión deportiva',
	'gis-mapas': 'GIS',
	ia: 'IA',
	iot: 'IoT',
	salud: 'Salud',
	'punto de venta': 'Punto de venta',
	movilidad: 'Movilidad'
};

export function categoryLabel(type) {
	const key = (type || '').toLowerCase().trim();
	if (!key) return 'Proyecto';
	return LABELS[key] ?? type;
}

export function isInDevelopment(status) {
	return (status || '').toLowerCase().includes('desarrollo');
}

export function yearOf(date) {
	return date ? new Date(date).getFullYear().toString() : '';
}

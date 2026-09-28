export const siteConfig = {
	title: 'MisTec',
	tagline: 'Ingeniería de software y soluciones digitales',
	description:
		'MisTec diseña, desarrolla e implementa soluciones digitales para organizaciones públicas y privadas. Ingeniería de software, productos digitales y consultoría tecnológica desde Posadas, Misiones.',
	author: 'MisTec',

	// URL canónica (sitemap, OG, JSON-LD)
	siteUrl: 'https://mistec-capital.com',
	defaultOgImage: '/og-default.jpg',
	locale: 'es_AR',
	founded: '2020',

	socialLinks: {
		github: 'https://github.com/mistec-capital',
		linkedin: 'https://linkedin.com/company/mistec-capital',
		instagram: 'https://instagram.com/mistec.capital'
	},

	contact: {
		email: 'mistec.capital@gmail.com',
		whatsapp: '+54 9 3764 734375',
		location: 'Posadas, Misiones, Argentina'
	},

	// Certificaciones y alianzas (sección 05 · Alcance). Logos monocromos en
	// static/brand/aliados/, se tiñen con el color del texto.
	aliados: [
		{
			nombre: 'Mercado Pago',
			detalle: 'Certificado Checkout Pro',
			logo: '/brand/aliados/mercadopago.svg'
		},
		{ nombre: 'Meta', detalle: 'Partner', logo: '/brand/aliados/meta.svg' },
		{ nombre: 'Hikvision', detalle: 'Partner', logo: '/brand/aliados/hikvision.svg' }
	],

	// Navegación de la landing (anclas a las secciones del Manual Institucional)
	landingNav: [
		{ name: 'Nosotros', href: '#nosotros' },
		{ name: 'Soluciones', href: '#soluciones' },
		{ name: 'Cómo trabajamos', href: '#metodo' },
		{ name: 'Proyectos', href: '#proyectos' },
		{ name: 'Contacto', href: '#contacto' }
	],

	// Navegación del resto de las páginas
	navigation: [
		{ name: 'Inicio', href: '/' },
		{ name: 'Proyectos', href: '/projects' },
		{ name: 'Lista', href: '/list' },
		{ name: 'Mapa', href: '/map' },
		{ name: 'Nosotros', href: '/about' }
	]
};

import { readFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
import { marked } from 'marked';
import { error } from '@sveltejs/kit';

const basePath =
	process.env.CUSTOM_DOMAIN === 'true'
		? ''
		: process.env.NODE_ENV === 'production'
			? '/microfolio'
			: '';

/**
 * Map the microfolio `type` field onto the editorial-landing `domain`.
 * Matches the taxonomy used by the mistecLand landing (saas, government,
 * ia, ecommerce, iot, sports, logistics, admin, mobile, gis).
 */
function domainFromType(type) {
	switch ((type || '').toLowerCase()) {
		case 'saas':
			return 'saas';
		case 'mobile-app':
		case 'mobile':
			return 'mobile';
		case 'e-commerce':
		case 'ecommerce':
			return 'ecommerce';
		case 'gobierno-digital':
		case 'government':
			return 'government';
		case 'logistica':
		case 'logistics':
			return 'logistics';
		case 'recursos-humanos':
		case 'gestion-administrativa':
		case 'admin':
			return 'admin';
		case 'gestion-deportiva':
		case 'sports':
			return 'sports';
		case 'gis-mapas':
		case 'gis':
			return 'gis';
		case 'ia':
		case 'ai':
			return 'ia';
		case 'iot':
			return 'iot';
		default:
			return 'admin';
	}
}

function categoryFromDomain(domain) {
	switch (domain) {
		case 'saas':
			return 'SaaS';
		case 'mobile':
			return 'App Móvil';
		case 'ecommerce':
			return 'E-commerce';
		case 'government':
			return 'Gobierno Digital';
		case 'logistics':
			return 'Logística';
		case 'admin':
			return 'Administrativo';
		case 'sports':
			return 'Gestión Deportiva';
		case 'gis':
			return 'GIS';
		case 'ia':
			return 'IA';
		case 'iot':
			return 'IoT';
		default:
			return 'Proyecto';
	}
}

export async function load() {
	const indexPath = join(process.cwd(), 'content/index.md');
	const projectsPath = join(process.cwd(), 'content/projects');

	try {
		const content = await readFile(indexPath, 'utf-8');
		const [, frontmatter, ...markdownParts] = content.split('---');
		const markdownContent = markdownParts.join('---').trim();

		const metadata = parse(frontmatter);
		const htmlContent = marked(markdownContent);

		const projectFolders = await readdir(projectsPath);
		const projects = [];

		for (const folder of projectFolders) {
			if (folder.startsWith('.') || folder.endsWith('.zip')) continue;
			const projectPath = join(projectsPath, folder);
			const projectIndexPath = join(projectPath, 'index.md');

			try {
				const projectContent = await readFile(projectIndexPath, 'utf-8');
				const [, projectFrontmatter] = projectContent.split('---');
				const projectMetadata = parse(projectFrontmatter);

				const webpPath = join(projectPath, 'thumbnail.webp');
				const hasWebP = existsSync(webpPath);

				const domain = domainFromType(projectMetadata.type);
				const year = projectMetadata.date
					? new Date(projectMetadata.date).getFullYear().toString()
					: '';

				projects.push({
					slug: folder,
					...projectMetadata,
					year,
					domain,
					category: categoryFromDomain(domain),
					thumbnailSrc: `${basePath}/content/projects/${folder}/thumbnail.jpg`,
					hasWebP
				});
			} catch (err) {
				console.warn(`Error reading project ${folder}:`, err);
			}
		}

		projects.sort((a, b) => new Date(b.date) - new Date(a.date));

		const featuredProjects = projects.filter((p) => p.featured === true);

		const stats = {
			total: projects.length,
			featured: featuredProjects.length,
			government: projects.filter((p) => p.domain === 'government').length,
			saas: projects.filter((p) => p.domain === 'saas').length,
			ia: projects.filter((p) => p.domain === 'ia').length,
			countries: new Set(
				projects
					.map((p) => (p.location || '').split(',').pop()?.trim())
					.filter(Boolean)
			).size
		};

		return {
			page: { ...metadata, content: htmlContent },
			projects,
			featuredProjects,
			stats
		};
	} catch (err) {
		console.error('Error loading home page content:', err);
		throw error(404, 'Page content not found');
	}
}

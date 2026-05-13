import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { siteConfig } from '$lib/config.js';

export const prerender = true;

const STATIC_ROUTES = [
	{ path: '/', changefreq: 'weekly', priority: 1.0 },
	{ path: '/projects', changefreq: 'weekly', priority: 0.9 },
	{ path: '/list', changefreq: 'weekly', priority: 0.7 },
	{ path: '/map', changefreq: 'weekly', priority: 0.7 },
	{ path: '/about', changefreq: 'monthly', priority: 0.6 }
];

async function loadProjectEntries() {
	const projectsPath = join(process.cwd(), 'content/projects');
	const entries = [];
	try {
		const folders = await readdir(projectsPath);
		for (const folder of folders) {
			if (folder.startsWith('.') || folder.endsWith('.zip')) continue;
			const indexPath = join(projectsPath, folder, 'index.md');
			try {
				const content = await readFile(indexPath, 'utf-8');
				const [, frontmatter] = content.split('---');
				const meta = parse(frontmatter);
				entries.push({
					path: `/projects/${folder}`,
					lastmod: meta.date ? new Date(meta.date).toISOString().slice(0, 10) : undefined,
					changefreq: 'monthly',
					priority: meta.featured ? 0.8 : 0.6
				});
			} catch {
				// skip
			}
		}
	} catch {
		// no projects dir
	}
	return entries;
}

function urlNode({ path, lastmod, changefreq, priority }, base) {
	const loc = `${base}${path}`.replace(/\/+$/, '') || base;
	return [
		'  <url>',
		`    <loc>${loc}</loc>`,
		lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
		changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
		typeof priority === 'number' ? `    <priority>${priority.toFixed(1)}</priority>` : null,
		'  </url>'
	]
		.filter(Boolean)
		.join('\n');
}

export async function GET() {
	const base = (siteConfig.siteUrl || 'https://mistec-capital.com').replace(/\/+$/, '');
	const projectEntries = await loadProjectEntries();
	const all = [...STATIC_ROUTES, ...projectEntries];
	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...all.map((entry) => urlNode(entry, base)),
		'</urlset>'
	].join('\n');

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

const basePath = process.env.NODE_ENV === 'production' ? '/microfolio' : '';

export async function loadProjects() {
	const projectsPath = join(process.cwd(), 'content/projects');

	try {
		const projectFolders = await readdir(projectsPath);
		const projects = [];

		for (const folder of projectFolders) {
			if (folder.startsWith('.') || folder.endsWith('.zip')) continue;

			const projectPath = join(projectsPath, folder);
			const indexPath = join(projectPath, 'index.md');

			try {
				const content = await readFile(indexPath, 'utf-8');
				const [, frontmatter] = content.split('---');
				const metadata = parse(frontmatter);

				projects.push({
					slug: folder,
					...metadata,
					thumbnailPath: `${basePath}/content/projects/${folder}/thumbnail.jpg`
				});
			} catch (error) {
				console.warn(`Error reading project ${folder}:`, error);
			}
		}

		projects.sort((a, b) => new Date(b.date) - new Date(a.date));

		return projects;
	} catch (error) {
		console.error('Error loading projects:', error);
		return [];
	}
}
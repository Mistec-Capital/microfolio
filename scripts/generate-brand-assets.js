#!/usr/bin/env node
// Genera los assets de marca servidos desde static/ a partir de los PNG
// originales en brand/signos/. La marca nunca se redibuja: solo se recorta
// (trim de transparencia) y se escala. Ver spec §4.8.
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

const SRC = 'brand/signos';
const OUT = 'static/brand';
const INK = '#0A0A0A';

await mkdir(OUT, { recursive: true });

// Bloque horizontal e isotipo en bone sobre transparente, recortados al rectángulo que los contiene.
await sharp(join(SRC, 'mistec-bloque-horizontal-transparente-bone.png'))
	.trim()
	.resize({ width: 720 })
	.png()
	.toFile(join(OUT, 'mistec-horizontal-bone.png'));

await sharp(join(SRC, 'mistec-isotipo-transparente-bone.png'))
	.trim()
	.resize({ width: 240 })
	.png()
	.toFile(join(OUT, 'mistec-isotipo-bone.png'));

// Isotipo bone sobre ink (versión negativa) para favicon, avatar y JSON-LD.
const negativo = join(SRC, 'mistec-isotipo-negativo.png');
await sharp(negativo).resize(512, 512).png().toFile(join(OUT, 'mistec-logo-512.png'));
await sharp(negativo).resize(192, 192).png().toFile('static/favicon-192.png');
await sharp(negativo).resize(96, 96).png().toFile('static/favicon-96.png');
await sharp(negativo).resize(180, 180).png().toFile('static/apple-touch-icon.png');

const icoSources = await Promise.all(
	[16, 32, 48].map((size) => sharp(negativo).resize(size, size).png().toBuffer())
);
await writeFile('static/favicon.ico', await pngToIco(icoSources));

// Open Graph 1200×630: portada ink, bloque horizontal arriba a la izquierda,
// título en el tercio inferior. Sin ámbar: la pieza es institucional.
const marca = await sharp(join(SRC, 'mistec-bloque-horizontal-transparente-bone.png'))
	.trim()
	.resize({ width: 300 })
	.png()
	.toBuffer();

const titulo = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <text x="96" y="470" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="56" font-weight="500" fill="#E8E3D6" letter-spacing="-1.2">Ingeniería aplicada a resolver problemas.</text>
  <text x="96" y="530" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="400" fill="#8A857A">Ingeniería de software y soluciones digitales · Posadas, Misiones</text>
</svg>`);

await sharp({ create: { width: 1200, height: 630, channels: 3, background: INK } })
	.composite([
		{ input: marca, top: 96, left: 96 },
		{ input: titulo, top: 0, left: 0 }
	])
	.jpeg({ quality: 90 })
	.toFile('static/og-default.jpg');

console.log('Assets de marca generados en static/brand y static/.');

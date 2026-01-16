import sharp from 'sharp';
import { resolve } from 'path';

const input = resolve('src/images/fundo.jpg');

try {
  await sharp(input)
    .resize(1600)
    .webp({ quality: 80 })
    .toFile('src/images/fundo-1600.webp');

  await sharp(input)
    .resize(1200)
    .webp({ quality: 80 })
    .toFile('src/images/fundo-1200.webp');

  await sharp(input)
    .resize(800)
    .webp({ quality: 75 })
    .toFile('src/images/fundo-800.webp');

  console.log('WebP images generated: fundo-800.webp, fundo-1200.webp, fundo-1600.webp');
} catch (err) {
  console.error('Error generating images', err);
  process.exit(1);
}

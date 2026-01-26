const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createColoredJPG(width, height, color, text, outputPath) {
  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 214, b: 232 }; // default soft pink
  };

  const rgb = hexToRgb(color);

  // Create SVG with proper dimensions
  const svg = Buffer.from(`
    <svg width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="rgb(${rgb.r},${rgb.g},${rgb.b})"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#1A1A2E" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `);

  // Convert SVG to JPG using sharp
  await sharp(svg)
    .jpeg({ quality: 90 })
    .toFile(outputPath);
  
  console.log(`✓ Created: ${path.basename(outputPath)}`);
}

async function generateAllImages() {
  const publicDir = path.join(__dirname, '..', 'public', 'images');

  console.log('🎨 Generating JPG placeholder images...\n');

  // Hero background (1920x600)
  console.log('📸 Hero image:');
  await createColoredJPG(
    1920, 600,
    '#E5DEFF',
    'Hero Background - Replace with real photo',
    path.join(publicDir, 'hero', 'hero-bg.jpg')
  );

  // Service images (800x600)
  console.log('\n🎭 Service images:');
  const services = [
    { slug: 'edinorozhka', name: 'Единорожка', color: '#FF1493' },
    { slug: 'kuromi-i-melodi', name: 'Куроми и Мелоди', color: '#9D4EDD' },
    { slug: 'labubu', name: 'Лабубу', color: '#00B4D8' },
    { slug: 'labubu-i-edinorozhka', name: 'Лабубу и Единорожка', color: '#06D6A0' },
    { slug: 'mikki-i-minni-maus', name: 'Микки и Минни', color: '#EF476F' },
    { slug: 'super-geroi', name: 'Супер герои', color: '#FF6B35' },
    { slug: 'tik-tok', name: 'Тик Ток', color: '#00F5FF' },
    { slug: 'umnik-i-konfetka', name: 'Умник и Конфетка', color: '#FFD60A' },
    { slug: 'fiksiki', name: 'Фиксики', color: '#90E0A0' },
    { slug: 'fyeki', name: 'Фьеки', color: '#FF9B85' },
    { slug: 'holodnoe-serdce', name: 'Холодное сердце', color: '#A8DADC' },
    { slug: 'shchenyachij-patrul', name: 'Щенячий патруль', color: '#457B9D' }
  ];

  for (const service of services) {
    await createColoredJPG(
      800, 600,
      service.color,
      service.name,
      path.join(publicDir, 'services', `${service.slug}.jpg`)
    );
  }

  // Event images
  console.log('\n📅 Event images:');
  for (let i = 1; i <= 3; i++) {
    // Featured image (1200x675 - 16:9 aspect ratio)
    await createColoredJPG(
      1200, 675,
      '#D4F1E8',
      `Event ${i} Featured`,
      path.join(publicDir, 'events', `event-${i}-featured.jpg`)
    );
    
    // Gallery images (800x600 - 4:3 aspect ratio)
    for (let j = 1; j <= 6; j++) {
      await createColoredJPG(
        800, 600,
        '#D4F1E8',
        `Event ${i} - Photo ${j}`,
        path.join(publicDir, 'events', `event-${i}-${j}.jpg`)
      );
    }
  }

  // Generic placeholder
  console.log('\n🖼️  Generic placeholder:');
  await createColoredJPG(
    800, 600,
    '#E5DEFF',
    'Placeholder Image',
    path.join(publicDir, 'placeholder.jpg')
  );

  // Service gallery images (6 per service)
  console.log('\n📸 Service gallery images:');
  for (const service of services) {
    console.log(`\n  ${service.name}:`);
    for (let i = 1; i <= 6; i++) {
      await createColoredJPG(
        800, 600,
        service.color,
        `${service.name} - Gallery ${i}`,
        path.join(publicDir, 'services', `${service.slug}-gallery-${i}.jpg`)
      );
    }
  }

  console.log('\n✅ All JPG placeholder images generated successfully!');
  console.log('📝 Note: Replace these with real photos before production deployment.\n');
}

generateAllImages().catch(console.error);

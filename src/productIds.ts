const productIds: Record<string, string> = {
  'Skull Rock Shirt': 'skull-rock-shirt',
  'Bohemian Fashion Watch': 'bohemian-fashion-watch',
  'Casual Jazz Shirt': 'casual-jazz-shirt',
  'Black Bohemian Print Shoes': 'black-bohemian-print-shoes',
  'Creative Shirt': 'creative-shirt',
  'Crossbody Rock Bag': 'crossbody-rock-bag',
  'Set of Six Bracelets with Bull Head': 'bull-head-bracelet-set',
  'ADeriva Bucket Hat': 'aderiva-bucket-hat',
  'Vinyl Disc Shirt': 'vinyl-disc-shirt',
  'Sporty Shoes with Geometric Bohemian Print': 'geometric-bohemian-sport-shoes',
  'Camisa de Hombre con Estampado Completo': 'music-tape-shirt',
  'Guitar Temporary Tattoos': 'guitar-temporary-tattoos',
  'Tote Bag Vintage 1980': 'tote-bag-vintage-1980',
};

export function getProductId(name: string) {
  return productIds[name] ?? name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

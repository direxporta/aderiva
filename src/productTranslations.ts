import type { Language } from './i18n';

type ProductCopy = { name: string; category: string; note: string; description: string };

const copy: Record<Language, ProductCopy[]> = {
  EN: [
    { name:'Skull Rock Shirt', category:'UNISEX', note:'Free shipping in mainland Spain', description:'Short-sleeve shirt with a bold skull and rock-inspired design. A distinctive piece for concerts, festivals and everyday alternative style.' },
    { name:'Bohemian Fashion Watch', category:'UNISEX', note:'Shipping included', description:'Bohemian-style wristwatch with an ornate, colourful face and a distinctive vintage-inspired look.' },
    { name:'Casual Jazz Shirt', category:'MEN', note:'Shipping included to mainland Spain', description:'Short-sleeve shirt with a colourful music-inspired print featuring guitars, records and jazz motifs. A relaxed statement piece for music lovers.' },
    { name:'Black Bohemian Print Shoes', category:'UNISEX', note:'Shipping included to mainland Spain', description:'Low-top shoes with a bold black, cream and blue bohemian-inspired pattern. A distinctive choice for everyday alternative looks.' },
    { name:'Creative Shirt', category:'UNISEX', note:'Shipping included to mainland Spain', description:'Short-sleeve shirt covered in a colourful collage-style print with music, pop-art and everyday motifs.' },
    { name:'Crossbody Rock Bag', category:'UNISEX', note:'Shipping included', description:'Compact black crossbody bag with a music-inspired graphic on the front. Practical for concerts, festivals and everyday use.' },
    { name:'Set of Six Bracelets with Bull Head', category:'UNISEX', note:'Shipping included to mainland Spain', description:'Set of six bracelets with a mix of beads, cords and distinctive bull-head details. A bold accessory set for alternative looks.' },
    { name:'ADeriva Bucket Hat', category:'UNISEX', note:'Free shipping in mainland Spain', description:'Black ADeriva bucket hat featuring the ADeriva Indie Rock logo. A simple everyday accessory for music fans.' },
    { name:'Vinyl Disc Shirt', category:'UNISEX', note:'Shipping included', description:'Short-sleeve shirt with an all-over print of colourful vinyl records and music-inspired graphics.' },
    { name:'Sporty Shoes with Geometric Bohemian Print', category:'UNISEX', note:'Shipping included', description:'Sporty low-top shoes with a colourful geometric and bohemian-inspired print. A standout pair for everyday alternative style.' },
    { name:"Men's All-Over Print Shirt", category:'MEN', note:'Shipping included to mainland Spain', description:'Short-sleeve men’s shirt with an all-over collage of colourful music, retro and graphic motifs. Designed as a bold statement piece.' },
    { name:'Guitar Temporary Tattoos', category:'UNISEX', note:'One size', description:'Set of temporary tattoos featuring guitars and other music-inspired illustrations. A fun accessory for concerts, festivals and music fans.' },
    { name:'Tote Bag Vintage 1980', category:'UNISEX', note:'Vintage-inspired canvas', description:'Vintage-inspired tote bag with a retro 1980s graphic. A practical everyday bag with a distinctive music and alternative feel.' },
  ],
  ES: [
    { name:'Skull Rock Shirt', category:'UNISEX', note:'Envío gratis en España peninsular', description:'Camisa de manga corta con un llamativo diseño de calavera y estética rock. Una pieza con carácter para conciertos, festivales y looks alternativos.' },
    { name:'Bohemian Fashion Watch', category:'UNISEX', note:'Portes incluidos', description:'Reloj de pulsera de estilo bohemio, con una esfera ornamentada y llena de color y un marcado aire vintage.' },
    { name:'Casual Jazz Shirt', category:'HOMBRE', note:'Portes incluidos a España peninsular', description:'Camisa de manga corta con un estampado musical lleno de color, con guitarras, discos y motivos de jazz. Una pieza relajada para amantes de la música.' },
    { name:'Black Bohemian Print Shoes', category:'UNISEX', note:'Portes incluidos a España peninsular', description:'Zapatillas bajas con un llamativo estampado bohemio en negro, crema y azul. Una opción diferente para looks alternativos de diario.' },
    { name:'Creative Shirt', category:'UNISEX', note:'Portes incluidos a España peninsular', description:'Camisa de manga corta con un colorido estampado tipo collage que combina música, pop art y diferentes motivos gráficos.' },
    { name:'Crossbody Rock Bag', category:'UNISEX', note:'Portes incluidos', description:'Bolso bandolera negro compacto con un gráfico inspirado en la música en la parte frontal. Práctico para conciertos, festivales y el día a día.' },
    { name:'Set of Six Bracelets with Bull Head', category:'UNISEX', note:'Portes incluidos a España peninsular', description:'Conjunto de seis pulseras con cuentas, cordones y distintivos detalles de cabeza de toro. Un accesorio con carácter para looks alternativos.' },
    { name:'ADeriva Bucket Hat', category:'UNISEX', note:'Envío gratis en España peninsular', description:'Gorro bucket negro de ADeriva con el logotipo ADeriva Indie Rock. Un accesorio sencillo para los amantes de la música.' },
    { name:'Vinyl Disc Shirt', category:'UNISEX', note:'Portes incluidos', description:'Camisa de manga corta con un estampado integral de discos de vinilo de colores y gráficos inspirados en la música.' },
    { name:'Sporty Shoes with Geometric Bohemian Print', category:'UNISEX', note:'Portes incluidos', description:'Zapatillas deportivas bajas con un colorido estampado geométrico y bohemio. Un par llamativo para looks alternativos de diario.' },
    { name:"Men's All-Over Print Shirt", category:'HOMBRE', note:'Portes incluidos a España peninsular', description:'Camisa de hombre de manga corta con un estampado integral de motivos musicales, retro y gráficos llenos de color. Una pieza pensada para destacar.' },
    { name:'Guitar Temporary Tattoos', category:'UNISEX', note:'Talla única', description:'Set de tatuajes temporales con guitarras y otras ilustraciones inspiradas en la música. Un complemento divertido para conciertos, festivales y amantes de la música.' },
    { name:'Tote Bag Vintage 1980', category:'UNISEX', note:'Lona de inspiración vintage', description:'Bolso tote de inspiración vintage con un gráfico retro de los años 80. Un bolso práctico de diario con marcado carácter musical y alternativo.' },
  ],
  FR: [
    { name:'Skull Rock Shirt', category:'UNISEXE', note:'Livraison gratuite en Espagne continentale', description:'Chemise à manches courtes avec un motif marqué de crâne et une esthétique rock. Une pièce forte pour les concerts, festivals et looks alternatifs.' },
    { name:'Bohemian Fashion Watch', category:'UNISEXE', note:'Livraison incluse', description:'Montre-bracelet de style bohème avec un cadran orné et coloré et une allure vintage distinctive.' },
    { name:'Casual Jazz Shirt', category:'HOMME', note:'Livraison incluse en Espagne continentale', description:'Chemise à manches courtes avec un imprimé musical coloré mêlant guitares, vinyles et motifs jazz. Une pièce décontractée pour les passionnés de musique.' },
    { name:'Black Bohemian Print Shoes', category:'UNISEXE', note:'Livraison incluse en Espagne continentale', description:'Chaussures basses avec un motif bohème marqué en noir, crème et bleu. Une paire originale pour les looks alternatifs du quotidien.' },
    { name:'Creative Shirt', category:'UNISEXE', note:'Livraison incluse en Espagne continentale', description:'Chemise à manches courtes couverte d’un imprimé coloré façon collage mêlant musique, pop art et motifs graphiques.' },
    { name:'Crossbody Rock Bag', category:'UNISEXE', note:'Livraison incluse', description:'Petit sac bandoulière noir avec un graphisme inspiré de la musique sur le devant. Pratique pour les concerts, festivals et le quotidien.' },
    { name:'Set of Six Bracelets with Bull Head', category:'UNISEXE', note:'Livraison incluse en Espagne continentale', description:'Ensemble de six bracelets mêlant perles, cordons et détails distinctifs en forme de tête de taureau. Un accessoire au caractère affirmé.' },
    { name:'ADeriva Bucket Hat', category:'UNISEXE', note:'Livraison gratuite en Espagne continentale', description:'Bob noir ADeriva avec le logo ADeriva Indie Rock. Un accessoire simple pour les amateurs de musique.' },
    { name:'Vinyl Disc Shirt', category:'UNISEXE', note:'Livraison incluse', description:'Chemise à manches courtes avec un imprimé intégral de vinyles colorés et de graphismes inspirés de la musique.' },
    { name:'Sporty Shoes with Geometric Bohemian Print', category:'UNISEXE', note:'Livraison incluse', description:'Chaussures sport basses avec un motif géométrique et bohème coloré. Une paire originale pour les looks alternatifs du quotidien.' },
    { name:"Men's All-Over Print Shirt", category:'HOMME', note:'Livraison incluse en Espagne continentale', description:'Chemise homme à manches courtes avec un imprimé intégral coloré mêlant motifs musicaux, rétro et graphiques. Une pièce faite pour se démarquer.' },
    { name:'Guitar Temporary Tattoos', category:'UNISEXE', note:'Taille unique', description:'Set de tatouages temporaires représentant des guitares et d’autres illustrations inspirées de la musique. Un accessoire amusant pour concerts et festivals.' },
    { name:'Tote Bag Vintage 1980', category:'UNISEXE', note:'Toile d’inspiration vintage', description:'Tote bag d’inspiration vintage avec un graphisme rétro des années 80. Un sac pratique au quotidien avec une forte identité musicale et alternative.' },
  ],
  DE: [
    { name:'Skull Rock Shirt', category:'UNISEX', note:'Kostenloser Versand auf das spanische Festland', description:'Kurzarmhemd mit markantem Totenkopf- und Rockmotiv. Ein ausdrucksstarkes Stück für Konzerte, Festivals und alternative Alltagslooks.' },
    { name:'Bohemian Fashion Watch', category:'UNISEX', note:'Versand inklusive', description:'Armbanduhr im Boho-Stil mit farbenfrohem, verziertem Zifferblatt und markanter Vintage-Optik.' },
    { name:'Casual Jazz Shirt', category:'HERREN', note:'Versand inklusive auf das spanische Festland', description:'Kurzarmhemd mit farbenfrohem Musikprint aus Gitarren, Schallplatten und Jazzmotiven. Ein lässiges Statement-Piece für Musikfans.' },
    { name:'Black Bohemian Print Shoes', category:'UNISEX', note:'Versand inklusive auf das spanische Festland', description:'Sneaker mit auffälligem Boho-Muster in Schwarz, Creme und Blau. Eine besondere Wahl für alternative Alltagslooks.' },
    { name:'Creative Shirt', category:'UNISEX', note:'Versand inklusive auf das spanische Festland', description:'Kurzarmhemd mit einem farbenfrohen Collage-Print aus Musik-, Pop-Art- und verschiedenen Grafikmotiven.' },
    { name:'Crossbody Rock Bag', category:'UNISEX', note:'Versand inklusive', description:'Kompakte schwarze Umhängetasche mit einem musikbezogenen Grafikmotiv auf der Vorderseite. Praktisch für Konzerte, Festivals und den Alltag.' },
    { name:'Set of Six Bracelets with Bull Head', category:'UNISEX', note:'Versand inklusive auf das spanische Festland', description:'Set aus sechs Armbändern mit Perlen, Bändern und markanten Details in Form eines Stierkopfes. Ein ausdrucksstarkes Accessoire.' },
    { name:'ADeriva Bucket Hat', category:'UNISEX', note:'Kostenloser Versand auf das spanische Festland', description:'Schwarzer ADeriva-Bucket-Hat mit ADeriva-Indie-Rock-Logo. Ein schlichtes Accessoire für Musikfans.' },
    { name:'Vinyl Disc Shirt', category:'UNISEX', note:'Versand inklusive', description:'Kurzarmhemd mit einem All-over-Print aus farbenfrohen Schallplatten und musikbezogenen Grafiken.' },
    { name:'Sporty Shoes with Geometric Bohemian Print', category:'UNISEX', note:'Versand inklusive', description:'Sportliche Low-Top-Schuhe mit farbenfrohem geometrischem Boho-Muster. Ein auffälliges Paar für alternative Alltagslooks.' },
    { name:"Men's All-Over Print Shirt", category:'HERREN', note:'Versand inklusive auf das spanische Festland', description:'Kurzarmhemd für Herren mit einem farbenfrohen All-over-Print aus Musik-, Retro- und Grafikmotiven. Ein Statement-Piece mit Charakter.' },
    { name:'Guitar Temporary Tattoos', category:'UNISEX', note:'Einheitsgröße', description:'Set temporärer Tattoos mit Gitarren und weiteren musikbezogenen Illustrationen. Ein witziges Accessoire für Konzerte, Festivals und Musikfans.' },
    { name:'Tote Bag Vintage 1980', category:'UNISEX', note:'Vintage-inspirierter Canvas', description:'Vintage-inspirierte Tote-Bag mit Retro-Grafik im Stil der 1980er. Eine praktische Alltagstasche mit musikalischem und alternativem Charakter.' },
  ],
};

export function getProductCopy(index: number, language: Language) {
  return copy[language][index] ?? copy.EN[index];
}

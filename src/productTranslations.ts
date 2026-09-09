import type { Language } from './i18n';

type ProductCopy = { name: string; category: string; note: string; description: string };

const copy: Record<Language, ProductCopy[]> = {
  EN: [
    { name: 'The Sound Tee', category: 'UNISEX', note: 'Heavyweight cotton', description: 'A 240gsm heavyweight cotton tee with a boxy, relaxed fit. Screen-printed front graphic inspired by late-night setlists. Built to survive mosh pits and washing machines alike.' },
    { name: 'After Hours Jacket', category: 'WOMEN', note: 'Limited edition', description: 'A structured oversized jacket in washed clay canvas. Faded metal hardware, deep pockets, and a lining printed with lyrics no one else will see. Limited to 200 pieces.' },
    { name: 'Live Music Rock Shirt', category: 'MEN', note: 'Rock graphic print', description: 'A relaxed short-sleeve button-up covered in vintage-inspired rock graphics — guitars, amplifiers, musical notes and bold LIVE ROCK lettering. A statement piece made for gigs, festivals and everyday music lovers.' },
    { name: 'Noise & Poetry Cap', category: 'UNISEX', note: 'Embroidered cotton', description: 'A six-panel cap in washed ink cotton with embroidered front lettering and a metal back clasp. One size, adjustable — built for sunny festival days.' },
    { name: 'Static Hoodie', category: 'UNISEX', note: 'Brushed fleece', description: 'A 400gsm brushed-fleece hoodie with a relaxed drop-shoulder fit. Double-lined hood, kangaroo pocket, and a tonal embroidered logo on the chest. Your new uniform.' },
    { name: 'Feedback Crewneck', category: 'MEN', note: 'Garment dyed', description: 'A garment-dyed crewneck in deep teal with a slightly cropped silhouette. Soft brushed interior, ribbed cuffs, and a small woven label on the hem. Layer it or wear it alone.' },
    { name: 'Distortion Dress', category: 'WOMEN', note: 'Limited edition', description: 'A slip dress in washed clay with an asymmetrical hem and adjustable straps. Lightweight and breathable, with a subtle sheen that catches stage light. Limited to 150 pieces.' },
    { name: 'Reverb Tote', category: 'UNISEX', note: 'Canvas + leather', description: 'A heavyweight canvas tote with vegetable-tanned leather handles and a reinforced base. Roomy enough for a laptop, a vinyl or two, and whatever the day throws at you.' },
    { name: 'Solar Swirl Tee', category: 'MEN', note: 'Washed cotton · Double-sided print', description: 'A loose-fit washed cotton tee with a bold hand-drawn sun and spiral graphic. The artwork continues across the front and back for a worn-in, festival-ready feel. An easy everyday piece with a slightly oversized silhouette.' },
    { name: 'Live Music Rock Shirt', category: 'MEN', note: 'Rock graphic print', description: 'A relaxed short-sleeve button-up covered in vintage-inspired rock graphics — guitars, amplifiers, musical notes and bold LIVE ROCK lettering. A statement piece made for gigs, festivals and everyday music lovers.' },
  ],
  ES: [
    { name: 'The Sound Tee', category: 'UNISEX', note: 'Algodón pesado', description: 'Camiseta de algodón pesado de 240 g/m² con corte cuadrado y relajado. Gráfico frontal serigrafiado inspirado en los repertorios de conciertos nocturnos. Hecha para sobrevivir al pogo y a la lavadora.' },
    { name: 'After Hours Jacket', category: 'MUJER', note: 'Edición limitada', description: 'Chaqueta oversize estructurada de lona color arcilla lavada. Herrajes metálicos envejecidos, bolsillos profundos y un forro estampado con letras que nadie más verá. Limitada a 200 unidades.' },
    { name: 'Live Music Rock Shirt', category: 'HOMBRE', note: 'Gráfico rock', description: 'Camisa holgada de manga corta con gráficos rock de inspiración vintage: guitarras, amplificadores, notas musicales y letras LIVE ROCK. Una pieza llamativa para conciertos, festivales y amantes de la música.' },
    { name: 'Noise & Poetry Cap', category: 'UNISEX', note: 'Algodón bordado', description: 'Gorra de seis paneles en algodón lavado color tinta, con letras bordadas y cierre metálico trasero. Talla única ajustable, hecha para los días de festival.' },
    { name: 'Static Hoodie', category: 'UNISEX', note: 'Felpa cepillada', description: 'Sudadera de felpa cepillada de 400 g/m² con hombro caído y corte relajado. Capucha de doble capa, bolsillo canguro y logo bordado a tono. Tu nuevo uniforme.' },
    { name: 'Feedback Crewneck', category: 'HOMBRE', note: 'Teñido en prenda', description: 'Sudadera de cuello redondo teñida en prenda, en verde azulado profundo y con silueta ligeramente corta. Interior suave, puños de canalé y pequeña etiqueta tejida en el bajo.' },
    { name: 'Distortion Dress', category: 'MUJER', note: 'Edición limitada', description: 'Vestido lencero de color arcilla lavado, con bajo asimétrico y tirantes ajustables. Ligero y transpirable, con un brillo sutil que capta la luz del escenario. Limitado a 150 unidades.' },
    { name: 'Reverb Tote', category: 'UNISEX', note: 'Lona + piel', description: 'Bolso tote de lona gruesa con asas de piel curtida vegetalmente y base reforzada. Espacioso para un portátil, un par de vinilos y todo lo que traiga el día.' },
    { name: 'Solar Swirl Tee', category: 'HOMBRE', note: 'Algodón lavado · Estampado a doble cara', description: 'Camiseta holgada de algodón lavado con un gráfico de sol y espiral dibujado a mano. El diseño continúa por delante y detrás para un aire desgastado y listo para festivales.' },
    { name: 'Live Music Rock Shirt', category: 'HOMBRE', note: 'Gráfico rock', description: 'Camisa holgada de manga corta con gráficos rock de inspiración vintage: guitarras, amplificadores, notas musicales y letras LIVE ROCK. Una pieza llamativa para conciertos, festivales y amantes de la música.' },
  ],
  FR: [
    { name: 'The Sound Tee', category: 'UNISEXE', note: 'Coton épais', description: 'T-shirt en coton épais 240 g/m² à la coupe carrée et décontractée. Graphisme sérigraphié inspiré des setlists de fin de soirée. Conçu pour résister aux pogos comme aux machines à laver.' },
    { name: 'After Hours Jacket', category: 'FEMMES', note: 'Édition limitée', description: 'Veste oversize structurée en toile argile délavée. Quincaillerie métallique patinée, poches profondes et doublure imprimée de paroles que personne d’autre ne verra. Limitée à 200 pièces.' },
    { name: 'Live Music Rock Shirt', category: 'HOMMES', note: 'Graphisme rock', description: 'Chemise ample à manches courtes couverte de graphismes rock vintage — guitares, amplis, notes de musique et lettrage LIVE ROCK. Une pièce forte pour les concerts, festivals et passionnés de musique.' },
    { name: 'Noise & Poetry Cap', category: 'UNISEXE', note: 'Coton brodé', description: 'Casquette six panneaux en coton délavé couleur encre, avec lettrage brodé et fermeture métallique arrière. Taille unique réglable, idéale pour les journées de festival.' },
    { name: 'Static Hoodie', category: 'UNISEXE', note: 'Molleton brossé', description: 'Sweat à capuche en molleton brossé 400 g/m², coupe décontractée et épaules tombantes. Capuche doublée, poche kangourou et logo brodé ton sur ton. Votre nouvel uniforme.' },
    { name: 'Feedback Crewneck', category: 'HOMMES', note: 'Teint en pièce', description: 'Sweat col rond teint en pièce, vert canard profond, à la silhouette légèrement courte. Intérieur doux, poignets côtelés et petite étiquette tissée sur l’ourlet.' },
    { name: 'Distortion Dress', category: 'FEMMES', note: 'Édition limitée', description: 'Robe nuisette en argile délavée avec ourlet asymétrique et bretelles réglables. Légère et respirante, avec un reflet subtil qui capte la lumière de la scène. Limitée à 150 pièces.' },
    { name: 'Reverb Tote', category: 'UNISEXE', note: 'Toile + cuir', description: 'Tote en toile épaisse avec anses en cuir tanné végétal et base renforcée. Assez spacieux pour un ordinateur, un ou deux vinyles et tout ce que la journée réserve.' },
    { name: 'Solar Swirl Tee', category: 'HOMMES', note: 'Coton délavé · Imprimé recto-verso', description: 'T-shirt ample en coton délavé avec un motif soleil et spirale dessiné à la main. Le graphisme se poursuit à l’avant et à l’arrière pour un look usé et prêt pour les festivals.' },
    { name: 'Live Music Rock Shirt', category: 'HOMMES', note: 'Graphisme rock', description: 'Chemise ample à manches courtes couverte de graphismes rock vintage — guitares, amplis, notes de musique et lettrage LIVE ROCK. Une pièce forte pour les concerts, festivals et passionnés de musique.' },
  ],
  DE: [
    { name: 'The Sound Tee', category: 'UNISEX', note: 'Schwere Baumwolle', description: 'Schweres T-Shirt aus 240 g/m² Baumwolle mit kastigem, entspanntem Schnitt. Siebdruckmotiv, inspiriert von nächtlichen Setlists. Gemacht für Moshpits und Waschmaschinen.' },
    { name: 'After Hours Jacket', category: 'DAMEN', note: 'Limitierte Edition', description: 'Strukturierte Oversize-Jacke aus gewaschenem Canvas in Tonerde. Patinierte Metallteile, tiefe Taschen und ein mit Textzeilen bedrucktes Futter. Auf 200 Stück limitiert.' },
    { name: 'Live Music Rock Shirt', category: 'HERREN', note: 'Rock-Grafik', description: 'Locker geschnittenes Kurzarmhemd mit Vintage-Rockgrafiken — Gitarren, Verstärker, Musiknoten und LIVE ROCK-Schriftzug. Ein Statement-Piece für Konzerte, Festivals und Musikfans.' },
    { name: 'Noise & Poetry Cap', category: 'UNISEX', note: 'Bestickte Baumwolle', description: 'Sechs-Panel-Cap aus gewaschener Baumwolle in Tintenfarbe, mit besticktem Schriftzug und Metallverschluss hinten. Einheitsgröße, verstellbar — für sonnige Festivaltage.' },
    { name: 'Static Hoodie', category: 'UNISEX', note: 'Gebürsteter Fleece', description: 'Hoodie aus 400 g/m² gebürstetem Fleece mit entspanntem Drop-Shoulder-Schnitt. Doppellagige Kapuze, Kängurutasche und tonales Logo. Deine neue Uniform.' },
    { name: 'Feedback Crewneck', category: 'HERREN', note: 'Garment Dyed', description: 'Garment-Dyed-Crewneck in tiefem Petrol mit leicht verkürzter Silhouette. Weiches, gebürstetes Innenfutter, Rippbündchen und kleines Weblabel am Saum.' },
    { name: 'Distortion Dress', category: 'DAMEN', note: 'Limitierte Edition', description: 'Slipdress aus gewaschenem Tonerde-Stoff mit asymmetrischem Saum und verstellbaren Trägern. Leicht und atmungsaktiv, mit subtilem Glanz im Bühnenlicht. Auf 150 Stück limitiert.' },
    { name: 'Reverb Tote', category: 'UNISEX', note: 'Canvas + Leder', description: 'Schwerer Canvas-Tote mit pflanzlich gegerbten Ledergriffen und verstärktem Boden. Groß genug für Laptop, ein oder zwei Vinyls und alles, was der Tag bringt.' },
    { name: 'Solar Swirl Tee', category: 'HERREN', note: 'Gewaschene Baumwolle · Beidseitiger Druck', description: 'Locker geschnittenes T-Shirt aus gewaschener Baumwolle mit handgezeichnetem Sonnen- und Spiralmotiv. Das Motiv setzt sich vorne und hinten fort und wirkt lässig und festivalbereit.' },
    { name: 'Live Music Rock Shirt', category: 'HERREN', note: 'Rock-Grafik', description: 'Locker geschnittenes Kurzarmhemd mit Vintage-Rockgrafiken — Gitarren, Verstärker, Musiknoten und LIVE ROCK-Schriftzug. Ein Statement-Piece für Konzerte, Festivals und Musikfans.' },
  ],
};

export function getProductCopy(index: number, language: Language) {
  return copy[language][index] ?? copy.EN[index];
}

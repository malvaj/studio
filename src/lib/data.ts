import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: number): string => {
    const image = PlaceHolderImages.find(img => parseInt(img.id) === id);
    return image ? image.imageUrl : `https://picsum.photos/seed/${id}/600/400`;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Lancia Delta Integrale',
    description: 'Rallyen munduko ikono bat, bere garaipenengatik eta diseinuagatik ezaguna. Sei aldiz jarraian Munduko Rally Txapelketa irabazi zuen.',
    price: 75000,
    imageUrl: getImage(1),
    imageHint: 'lancia rally',
    category: 'B Taldea',
  },
  {
    id: 2,
    name: 'Audi Quattro S1',
    description: 'Lau gurpileko trakzioa rallyetan sartu zuen iraultzailea. Bere soinu bereizgarriak eta potentziak kondaira bihurtu zuten.',
    price: 250000,
    imageUrl: getImage(2),
    imageHint: 'audi quattro',
    category: 'B Taldea',
  },
  {
    id: 3,
    name: 'Peugeot 205 T16',
    description: 'B taldeko erregea. Arina, indartsua eta arrakastatsua, bi munduko txapelketa irabazi zituen bere ibilbide laburrean.',
    price: 300000,
    imageUrl: getImage(3),
    imageHint: 'peugeot rally',
    category: 'B Taldea',
  },
  {
    id: 4,
    name: 'Lancia Stratos HF',
    description: 'Bertone-k diseinatutako karrozeria futuristarekin eta Ferrari motorrarekin, rallyetarako bereziki sortutako lehen autoa izan zen.',
    price: 500000,
    imageUrl: getImage(4),
    imageHint: 'lancia stratos',
    category: '4. Taldea',
  },
  {
    id: 5,
    name: 'Ford RS200',
    description: 'B taldeko araudietarako eraikia, bere potentzia basatiagatik eta istripu tragiko baten protagonista izateagatik da gogoratua.',
    price: 450000,
    imageUrl: getImage(5),
    imageHint: 'ford rally',
    category: 'B Taldea',
  },
  {
    id: 6,
    name: 'Renault 5 Turbo',
    description: 'Erdiko motorra eta atzeko trakzioa zituen "supermini" bat. Bere maneiagarritasunak eta itxura oldarkorrak oso ezagun egin zuten.',
    price: 150000,
    imageUrl: getImage(6),
    imageHint: 'renault rally',
    category: 'B Taldea',
  },
  {
    id: 7,
    name: 'Subaru Impreza WRC',
    description: '90eko hamarkadako rallyen ikonoa, Colin McRae bezalako pilotuekin lotua. Bere trakzio integralak eta turbo motorrak garaitezina egiten zuten.',
    price: 90000,
    imageUrl: 'https://i.postimg.cc/v8vYtnx9/Subaru-Impreza-WRC99.jpg',
    imageHint: 'subaru impreza',
    category: 'A Taldea',
  },
  {
    id: 8,
    name: 'Mitsubishi Lancer Evo VI',
    description: 'Subaru-ren arerio nagusia. Tommi Mäkinen-ek lau munduko txapelketa jarraian irabazi zituen Lancer-arekin.',
    price: 85000,
    imageUrl: 'https://i.postimg.cc/ry9VN4R4/EVO-VI.jpg',
    imageHint: 'mitsubishi lancer',
    category: 'A Taldea',
  },
  {
    id: 9,
    name: 'Toyota Celica GT-Four',
    description: 'Japoniako beste kondaira bat, hainbat rally garrantzitsu irabazi zituena, Carlos Sainz pilotuarekin.',
    price: 65000,
    imageUrl: 'https://i.postimg.cc/SQGSf9Yz/celica.jpg',
    imageHint: 'toyota celica',
    category: 'A Taldea',
  },
];

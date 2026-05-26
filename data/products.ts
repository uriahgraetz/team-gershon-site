export interface Product {
  id: string;
  nameHe: string;
  nameEn: string;
  price: number;
  image: string;
  colorsHe?: string[];
  colorsEn?: string[];
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: "rdx-shin-guards",
    nameHe: "מגיני שוק RDX",
    nameEn: "RDX Shin Guards",
    price: 280,
    image: "/products/shin-guards.webp",
    colorsHe: ["אדום", "שחור", "כחול"],
    colorsEn: ["Red", "Black", "Blue"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: "rdx-boxing-gloves",
    nameHe: "כפפות RDX",
    nameEn: "RDX Boxing Gloves",
    price: 280,
    image: "/products/boxing-gloves.webp",
    colorsHe: ["אדום", "שחור", "כחול"],
    colorsEn: ["Red", "Black", "Blue"],
    sizes: ["14OZ", "16OZ"],
  },
  {
    id: "rdx-hand-wraps",
    nameHe: "תחבושות RDX",
    nameEn: "RDX Hand Wraps",
    price: 80,
    image: "/products/bandages.webp",
  },
  {
    id: "rdx-groin-guard",
    nameHe: "מגן אשכים RDX",
    nameEn: "RDX Groin Guard",
    price: 80,
    image: "/products/groin-guard.webp",
    sizes: ["M", "L"],
  },
  {
    id: "rdx-elbow-guards",
    nameHe: "מגיני מרפק RDX",
    nameEn: "RDX Elbow Guards",
    price: 150,
    image: "/products/elbow-guard.webp",
    colorsHe: ["שחור"],
    colorsEn: ["Black"],
    sizes: ["L", "XL"],
  },
  {
    id: "silicone-mouth-guard",
    nameHe: "מגן שיניים סיליקון",
    nameEn: "Silicone Mouth Guard",
    price: 60,
    image: "/products/mouth-guard.webp",
  },
  {
    id: "team-gershon-club-shirt",
    nameHe: "חולצת מועדון Team Gershon",
    nameEn: "Team Gershon Club Shirt",
    price: 100,
    image: "/products/club-shirt.webp",
  },
];

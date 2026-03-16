
export const COLORS = [
  { value: "green", label: "Green", hex: "#008000" },
  { value: "red", label: "Red", hex: "#FF0000" },
  { value: "purple", label: "Purple", hex: "#800080" },
  { value: "gold", label: "Gold", hex: "#FFD700" },
  { value: "lavender", label: "Lavender", hex: "#E6E6FA" },
  { value: "yellow", label: "Yellow", hex: "#FFFF00" },
  { value: "sky-blue", label: "Sky Blue", hex: "#87CEEB" },
  { value: "violet", label: "Violet", hex: "#8A2BE2" }, // interpreted as light purple
  { value: "amethyst", label: "Amethyst", hex: "#9966CC" }, // also light purple-ish
  { value: "gray", label: "Gray", hex: "#808080" },
  { value: "ash-gray", label: "Ash Gray", hex: "#B2BEB5" },
  { value: "champagne", label: "Champagne", hex: "#F7E7CE" }, // golden-gray tone
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "semi-stitched"];
export const MATERIALS = ["Cotton", "Wool", "Silk", "Leather", "Linen"];

export const CATEGORY_1 = [
  {
    id: "c1a1e1b1-1234-4d3a-9f0a-abc111def001",
    name: "Sarees",
    slug: "sarees",
    image: "/category/sarees.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b2-1234-4d3a-9f0a-abc111def002",
    name: "Occasion Wear",
    slug: "occasion-wear",
    image: "/category/occasion-wear.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b3-1234-4d3a-9f0a-abc111def003",
    name: "Kurtas",
    slug: "kurtas",
    image: "/category/kurtas.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b4-1234-4d3a-9f0a-abc111def004",
    name: "Kurta Sets",
    slug: "kurta-sets",
    image: "/category/kurta-sets.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b5-1234-4d3a-9f0a-abc111def005",
    name: "Loungewear",
    slug: "loungewear",
    image: "/category/loungewear.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b6-1234-4d3a-9f0a-abc111def006",
    name: "Ethnic Dresses",
    slug: "ethnic-dresses",
    image: "/category/ethnic-dresses.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b7-1234-4d3a-9f0a-abc111def007",
    name: "Co-ord Sets",
    slug: "co-ord-sets",
    image: "/category/co-ord-sets.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b8-1234-4d3a-9f0a-abc111def008",
    name: "Dupattas",
    slug: "dupattas",
    image: "/category/dupattas.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b9-1234-4d3a-9f0a-abc111def009",
    name: "Ready To Wear",
    slug: "ready-to-wear",
    image: "/category/ready-to-wear.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b10-1234-4d3a-9f0a-abc111def010",
    name: "Bottom Wear",
    slug: "bottom-wear",
    image: "/category/bottom-wear.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b11-1234-4d3a-9f0a-abc111def011",
    name: "Festive Collection",
    slug: "festive-collection",
    image: "/category/festive-collection.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b12-1234-4d3a-9f0a-abc111def012",
    name: "Winter Wear",
    slug: "winter-wear",
    image: "/category/winter-wear.jpg?w=300&h=300",
  },
];

export const moreSidebarCategories = [
  {
    id: 11,
    name: "Clearance",
    slug: "clearance",
  },
];

export const CATEGORY_2 = [
  {
    id: "7f5a8f99-fbdc-472b-b43a-cc9dc12e1ddd",
    name: "Summer Vibes",
    slug: "summer-vibes",
    image: "/categoryimage.png",
  },
  {
    id: "cbaf4d2b-9fd2-465b-b55e-9c8734ae2eee",
    name: "Trendy",
    slug: "trendy",
    image: "/categoryimage.png",
  },
  {
    id: "52b3df7c-e8b5-4f4a-b2c7-8423dd0f4fff",
    name: "Festival Season",
    slug: "festival-season",
    image: "/categoryimage.png",
  },
  {
    id: "9f2ce7f1-43aa-4a0d-8cfa-b7dc12ab1aaa",
    name: "Casual",
    slug: "casual",
    image: "/categoryimage.png",
  },
];



export const NAVBAR_CATEGORY_RIBBON = [
  "Mens wear",
  "Womens Wear",
  "Electronics",
  "Grocery",
  "Mobiles/Tablets",
  "Beauty",
  "Food",
  "Perfumes",
  "Laptop",
]

export const pageSize = 4
// export const tempUserId = "c263327b-3958-4fe8-b0b9-1ca3711f7c9c"
// export const tempUserId = userId
export const canResendOTPInterval = 10; // in seconds
export const isUUID = (identifier: string) => /^[0-9a-fA-F-]{36}$/.test(identifier);

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  COMPLETED: "completed",
  CANCELED: "canceled",
} as const;

export type OrderStatus =
  (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];


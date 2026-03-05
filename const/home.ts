import { Headphones, Lock, RotateCcw, Truck } from "lucide-react";

export const ORDERNOW_CARD_DATA = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "On order above $100",
    },
    {
        icon: RotateCcw,
        title: "Easy Return",
        description: "30-day return policy",
    },
    {
        icon: Lock,
        title: "Secure Payment",
        description: "100% protected",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Dedicated assistance",
    },
];

export const PROMO_CARDS = [
    {
        title: ["Everyday Essentials,", "Elevated."],
        description: "Perfume, Milk, Eggs & more",
        bgColor: "bg-[#00CCEE]",
        image: "/shoe-promo.png",
    },
    {
        title: ["Find Grocery At", "Lowest Prices"],
        description: "Fruits, Butter, Oil & more",
        bgColor: "bg-[#FFCC00]",
        image: "/items-float.png",
    },
    {
        title: ["Find Your Fit"],
        description: "Shoes, Sandals, Crocks & more",
        bgColor: "bg-[#88DD66]",
        image: "/cart-promo.png",
    },
];
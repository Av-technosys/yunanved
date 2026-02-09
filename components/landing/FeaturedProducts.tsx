import React from 'react';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  // Group 1: Dark Footer (Row 1)
  { id: 1, name: "Macbook M2 15\"", price: "$899", category: "Pink, 256 GB", rating: 5, reviews: 1021, image: "/product1.png", group: 1 },
  { id: 2, name: "Apple Watch Series 7", price: "$399", category: "Dark Green", rating: 4, reviews: 1021, image: "/product2.png", group: 1 },
  { id: 3, name: "iPhone 17 Pro", price: "$1199", category: "Orange, 256 GB", rating: 5, reviews: 3021, image: "/product3.png", group: 1 },
  { id: 4, name: "Headphone", price: "$299", category: "White", rating: 4, reviews: 850, image: "/product1.png", group: 1 },

  // Group 2: Light Footer / Dark Buttons (Row 2)
  { id: 5, name: "Sneakers", price: "$129", category: "Blue", rating: 5, reviews: 643, image: "/product1.png", group: 2 },
  { id: 6, name: "Cotton Shirt", price: "$49", category: "Black", rating: 4, reviews: 1203, image: "/product2.png", group: 2 },
  { id: 7, name: "Fortune Chakki Atta", price: "$15", category: "10kg", rating: 5, reviews: 402, image: "/product3.png", group: 2 },
  { id: 8, name: "Slimfit Jeans", price: "$79", category: "Black", rating: 5, reviews: 982, image: "/product2.png", group: 2 },

  // Group 3: Clean White / Outlined (Row 3)
  { id: 9, name: "Dark Chocolate", price: "$5", category: "100 gm", rating: 5, reviews: 4210, image: "/product1.png", group: 3 },
  { id: 10, name: "FaceWash", price: "$12", category: "250 ml", rating: 4, reviews: 231, image: "/product2.png", group: 3 },
  { id: 11, name: "Peanut Butter", price: "$8", category: "500 gm", rating: 4, reviews: 1550, image: "/product3.png", group: 3 },
  { id: 12, name: "Farmley Walnuts", price: "$22", category: "500 gm", rating: 4, reviews: 884, image: "/product3.png", group: 3 },
];

export function FeaturedProducts() {
  return (
    <section className="bg-[#FFF8E7] px-4 md:px-10 py-16 rounded-[3.5rem] mx-4 my-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">Featured Products</h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Discover our newest arrivals, thoughtfully designed to elevate everyday style with purpose and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => {
            // Group 1 Styling (Dark Footer)
            if (product.group === 1) {
              return (
                <Card key={product.id} className="overflow-hidden border-none rounded-3xl shadow-sm bg-white hover:shadow-xl transition-shadow">
                  <div className="h-52 flex items-center justify-center p-3">
                    <img src={product.image} alt={product.name} className="object-contain h-full" />
                  </div>
                  <div className="bg-[#414141] p-4 text-white">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm">{product.name}</h3>
                      <span className="text-[10px] opacity-60">({product.category})</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#FFC107" stroke="none" />)}
                      <span className="text-[10px] opacity-60">({product.reviews})</span>
                    </div>
                    <p className="text-[10px] text-green-400 mb-2">Free Shipping</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">{product.price}</span>
                      <Button className="bg-white text-black hover:bg-gray-200 rounded-lg text-xs h-8 px-4 font-bold">Add to Cart</Button>
                    </div>
                  </div>
                </Card>
              );
            }

            // Group 2 Styling (Light Footer / Dark Buttons)
            if (product.group === 2) {
              return (
                <Card key={product.id} className="overflow-hidden border-none rounded-3xl shadow-sm bg-white hover:shadow-xl transition-shadow">
                  <div className="h-52 flex items-center justify-center p-3">
                    <img src={product.image} alt={product.name} className="object-contain h-full" />
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm text-black">{product.name}</h3>
                      <span className="text-[10px] text-gray-400">({product.category})</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#FFC107" stroke="none" />)}
                      <span className="text-[10px] text-gray-400">({product.reviews})</span>
                    </div>
                    <p className="text-[10px] text-green-500 mb-2">Free Shipping</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-black">{product.price}</span>
                      <Button className="bg-[#414141] text-white hover:bg-black rounded-lg text-xs h-8 px-4 font-bold">Add to Cart</Button>
                    </div>
                  </div>
                </Card>
              );
            }

            // Group 3 Styling (Clean White / Outlined)
            return (
              <Card key={product.id} className="overflow-hidden border-none rounded-3xl shadow-sm bg-white hover:shadow-xl transition-shadow">
                <div className="h-52 flex items-center justify-center p-3">
                  <img src={product.image} alt={product.name} className="object-contain h-full" />
                </div>
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm text-black">{product.name}</h3>
                    <span className="text-[10px] text-gray-400">({product.category})</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#FFC107" stroke="none" />)}
                    <span className="text-[10px] text-gray-400">({product.reviews})</span>
                  </div>
                  <p className="text-[10px] text-green-500 mb-2">Free Shipping</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-black">{product.price}</span>
                    <Button variant="outline" className="border-gray-200 text-gray-600 rounded-lg text-xs h-8 px-4 hover:bg-gray-50">Add to Cart</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button className="bg-[#414141] hover:bg-black text-white rounded-full px-12 py-6 text-lg font-medium transition-all">
            Explore All
          </Button>
        </div>
      </div>
    </section>
  );
}
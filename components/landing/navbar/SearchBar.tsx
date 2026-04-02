/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition, useEffect } from "react";
import { Button, Input } from "@/components/ui";
import { LayoutGrid, Search } from "lucide-react";
import { searchProducts } from "@/helper";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";

export function SearchWithIcon() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setShowDropdown(true);

    const delayDebounce = setTimeout(() => {
      startTransition(async () => {
        const res = await searchProducts(query);
        setResults(res);
      });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleNavigate = (item: any) => {
    setShowDropdown(false);
    setQuery("");

    if (item.type === "product") {
      router.push(`/product/${item.slug}`);
    } else {
      router.push(`/category/${item.slug}`);
    }
  };

  const products = results.filter((r) => r.type === "product");
  const categories = results.filter((r) => r.type === "category");

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for Products, Brands & More"
          className="flex-1 h-11 rounded-full pl-6 text-sm shadow-sm"
        />

        <Button size="icon" className="h-11 w-11 rounded-full">
          <Search size={18} />
        </Button>
      </div>

      {showDropdown && (
        <div className="absolute top-14 w-full bg-white border shadow-xl rounded-2xl mt-2 z-50 overflow-hidden">
          {isPending && (
            <div className="p-4 text-sm text-gray-500">Searching...</div>
          )}

          {!isPending && results.length === 0 && (
            <div className="p-4 text-sm text-gray-500">No results found</div>
          )}

          {!isPending && results.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {products.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
                    Products
                  </p>

                  {products.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNavigate(item)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                    >
                      <Image
                        src={`${NEXT_PUBLIC_S3_BASE_URL}/${item.bannerImage}`}
                        alt={item.name}
                        height={50}
                        width={50}
                        className="w-10 h-10 rounded-md object-cover border"
                      />

                      <p className="text-sm font-medium line-clamp-1">
                        {item.name}
                      </p>

                      <span className="ml-auto text-gray-400 text-xs">→</span>
                    </div>
                  ))}
                </div>
              )}

              {categories.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
                    Categories
                  </p>

                  {categories.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNavigate(item)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100">
                        <LayoutGrid size={18} className="text-gray-500" />
                      </div>

                      <p className="text-sm font-medium">{item.name}</p>

                      <span className="ml-auto text-gray-400 text-xs">→</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

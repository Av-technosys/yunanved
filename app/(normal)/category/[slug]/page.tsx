/* eslint-disable @typescript-eslint/no-explicit-any */


import CategoryView from "@/components/category/CategoryView";
import { Button } from "@/components/ui";
import { FilterSidebar } from "../filterSidebar";

import { getAllProductsByCategorySlug, getCategoryBySlug } from "@/helper/category/action";
import { SidebarFilterWeb } from "./SidebarFilter";
import { getCategoryFilteredArray } from "@/helper/getCommaSepratedArray";


interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async (props: PageProps) => {
  const { slug } = await props.params;
  const { cat } = await props.searchParams;

  const catArray = getCategoryFilteredArray({ value: cat });


  const [products, categoryInfo] = await Promise.all([
    getAllProductsByCategorySlug([slug && slug, ...catArray]),
    getCategoryBySlug(slug),
  ]);

  if (!categoryInfo) {
    return (
      <>
        <div className="p-20 text-center">Category not found</div>
      </>
    );
  }

  return (
    <>

      <div className="max-w-6xl  mx-auto grid grid-cols-4 gap-4 my-5 px-2 md:px-4 lg:px-0 ">
        <SidebarFilterWeb />
        <div className="col-span-4 md:col-span-3 w-full flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            <Button
              variant={"outline"}
              className="text-gray-600 block md:hidden font-semibold "
            >
              <FilterSidebar />
            </Button>
            <div className="text-black hidden  md:block font-bold text-lg">
              {categoryInfo.name}
            </div>
            <div className="text-gray-600">Sort by : Latest Product</div>
          </div>
          <CategoryView
            products={products}
            slug={slug}
          />
        </div>
      </div>
    </>
  );
};

export default Page;

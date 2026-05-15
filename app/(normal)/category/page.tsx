import CategoryView from "@/components/category/CategoryView";
import { FilterSidebar } from "./filterSidebar";

import {
  getAllProductsByCategorySlug,
  getCategories,
} from "@/helper/category/action";

import { SidebarFilterWeb } from "./SidebarFilter";

export const revalidate = 10;

type RouteSearchParams = Record<string, string | string[] | undefined>;

type CategoryFilter = {
  id: string;
  name: string;
  slug: string;
};

function parseFilters(searchParams: RouteSearchParams) {
  const cat =
    typeof searchParams.cat === "string"
      ? searchParams.cat.split(",")
      : [];

  const stock = cat.filter((item: string) =>
    ["in-stock", "out-of-stock"].includes(item)
  );

  const realCat = cat.filter(
    (item: string) => !["in-stock", "out-of-stock"].includes(item)
  );

  const min =
    searchParams.min !== undefined && !Number.isNaN(Number(searchParams.min))
      ? Number(searchParams.min)
      : undefined;

  const max =
    searchParams.max !== undefined && !Number.isNaN(Number(searchParams.max))
      ? Number(searchParams.max)
      : undefined;

  return { cat: realCat, stock, min, max };
}

interface CategoryPageProps {
  searchParams: Promise<RouteSearchParams>;
}

const Page = async ({ searchParams }: CategoryPageProps) => {
  const sp = await searchParams;

  const filters = parseFilters(sp);
  const selectedCategorySlugs = filters.cat;

  const [products, allCategories] = await Promise.all([
    getAllProductsByCategorySlug(
      selectedCategorySlugs,
      filters
    ),
    getCategories(),
  ]);

  const categories = allCategories.map(
    (category): CategoryFilter => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
    })
  );

  const selectedCategories = categories.filter((category) =>
    selectedCategorySlugs.includes(category.slug)
  );
  const heading =
    selectedCategories.length === 1 ? selectedCategories[0].name : "All Categories";
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-4 gap-4 my-5 px-2 md:px-4 lg:px-0">
      <div className="hidden md:block col-span-1">
        <SidebarFilterWeb categories={categories} />
      </div>
      <div className="col-span-4 md:col-span-3 w-full flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <div className="md:hidden">
            <FilterSidebar categories={categories} />
          </div>

          <div className="text-black hidden md:block font-bold text-lg">
            {heading}
          </div>

          {/* <div className="text-gray-600">
            Sort by : Latest Product
          </div> */}
        </div>

        <CategoryView products={products} />
      </div>
    </div>
  );
};

export default Page;

import { useEffect, useState } from "react";
import { Label } from "./ui/label"
import MultipleSelector from "./ui/multi-select"
import { getCategories } from "@/helper";
import { Loader2 } from "lucide-react";

export const MultiCategorySelect = ({ selectedCategory, setSelectedCategory }: any) => {

    const [categories, setCategories] = useState<any[]>();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function load() {
            setLoading(true);
            const data = await getCategories();
            const categoriesValue = data.map((category: any) => ({
                label: category.name,
                value: category.id
            }));
            setCategories(categoriesValue);
            setLoading(false);
        }
        load();
    }, []);



    return (
        <div className="space-y-2 pl-1">
            <Label>Category</Label>
            {loading ? <Loader2 size={20} className="animate-spin" /> : <MultipleSelector
                commandProps={{
                    label: 'Select categories'
                }}
                onChange={(value) => setSelectedCategory(value)}
                value={selectedCategory}
                defaultOptions={categories}
                placeholder='Select categories'
                hideClearAllButton
                hidePlaceholderWhenSelected
                emptyIndicator={<p className='text-center text-sm'>No results found</p>}
                className='w-full'
            />}
        </div>
    )
}
"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
    Checkbox,
    Label,
    useDebounce,
} from "@/components/ui";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui";

import { Separator } from "@/components/ui";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui";
import { Slider } from "@/components/ui";

import { FILTERS } from "@/const/category";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategoryFilteredArray } from "@/helper/getCommaSepratedArray";
import { useEffect, useState } from "react";


export function SidebarFilterWeb() {
    const search = useSearchParams();
    const router = useRouter();
    const selectedCategory = getCategoryFilteredArray({ value: search.get("cat") || "" });
    const [loading, setLoading] = useState(false);

    const [selectedCategoriesClientArray, setSelectedCategoriesClientArray] = useState<string[]>(selectedCategory);

    function handleCheckboxClick({ item }: { item: string }) {

        const newSelectedCategory = selectedCategoriesClientArray.includes(item) ? selectedCategoriesClientArray.filter((i) => i !== item) : [...selectedCategoriesClientArray, item];
        setSelectedCategoriesClientArray(newSelectedCategory);

    }


    const filteredCategoryDebounceValue = useDebounce(selectedCategoriesClientArray, 700);

    useEffect(() => {
        const newSearchParams = new URLSearchParams(search.toString());
        newSearchParams.set("cat", filteredCategoryDebounceValue.join(","));
        router.push(`?${newSearchParams.toString()}`);
    }, [filteredCategoryDebounceValue])

    return (
        <div className="col-span-1 hidden md:flex flex-col  gap-3">
            <div className="sticky top-4">
                <Card>
                    <CardContent>
                        <CardTitle className="flex w-full my-5 items-center justify-between">
                            <strong>Filter</strong>
                            <strong>
                                <Filter />
                            </strong>
                        </CardTitle>

                        <Separator />
                        <CardDescription>

                            <Accordion
                                type="single"
                                collapsible
                                defaultValue="fashion"
                                className="max-w-lg"
                            >
                                {FILTERS.map((filter) => (
                                    <AccordionItem key={filter.key} value={filter.key}>
                                        <AccordionTrigger>{filter.title}</AccordionTrigger>

                                        <AccordionContent className="space-y-3">
                                            {filter.options.map((item) => (
                                                <div key={`${filter.key}-${item}`} className="flex items-center space-x-2">
                                                    <Checkbox disabled={loading} onClick={() => handleCheckboxClick({ item })} checked={selectedCategoriesClientArray.includes(item)} id={`${filter.key}-${item}`} />
                                                    <Label className="capitalize" htmlFor={`${filter.key}-${item}`}>{item}</Label>
                                                </div>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}

                                {/* Price (separate because it's a slider) */}
                                <AccordionItem value="price">
                                    <AccordionTrigger>Price</AccordionTrigger>
                                    <AccordionContent>
                                        <Slider
                                            defaultValue={[50, 200]}
                                            max={1000}
                                            step={5}
                                            className="w-full my-4"
                                        />
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>₹50</span>
                                            <span>₹1000</span>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardDescription>
                        <Separator />
                        <CardFooter>
                            <div className="w-full flex flex-col gap-3 my-5">
                                <Button className="w-full text-base md:text-xs lg:text-base bg-(--bg-product-button) hover:bg-(--bg-product-button-hover)">
                                    Apply Filter
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full text-base md:text-xs lg:text-base text-(--bg-product-button) border-(--bg-product-button)"
                                >
                                    Clear Filter
                                </Button>
                            </div>
                        </CardFooter>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
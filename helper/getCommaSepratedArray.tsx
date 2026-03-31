import { FILTERS } from "@/const/category";

export function getCategoryFilteredArray({ value }: { value: string | string[] | undefined }) {
    const ALL_Categories = FILTERS.reduce((acc: string[], curr) => [...acc, ...curr.options], []);
    let catArray: string[] = [];
    if (typeof value === "string") {
        catArray = value.split(",");
    }
    if (Array.isArray(catArray)) {
        catArray = catArray.filter((item) => ALL_Categories.includes(item));
        return catArray;
    }
    return [];
}

export function getCommaSeparatedArray(value: string | string[] | undefined) {
    if (typeof value === "string") {
        return value.split(",");
    }
    return [];
}
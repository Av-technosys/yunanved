/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { SubHeading } from "@/components/font";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRODUCT_ATTRIBUTES } from "@/const/productAttribute";
import { useState } from "react";
import { saveProductAttributes } from "@/helper/index";;
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getProductAttributes } from "@/helper/index";;



export default function ProductDetails() {
    type AttributeValue = {
        id?: string;
        value: string;
    };




    const { id } = useParams<{ id: string }>();
    const searchParams = useSearchParams();
    const isEdit = searchParams.get("edit") === "true";


    const [productAttributes, setProductAttributes] = useState<Record<string, AttributeValue>>({});

    function handleValueChange(attribute: string, value: string, id?: string) {
        setProductAttributes((prev) => ({
            ...prev,
            [attribute]: {
                id: prev[attribute]?.id ?? id,
                value,
            },
        }));
    }

    async function handleSubmit() {
        const payload = Object.entries(productAttributes)
            .map(([attribute, { value }]) => ({
                attribute,
                value: value.trim(),
            }))
            .filter(a => a.value.length > 0);

        await saveProductAttributes(id, payload);
    }

    useEffect(() => {
        if (!isEdit) return;

        async function load() {
            const attrs = await getProductAttributes(id);

            const mapped = Object.fromEntries(
                attrs.map((a: any) => [
                    a.attribute,
                    { id: a.id, value: a.value }
                ])
            );

            setProductAttributes(mapped);
        }

        load();
    }, [id, isEdit]);

    return (
        <div className=" max-w-3xl mx-auto space-y-8">
            <Button onClick={handleSubmit}>Submit</Button>
            {
                PRODUCT_ATTRIBUTES.map((productAttributeItem, idx) => {
                    return (
                        <div key={idx} className=" space-y-4">
                            <SubHeading className=" font-medium">{productAttributeItem.title}</SubHeading>
                            <div className=" space-y-3 grid grid-cols-2 gap-4">
                                {
                                    productAttributeItem.elements.map((element, idx) => {
                                        return (
                                            <div key={element.toString()} className=" flex  w-full gap-2">

                                                <div className=" w-full space-y-1">
                                                    <Label>{element}</Label>
                                                    <Input
                                                        value={productAttributes[element]?.value ?? ""}
                                                        onChange={(e) =>
                                                            handleValueChange(element, e.target.value, productAttributes[element]?.id)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    )
                })
            }
        </div>
    );
};
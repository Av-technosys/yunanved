"use client"
import { SubHeading } from "@/components/font";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRODUCT_ATTRIBUTES } from "@/const/productAttribute";
import { useState } from "react";

export default function ProductDetails() {
    type AttributeValue = {
        id?: string;
        value: string;
    };

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

    const handleSubmit = () => {
        const payload = Object.entries(productAttributes).map(
            ([attribute, { id, value }]) => ({
                id,
                attribute,
                value,
            })
        );
        console.log(payload);
    }

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
                                                        value={productAttributes[element]?.value}
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
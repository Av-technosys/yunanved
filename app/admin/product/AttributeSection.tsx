/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { Label } from "@/components/ui";
import { Input } from "@/components/ui";
import { PRODUCT_ATTRIBUTES } from "@/const/productAttribute";

type Props = {
  productAttributes: Record<string, { value: string }>;
  handleValueChange: (attribute: string, value: string) => void;
};

export default function AttributeSection({ productAttributes, handleValueChange }: Props) {
  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
      </CardHeader>

      <CardContent>
        <Accordion type="multiple" className="space-y-4 max-sm:bg-black">
          {PRODUCT_ATTRIBUTES.map((group, idx) => (
            <AccordionItem key={idx} value={`attr-${idx}`} className="border rounded-xl px-4">
              <AccordionTrigger>{group.title}</AccordionTrigger>

              <AccordionContent>
<div className="grid gap-4 md:grid-cols-2">
                    {group.elements.map((element) => (
<div
  key={element}
  className="flex items-center justify-between gap-4 md:flex-col md:items-start"
>
  <Label className="text-sm md:mb-1">{element}</Label>

  <Input
    className="w-1/2 md:w-full"
    value={productAttributes[element]?.value ?? ""}
    onChange={(e) => handleValueChange(element, e.target.value)}
  />
</div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

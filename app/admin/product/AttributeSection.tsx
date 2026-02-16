/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
        <Accordion type="multiple" className="space-y-4">
          {PRODUCT_ATTRIBUTES.map((group, idx) => (
            <AccordionItem key={idx} value={`attr-${idx}`} className="border rounded-xl px-4">
              <AccordionTrigger>{group.title}</AccordionTrigger>

              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {group.elements.map((element) => (
                    <div key={element} className="space-y-1">
                      <Label>{element}</Label>
                      <Input
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

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
    return (
        <section className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground mt-2">
                    Everything you need to know.
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Where is my order?</AccordionTrigger>
                    <AccordionContent>
                        You can track your order by logging into your account or checking the shipping confirmation email we sent you. Orders typically ship within 1-2 business days.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                    <AccordionContent>
                        We offer a 30-day return policy for all unused items in their original packaging. Please visit our Returns page to initiate a return.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                    <AccordionContent>
                        Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location and are calculated at checkout.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How do I contact support?</AccordionTrigger>
                    <AccordionContent>
                        You can reach our customer support team via email at support@yunanved.com or by calling +1 (555) 123-4567 during business hours (Mon-Fri, 9am-6pm EST).
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}

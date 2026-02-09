import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    id: "item-1",
    question: "How long does delivery take?",
    answer:
      "Orders are usually delivered within 3–5 business days. Metro cities often arrive faster, while remote locations may take a little longer depending on courier availability."
  },
  {
    id: "item-2",
    question: "Can I return or exchange a product?",
    answer:
      "Yes. You can request a return or exchange within 7 days of delivery as long as the item is unused and in its original packaging."
  },
  {
    id: "item-3",
    question: "Do you offer Cash on Delivery?",
    answer:
      "We support Cash on Delivery for most locations. Some remote pincodes may require prepaid payment due to courier restrictions."
  },
  {
    id: "item-4",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you’ll receive a tracking link via SMS and email. You can also check the status anytime inside your account dashboard."
  }
];

export function FAQ() {
  return (
    <section className=" mx-auto min-w-4xl py-10 px-4">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-lg text-slate-600">
          Everything you need to know
        </p>
      </div>

      {/* Accordion Section */}
      <Accordion type="single" collapsible className="w-full space-y-4">
      {faqData.map((faq) => (
  <AccordionItem 
    key={faq.id} 
    value={faq.id}
    className="border rounded-xl px-6 py-1 border-slate-200 shadow-sm"
  >
    <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline text-left">
      {faq.question}
    </AccordionTrigger>

    <AccordionContent className="text-slate-600 leading-relaxed">
      {faq.answer}
    </AccordionContent>
  </AccordionItem>
))}

      </Accordion>
    </section>
  )
}
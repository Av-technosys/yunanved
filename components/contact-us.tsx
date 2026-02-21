"use client";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MapPin, Phone, Send, SendHorizontal } from "lucide-react";

import LocationImage from "../public/location.png";
import Image from "next/image";
import { sendContactMessage } from "@/helper/contact-us/action";
import { toast } from "sonner";
import { useTransition } from "react";
import { contactUsSchema } from "@/validation/contactUsSchema";

const ContactUs = () => {
  const [isPending, startTransition] = useTransition();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const contactData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    const result = contactUsSchema.safeParse(contactData);

    if (!result.success) {
      const firstError = result.error.issues[0].message;
      toast.error(firstError, {
        className: "!border !border-red-500 !text-red-500",
      });
      return;
    }

    startTransition(async () => {
      const response = await sendContactMessage(contactData);
      if (response.success == true) {
        toast.success(response.message);
        e.target.reset();
      } else {
        toast.error(response.message);
      }
    });
  };
  return (
    <div className="my-5">
      <div className="max-w-5xl px-2 flex flex-col gap-2 md:px-4 lg:px-0 mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold">Get in Touch</h1>
        <p className="max-w-md text-gray-600">
          Have a question about an order or want to learn more about our
          products? Our friendly team is here to help you.
        </p>
      </div>
      <div className="max-w-5xl px-2 md:px-4 lg:px-0 mx-auto grid grid-cols-1 md:grid-cols-2  my-5 gap-10">
        <div className="col-span-1">
          <Card className="px-5">
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Full Name</Label>
                <Input
                  name="name"
                  className="text-black bg-[#F8FAFC]"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email-1">Email Address</Label>
                <Input
                  name="email"
                  className="text-black bg-[#F8FAFC]"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone-1">Contact Number</Label>
                <Input
                  name="phone"
                  type="number"
                  className="text-black bg-[#F8FAFC]"
                  placeholder="Enter your contact number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone-1">Message</Label>
                <Textarea
                  name="message"
                  className="text-black h-32 overflow-y-auto bg-[#F8FAFC]"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className={`bg-[#1A2E35] w-[200px] flex gap-2 items-center text-white py-3 px-4 rounded-full mt-4 ${isPending && "opacity-50 cursor-not-allowed"} `}
              >
                {isPending ? "Sending..." : "Send Message"}{" "}
                <SendHorizontal size={18} />
              </button>
            </form>
          </Card>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-between px-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-start  gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#424242]">
                <MapPin size={20} color="white" />
              </div>
              <div className="max-w-xs   flex flex-col gap-2">
                <span className="text-base font-bold">Our Office</span>
                <p className="text-gray-600 text-sm">
                  123 Ecommerce Way, Suite 100 San Francisco, CA 94103, USA
                </p>
              </div>
            </div>
            <div className="flex items-start  gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#424242]">
                <Phone size={20} color="white" />
              </div>
              <div className="max-w-xs   flex flex-col gap-1">
                <span className="text-base font-bold">Phone Support</span>
                <p className="text-gray-600 text-sm">
                  Monday - Friday, 9am - 5pm EST
                </p>
                <p className="text-blue-500 text-sm">+1 (555) 000-0000</p>
              </div>
            </div>
            <div className="flex items-start  gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#424242]">
                <MapPin size={20} color="white" />
              </div>
              <div className="max-w-xs  flex flex-col gap-1">
                <span className="text-base font-bold">Email Us</span>
                <p className="text-gray-600 text-sm">
                  Expect a reply within 24 hours.
                </p>
                <p className="text-blue-500 text-sm">support@brand.com</p>
              </div>
            </div>
          </div>
          <div className="w-full mt-3 md:mt-0 lg:w-3/4 relative h-64 ">
            <Image
              src={LocationImage}
              alt="Location"
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

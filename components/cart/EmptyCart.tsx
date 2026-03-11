import Image from "next/image";
import emptyCart from "../../public/emptycart.png";
import { Button } from "../ui/button";
import Link from "next/link";

export  function EmptyCart() {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="flex flex-col items-center gap-4 ">
        <Image
          src={emptyCart}
          alt={"empty cart"}
          width={100}
          height={70}
          className="rounded-lg bg-gray-100"
        />
        <h1 className="font-bold text-xl">Your Cart is Empty</h1>
        <p className="text-gray-600">
          Looks like your cart is empty. Start shopping to add items
        </p>
        <Button className="bg-teal-700 text-white py-2 px-3 rounded-full font-medium hover:bg-teal-800">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    </div>
  )
}
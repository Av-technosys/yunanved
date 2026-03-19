import { Card, CardContent, Button } from "@/components/ui";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui";
import Link from "next/link";

type Address = {
  id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

export default function AddressSelector({
  addresses,
  selected,
  setSelected,
  loading,
}: {
  addresses: Address[];
  selected: string | null;
  setSelected: (id: string) => void;
  loading: boolean;
}) {
  return (
    <div className="col-span-3 md:col-span-2 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Checkout</h2>

        <Link href="/dashboard/address" className="text-sm">
          + Add New Address
        </Link>
      </div>

      <h3 className="text-sm font-semibold text-gray-700">Shipping Address</h3>

      <RadioGroup
        value={selected ?? ""}
        onValueChange={setSelected}
        className="space-y-3"
      >
        {loading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))
        ) : addresses.length > 0 ? (
          addresses.map((item) => {
            const isActive = selected === item.id;

            return (
              <Card
                key={item.id}
                className={`transition border cursor-pointer
                ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              >
                <CardContent className="p-4 flex gap-3 items-start justify-between">
                  <div className="w-full flex gap-3 items-start">
                    <RadioGroupItem
                      value={item.id}
                      id={item.id}
                      className="mt-1"
                    />

                    <Label
                      htmlFor={item.id}
                      className="flex flex-col items-start gap-1 cursor-pointer w-full"
                    >
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {item.addressLine1}
                        </p>

                        {item.isDefault && (
                          <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}

                        {!item.isDefault && (
                          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            Saved
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600">
                        {item.addressLine2}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.city}, {item.state} - {item.pincode}
                      </p>
                    </Label>
                  </div>

                  <Button variant="link" size="sm">
                    Edit
                  </Button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div>No address found..</div>
        )}
      </RadioGroup>
    </div>
  );
}

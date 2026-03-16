import { Card, CardContent, Button } from "@/components/ui";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui";

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

    <RadioGroup value={selected ?? ""} onValueChange={setSelected}>
      {loading
        ? [...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4 h-20 bg-gray-200 rounded" />
            </Card>
          ))
        : addresses.map((item) => {
            const active = selected === item.id;

            return (
              <Card
                key={item.id}
                className={`cursor-pointer ${
                  active ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <CardContent className="p-4 flex justify-between">
                  <div className="flex gap-3">
                    <RadioGroupItem value={item.id} id={item.id} />

                    <Label htmlFor={item.id} className="flex flex-col">
                      <span className="font-semibold">
                        {item.addressLine1}
                      </span>

                      <span className="text-sm text-gray-600">
                        {item.addressLine2}
                      </span>

                      <span className="text-sm text-gray-500">
                        {item.city}, {item.state} - {item.pincode}
                      </span>
                    </Label>
                  </div>

                  <Button variant="link" size="sm">
                    Edit
                  </Button>
                </CardContent>
              </Card>
            );
          })}
    </RadioGroup>
    </div>
  );
}
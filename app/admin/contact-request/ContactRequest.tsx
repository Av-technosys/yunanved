"use client";

import { useEffect, useState, useTransition } from "react";
import { Search } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { ProductPagination } from "@/components/pagination";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";

export type ContactMessage = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  message: string | null;
  createdAt: Date | string;
};

interface Props {
  data: ContactMessage[];
  total: number;
  currentPage: number;
  pageSize: number;
}

export default function ContactMessagesClient({
  data,
  total,
  currentPage,
  pageSize,
}: Props) {
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);

  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 800);
  const updateQuery = useUpdateQuery();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      updateQuery("search", debouncedSearch);
    });
  }, [debouncedSearch]);

  const startIndex = (currentPage - 1) * pageSize;

  return (
    <div className="w-full">
      <Card className="border-none shadow-md rounded-none">
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>
            Manage all customer contact requests here
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-3 mb-6">
            <div className="w-full max-w-xl">
              <InputGroup className="flex items-center bg-white rounded-full py-2 shadow-none">
                <InputGroupAddon>
                  <Search className="text-gray-500" />
                </InputGroupAddon>

                <InputGroupInput
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  type="text"
                  placeholder="Search by name or email"
                  className="bg-transparent focus:outline-none w-32 focus:w-56 transition-all duration-200"
                />
              </InputGroup>
            </div>
          </div>

          <div className="relative mt-8">
            {isPending && (
              <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-[1px]" />
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-end">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{item.name || "-"}</TableCell>
                      <TableCell>{item.email || "-"}</TableCell>
                      <TableCell>{item.phone || "-"}</TableCell>
                      <TableCell>{item.location || "-"}</TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString("en-IN")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedMessage(item)}
                        >
                          View Message
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No contact messages found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <ProductPagination currentPage={currentPage} totalPages={total} />
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Message</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <p className="text-sm text-slate-500">
              From: {selectedMessage?.name || "-"}
            </p>

            <p className="whitespace-pre-wrap text-sm">
              {selectedMessage?.message || "No message"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

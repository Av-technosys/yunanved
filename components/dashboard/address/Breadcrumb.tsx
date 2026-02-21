"use client";

import { ChevronRight } from "lucide-react";

type ViewType = "list" | "add" | "edit";

type Props = {
  view: ViewType;
};

export default function Breadcrumb({ view }: Props) {
  const currentLabel = getLabel(view);

  return (
    <nav className="flex items-center gap-1 text-[13px] text-gray-500 p-2">
      <span>Home</span>
      <ChevronRight size={12} />

      <span>Account</span>
      <ChevronRight size={12} />

      <span className="font-medium text-gray-800">
        {currentLabel}
      </span>
    </nav>
  );
}

function getLabel(view: ViewType) {
  switch (view) {
    case "add":
      return "Add New Address";
    case "edit":
      return "Manage Address";
    default:
      return "Address";
  }
}
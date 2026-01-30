import { cn } from "@/lib/utils";
import React from "react";

export const P = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return (
    <p className={cn("font-sans text-base", className)} {...props}>
      {children}
    </p>
  );
};

export const Span = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={cn("font-sans text-base", className)} {...props}>
      {children}
    </span>
  );
};

export const Heading = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return (
    <h1 className={cn("font-sans text-2xl", className)} {...props}>
      {children}
    </h1>
  );
};

export const SubHeading = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return (
    <h2 className={cn("font-sans text-xl", className)} {...props}>
      {children}
    </h2>
  );
};
import React from "react";
import { cn } from "@/lib/utils";

/**
 * Base textarea component with styling consistent with the Retro UI kit.
 */

/**
 * Styled textarea element.
 */
export function Textarea({
  type = "text",
  placeholder = "Enter text...",
  className = "",
  ...props
}) {
  return (
    <textarea
      placeholder={placeholder}
      rows={4}
      className={cn(
        "px-4 py-2 w-full border-2 border-border shadow-md transition focus:outline-hidden focus:shadow-xs placeholder:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * RetroUI styled alert component with title and description sub-components.
 */
import { HtmlHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Text } from "@/components/retroui/Text";

const alertVariants = cva("relative w-full border-2 p-4", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      solid: "bg-black text-white",
    },
    status: {
      error: "bg-red-300 text-red-800 border-red-800",
      success: "bg-green-300 text-green-800 border-green-800",
      warning: "bg-yellow-300 text-yellow-800 border-yellow-800",
      info: "bg-blue-300 text-blue-800 border-blue-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface IAlertProps
  extends HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

/**
 * Base alert container accepting style variants.
 */
const Alert = ({ className, variant, status, ...props }: IAlertProps) => (
  <div
    role="alert"
    className={cn(alertVariants({ variant, status }), className)}
    {...props}
  />
);
Alert.displayName = "Alert";

type IAlertTitleProps = HtmlHTMLAttributes<HTMLHeadingElement>;
/** Heading section of the alert. */
const AlertTitle = ({ className, ...props }: IAlertTitleProps) => (
  <Text as="h5" className={cn(className)} {...props} />
);
AlertTitle.displayName = "AlertTitle";
/** Long-form text for the alert body. */

type IAlertDescriptionProps = HtmlHTMLAttributes<HTMLParagraphElement>;
const AlertDescription = ({ className, ...props }: IAlertDescriptionProps) => (
  <div className={cn("text-muted-foreground", className)} {...props} />
);

AlertDescription.displayName = "AlertDescription";


const AlertComponent = Object.assign(Alert, {
  Title: AlertTitle,
  Description: AlertDescription,
});

export { AlertComponent as Alert };

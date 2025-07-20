/**
 * Card primitives used throughout the RetroUI components. */
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Text } from "./Text";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/** Base card container. */
const Card = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn(
        "inline-block border-2 shadow-md transition-all hover:shadow-xs bg-card",
        className,
      )}
      {...props}
    />
  );
};
/** Header region of the card. */

const CardHeader = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn("flex flex-col justify-start p-4", className)}
      {...props}
    />
  );
/** Title text for the card. */
};

const CardTitle = ({ className, ...props }: ICardProps) => {
/** Auxiliary text under the title. */
  return <Text as="h3" className={cn("mb-2", className)} {...props} />;
};

/** Primary content area of the card. */
const CardDescription = ({ className, ...props }: ICardProps) => (
  <p className={cn("text-muted-foreground", className)} {...props} />
);

const CardContent = ({ className, ...props }: ICardProps) => {
  return <div className={cn("p-4", className)} {...props} />;
};

const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});

export { CardComponent as Card };

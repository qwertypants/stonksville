import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Text } from "./Text";

/**
 * Lightweight card component used for grouping content.
 */

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Root card container.
 */
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

/** Header section of a card. */
const CardHeader = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn("flex flex-col justify-start p-4", className)}
      {...props}
    />
  );
};

/** Title component rendered inside a card header. */
const CardTitle = ({ className, ...props }: ICardProps) => {
  return <Text as="h3" className={cn("mb-2", className)} {...props} />;
};

/** Optional descriptive text for a card. */
const CardDescription = ({ className, ...props }: ICardProps) => (
  <p className={cn("text-muted-foreground", className)} {...props} />
);

/** Container for the main content of the card. */
const CardContent = ({ className, ...props }: ICardProps) => {
  return <div className={cn("p-4", className)} {...props} />;
};

// Expose subcomponents as properties for ergonomic imports
const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});

export { CardComponent as Card };

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/commons/utils/cn";

const skeletonVariants = cva(
  "relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 " +
    "after:absolute after:inset-0 after:animate-shimmer after:bg-gradient-to-r " +
    "after:from-transparent after:via-white/50 dark:after:via-white/10 after:to-transparent",
  {
    variants: {
      variant: {
        pill: "rounded-full",
        rect: "rounded-2xl",
        circle: "rounded-full aspect-square",
      },
    },
    defaultVariants: {
      variant: "rect",
    },
  },
);

interface SkeletonProps
  extends React.ComponentProps<"div">, VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Skeleton };

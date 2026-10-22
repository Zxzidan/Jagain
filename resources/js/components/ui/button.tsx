import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-[#141413]",
  {
    variants: {
      variant: {
        default:
          "bg-[#d97757] text-[#faf9f5] hover:bg-[#c6613f] rounded-b-[8px] rounded-t-none font-sans font-semibold border-0 shadow-none",
        clay:
          "bg-[#d97757] text-[#faf9f5] hover:bg-[#c6613f] rounded-b-[8px] rounded-t-none font-sans font-semibold border-0 shadow-none",
        ivory:
          "bg-[#faf9f5] text-[#141413] hover:bg-[#e3dacc] rounded-b-[8px] rounded-t-none font-sans font-semibold border-0 shadow-none",
        destructive:
          "bg-[#c6613f] text-[#faf9f5] hover:bg-[#b05232] rounded-b-[8px] rounded-t-none font-sans font-semibold shadow-none",
        outline:
          "border border-[#cccbc8] bg-transparent text-[#141413] hover:bg-[#e3dacc] rounded-[8px] font-sans shadow-none",
        outlineDark:
          "border border-[#87867f] bg-transparent text-[#faf9f5] hover:border-[#faf9f5] hover:text-[#ffffff] rounded-[12px] font-sans shadow-none",
        secondary:
          "bg-[#e3dacc] text-[#141413] hover:bg-[#d4cbbd] rounded-b-[8px] rounded-t-none font-sans shadow-none",
        ghost: "hover:bg-[#e3dacc] text-[#141413] rounded-[8px] font-sans shadow-none",
        link: "text-[#141413] underline underline-offset-4 hover:text-[#d97757] p-0 font-sans shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-11 px-7 text-base has-[>svg]:px-5",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

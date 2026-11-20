import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';
const variants = cva('button', { variants: { variant: { default: 'yellow', outline: 'outline', dark: 'dark' } }, defaultVariants: { variant: 'default' } });
type Props = React.ComponentProps<'button'> & VariantProps<typeof variants> & {asChild?: boolean};
export const Button = React.forwardRef<HTMLButtonElement, Props>(({className,variant,asChild=false,...props},ref) => {const Comp=asChild?Slot:'button';return <Comp ref={ref} className={cn(variants({variant}),className)} {...props}/>;});
Button.displayName='Button';

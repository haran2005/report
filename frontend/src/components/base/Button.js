import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const buttonVarient = cva("inline-flex items-center justify-center gap-2.5 my-2", {
    variants: {
        variant: {
            primary: "w-full h-10 p-2 text text-lg bg-[#0496ff] text-white ",
            secoundary: "border-2 rounded-lg px-4 py-2  "
        }
    },
});
export const Button = ({ className, variant, ...props }) => {
    return (_jsx("button", { className: cn(buttonVarient({ variant, className })), ...props }));
};

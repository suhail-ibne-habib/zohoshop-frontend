import * as React from "react";

const Button = React.forwardRef(({ className = "", variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006877] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-[#006877] text-white hover:bg-[#004e5a] active:bg-[#003842]",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs rounded-md",
    lg: "h-12 px-8 text-base rounded-md",
    icon: "h-10 w-10",
  };

  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.default;

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };

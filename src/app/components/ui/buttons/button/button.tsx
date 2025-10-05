interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "cta" | "ghost" | "secondary" | "danger";
  classList?: string;
  label?: string;
  icon?: string;
  notifications?: number;
  showLabel?: boolean;
  showIcon?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  isSidebar?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "text",
  classList = "",
  label = "",
  icon = "",
  showLabel = true,
  showIcon = true,
  onClick,
  type = "button",
  isSidebar = false,
  ...rest
}) => {
  const styleMap: Record<string, string> = {
    text: " bg-transparent",
    cta: "bg-text text-dark",
    ghost: "border border-muted  bg-transparent",
    secondary: "bg-light",
    danger: "bg-danger text-white",
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded font-medium cursor-pointer";

  const getClasses = (): string => {
    const variantClass = styleMap[variant] ?? "text";
    const padding = isSidebar
      ? "p-1.5"
      : !showLabel || !label
      ? "p-1.5"
      : "px-3 py-1.5";
    return `${baseClasses} ${variantClass} ${padding} ${classList}`;
  };

  return (
    <button type={type} className={getClasses()} onClick={onClick} {...rest}>
      {showIcon && icon && <i className="material-symbols-rounded">{icon}</i>}
      {showLabel && label && <span>{label}</span>}
    </button>
  );
};

export default Button;

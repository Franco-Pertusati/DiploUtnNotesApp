interface CardProps {
  variant?: "flat" | "shadow" | "gradient" | "negative";
  children?: React.ReactNode;
  classList?: string;
}

const Card = ({ variant = "shadow", children, classList }: CardProps) => {
  const styleMap: Record<string, string> = {
    flat: " bg-neutral",
    shadow:
      "bg-neutral rounded-lg border border-t-highline border-b-bottomline border-x-border",
    gradient:
      "border border-t-highline border-b-bottomline border-x-border bg-gradient-to-b from-light to-neutral",
    negative: "bg-text text-dark rounded-lg",
  };

  const baseClasses: string = "rounded-lg";

  const getClasses = (): string => {
    const variantClass = styleMap[variant] ?? "shadow";
    return `${baseClasses} ${variantClass} ${classList}`;
  };

  return (
    <div className={getClasses()}>
      <div>{children}</div>
    </div>
  );
};

export default Card;

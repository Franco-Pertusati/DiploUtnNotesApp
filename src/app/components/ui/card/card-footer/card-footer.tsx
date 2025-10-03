interface CardFooterProps {
  children?: React.ReactNode;
  classList?: string;
}

const CardFooter = ({ children, classList }: CardFooterProps) => {
  return (
    <div className={`p-4 border-t border-border ${classList}`}>{children}</div>
  );
};

export default CardFooter;

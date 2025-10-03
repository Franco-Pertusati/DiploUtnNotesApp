interface CardHeaderProps {
  children?: React.ReactNode;
  classList?: string;
}

const CardHeader = ({ children, classList }: CardHeaderProps) => {
  return (
    <div className={`p-4 border-b border-border ${classList}`}>
      {children}
    </div>
  );
};

export default CardHeader;

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, children }: HeaderProps) => {
  return (
    <header className="h-10 mb-4">
      <div className="border-b border-border absolute w-full left-0 bg-dark rounded-tl-4xl">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center mb-3">
          <h1 className="text-3xl font-medium">{title}</h1>
          <div className="flex gap-2">{children}</div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;

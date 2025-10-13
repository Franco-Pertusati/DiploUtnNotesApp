interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, children }: HeaderProps) => {
  return (
    <header className="mb-12">
      <div className="border-b border-border bg-dark/90 backdrop-blur-sm absolute w-full left-0 top-0 rounded-tl-4xl py-3">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-medium">{title}</h1>
          <div className="flex gap-2">{children}</div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;

type Props = {
  levels: string[];
  onNavigate?: (index: number) => void;
};

const Breadcrumb = ({ levels, onNavigate }: Props) => {
  return (
    <div className="flex items-center">
      {levels.map((l, index) => {
        const isLast = index === levels.length - 1;

        return (
          <div key={index} className="flex items-center py-2">
            <button
              onClick={() => {
                if (!isLast) {
                  onNavigate?.(index);
                }
              }}
              disabled={isLast}
              className={`${
                isLast
                  ? "text-foreground cursor-default"
                  : "text-muted hover:underline cursor-pointer"
              }`}
            >
              {l}
            </button>

            {!isLast && (
              <i className="material-symbols-rounded text-neutral-400 mx-1">
                chevron_right
              </i>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
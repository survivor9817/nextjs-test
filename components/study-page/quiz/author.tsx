type Props = {
  author: string;
};

const Author = ({ author }: Props) => {
  return (
    <div className="shrink-0 flex items-center w-full md:w-47.5 h-12 cursor-pointer">
      <i className="msr ml-1 text-[32px]"> draft_orders </i>
      <span className="author-fullname">
        {!author?.trim() ? (
          <div className="animate-pulse h-4 w-24 bg-gray-200 rounded dark:bg-gray-400" />
        ) : (
          author
        )}
      </span>
    </div>
  );
};

export default Author;

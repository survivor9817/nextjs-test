type Props = {
  author: string;
};

const Author = ({ author }: Props) => {
  return (
    <div className="shrink-0 flex items-center w-full md:w-47.5 h-12 cursor-pointer">
      <i className="msr ml-1 text-[32px]"> draft_orders </i>
      <span className="author-fullname">
        {/* {"نویسنده"} */}
        {author}
      </span>
    </div>
  );
};

export default Author;

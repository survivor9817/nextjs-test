type Props = { question: string | TrustedHTML };

const Question = ({ question }: Props) => {
  return (
    <div
      className="text-[16px] py-4 px-4 text-justify leading-7"
      dangerouslySetInnerHTML={{ __html: question }}
    >
      {/* {"متن سوال"} */}
    </div>
  );
};

export default Question;

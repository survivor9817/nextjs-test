type Props = {
  params: Promise<{
    bookId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { bookId } = await params;
  return (
    <div>
      <div>page</div>
      <div>{bookId}</div>
    </div>
  );
};

export default page;

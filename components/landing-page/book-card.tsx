import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BookInfo = {
  title: string;
  coverImage: string;
  isAvailable: boolean;
};

const BookCard = ({ coverImage, isAvailable, title }: BookInfo) => {
  return (
    <Card className="py-0 gap-0 transition-transform hover:scale-105 active:scale-95">
      <CardContent className="p-0">
        <img src={coverImage} alt={title} />
      </CardContent>

      <CardFooter className="justify-center p-0">
        <span className="mx-auto p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-[14px] sm:text-[16px]">
          {title}
        </span>
      </CardFooter>
    </Card>
  );
};

export default BookCard;

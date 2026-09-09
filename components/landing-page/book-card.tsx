import Image from "next/image";
import { Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BookInfo = {
  title: string;
  coverImage: string;
  isAvailable: boolean;
};

const BookCard = ({ coverImage, isAvailable, title }: BookInfo) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden py-0 gap-0 transition-all duration-300 border-border/70",
        isAvailable
          ? "hover:shadow-md hover:-translate-y-1 cursor-pointer"
          : "opacity-90 bg-muted/20 select-none",
      )}
    >
      <CardContent className="relative p-0 overflow-hidden">
        {/* نشان به‌زودی روی تصویر */}
        {!isAvailable && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-background/85 backdrop-blur-md shadow-xs border border-border/60 text-muted-foreground"
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>به‌زودی</span>
            </Badge>
          </div>
        )}

        {/* تصویر کتاب */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={cn(
              "object-cover transition-all duration-300",
              !isAvailable && "grayscale-[40%] contrast-[0.9]",
            )}
            priority={false}
          />
        </div>
      </CardContent>

      <CardFooter className="justify-center p-3 sm:p-4">
        <span
          title={title}
          className={cn(
            "w-full text-center truncate text-[14px] sm:text-[16px] font-medium transition-colors",
            isAvailable ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {title}
        </span>
      </CardFooter>
    </Card>
  );
};

export default BookCard;

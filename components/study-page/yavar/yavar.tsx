import React, { useState } from "react";
import { ArrowUpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Yavar = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("پیام ارسال شد:", message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full h-full p-2 sm:p-4 flex items-center justify-center" dir="rtl">
      <Card className="relative flex flex-col justify-between w-full h-full mx-auto overflow-hidden rounded-2xl shadow-sm border-border bg-card py-0">
        {/* محتوای مرکز صفحه (آواتار شناور و پیام خوش‌آمدگویی) */}
        <CardContent className="flex flex-col items-center justify-center flex-1 pt-12 text-center select-none">
          <div className="flex flex-col items-center">
            <img
              className="w-36 h-auto object-contain animate-float will-change-transform"
              src="/imgs/darsyavar0-nobg.png"
              alt="یار آموزشی"
            />

            <p className="pt-6 text-xl font-medium leading-9 text-foreground/90">
              در خدمتم رضا جان <br />
              هر سوال درسی یا مشاوره‌ای داشتی <br />
              می‌تونی از من بپرسی 🤗
            </p>
          </div>
        </CardContent>

        {/* نوار ورودی و دکمه ارسال پیام در پایین */}
        <div className="p-3 sm:p-4 bg-background/60 backdrop-blur-xs">
          <div className="relative flex items-center rounded-3xl border border-input bg-background shadow-xs focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-all px-2 py-1">
            <Textarea
              id="chatInput"
              name="input-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="سؤالت رو اینجا بنویس..."
              rows={1}
              className="min-h-[44px] max-h-32 flex-1 border-0 bg-transparent resize-none px-3 py-2.5 text-base shadow-none focus-visible:ring-0 focus-visible:outline-none placeholder:text-muted-foreground scrollbar-none"
            />

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleSend}
              disabled={!message.trim()}
              aria-label="ارسال جواب"
              className="rounded-full h-10 w-10 shrink-0 text-primary hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowUpCircle className="w-8 h-8" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Yavar;

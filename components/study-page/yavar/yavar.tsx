// hmin ke user nevesht toye input payam inke hanooz aamaade nist bere vaasash

import IconBtn from "@/components/ui/icon-btn";

const Yavar = () => {
  return (
    <>
      <div className="w-full h-full">
        <div className="p-2 flex flex-col items-center gap-2.5 pt-12 bg-white rounded-[10px] overflow-hidden relative w-full h-full">
          <div className="p-2">
            <div className="flex flex-col items-center mt-0 text-center leading-8 text-[20px] w-full">
              <img
                className="w-37.5 animate-float "
                src="/public/imgs/darsyavar0-nobg.png"
                alt=""
              />
              <div className="pt-6">
                در خدمتم رضا جان <br />
                هر سوال درسی یا مشاوره‌ای داشتی <br />
                می‌تونی از من بپرسی 🤗
              </div>
            </div>
          </div>
          <div className="w-[96%] border-2 border-black m-2 rounded-4xl flex justify-center items-center absolute bottom-0">
            <textarea
              className="resize-none outline-none h-12 w-full rounded-4xl px-4 py-3.5 border-0 overflow-auto 
                scrollbar-none [-ms-overflow-style:none]"
              name="input-message"
              id="chatInput"
              placeholder="سؤالت رو اینجا بنویس..."
            ></textarea>

            <IconBtn icon="arrow_circle_up" aria-label="ارسال جواب" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Yavar;

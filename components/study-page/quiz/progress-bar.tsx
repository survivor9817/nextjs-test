import { useEffect, useState } from "react";

type Props = {
  value: number;
};

const ProgressBar = ({ value }: Props) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDisplayValue(value));
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div className="px-2">
      <div className="bg-[#e0e0e0] rounded-[20px] h-3 w-full overflow-hidden">
        {/** bg-[#ccedd8] */}
        <div
          style={{ width: `${value}%` }}
          className="h-full bg-linear-to-r from-[#4caf50] to-[#8bc34a] rounded-[20px] w-0 
                  transition-[width] duration-400 ease-in-out"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

// import { useEffect, useState } from "react";
// import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";

// type Props = {
//   value: number;
// };

// const ProgressBar = ({ value }: Props) => {
//   const [displayValue, setDisplayValue] = useState(0);

//   useEffect(() => {
//     const frame = requestAnimationFrame(() => setDisplayValue(value));
//     return () => cancelAnimationFrame(frame);
//   }, [value]);

//   return (
//     <div className="px-2">
//       <button onClick={() => setDisplayValue((prev) => prev - 10)}>ddd</button>
//       <Progress value={displayValue}>
//         <ProgressTrack className="h-3">
//           <ProgressIndicator className="bg-linear-to-r from-[#4caf50] to-[#8bc34a]" />
//         </ProgressTrack>
//       </Progress>
//     </div>
//   );
// };

// export default ProgressBar;

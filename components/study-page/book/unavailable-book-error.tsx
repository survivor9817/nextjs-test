const UnavailableBookError = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-125 p-2">
      <div className="text-red-500 text-center">
        لطفاً کتابی را از فهرست سمت راست
        {/* <IconBtn i={"list"} className="text-5xl scale-x-[-1] inline-flex translate-y-4 m-2" /> */}
        <span className="msr text-5xl scale-x-[-1] inline-flex translate-y-4 m-2">list</span>
        انتخاب کنید.
      </div>
    </div>
  );
};

export default UnavailableBookError;

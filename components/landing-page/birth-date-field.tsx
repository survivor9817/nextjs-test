"use client";

import * as React from "react";

import { DateSelectPicker } from "@/components/ui/date-select-picker";

export function BirthDateField() {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">تاریخ تولد</label>

      <DateSelectPicker
        value={date}
        onValueChange={setDate}
        minYear={1330}
        maxYear={1405}
        className="w-46"
      />

      <p className="text-sm text-muted-foreground">
        {date
          ? new Intl.DateTimeFormat("fa-IR-u-ca-persian", { dateStyle: "long" }).format(date)
          : "تاریخی انتخاب نشده است"}
      </p>
    </div>
  );
}

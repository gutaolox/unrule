import React, { createContext, useState } from "react";

interface DateContextProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  nextDate: () => void;
  previousDate: () => void;
  resetDate: () => void;
}

export const DateContext = createContext<DateContextProps>({
  selectedDate: new Date(),
  setSelectedDate: () => {},
  nextDate: () => {},
  previousDate: () => {},
  resetDate: () => {},
});

const DateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initDate = () => {
    const date = new Date();
    const hourTimezone = date.getTimezoneOffset() / 60;
    date.setHours(date.getHours() - 6 - hourTimezone); // configuravel
    return date;
  };

  const [selectedDate, setSelectedDate] = useState<Date>(() => initDate());

  const resetDate = () => {
    const date = initDate();
    setSelectedDate(date);
  };

  const nextDate = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const previousDate = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(previousDay);
  };
  const onDateChange = (date: Date) => {
    date.setHours(12, 0, 0, 0);
    setSelectedDate(date);
  };

  return (
    <DateContext.Provider
      value={{
        selectedDate,
        setSelectedDate: onDateChange,
        nextDate,
        previousDate,
        resetDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;

import React, { createContext, useState } from 'react';

interface DateContextProps {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
    nextDate: () => void;
    previousDate: () => void;
}

export const DateContext = createContext<DateContextProps>({
    selectedDate: new Date(),
    setSelectedDate: () => {},
    nextDate: () => {},
    previousDate: () => {},
});

const DateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    return (
        <DateContext.Provider
            value={{ selectedDate, setSelectedDate, nextDate, previousDate }}
        >
            {children}
        </DateContext.Provider>
    );
};

export default DateProvider;
"use client";

import React from "react";

const DateAndTime = ({asanaDueAtTime}: {asanaDueAtTime: string }) => {

  const [currentDate, setCurrentDate] = React.useState<string>(new Date().toISOString());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date().toISOString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedDate = new Date(currentDate).toLocaleDateString() + " " + new Date(asanaDueAtTime).toLocaleTimeString();

  const currentUserTime = new Date(currentDate).toLocaleTimeString();
  const asanaTime = new Date(asanaDueAtTime).toLocaleTimeString();

  const timeDifference = new Date(asanaDueAtTime).getTime() - new Date(currentDate).getTime();

  const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);

  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);

  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);

  return (
    <div>
      <p>Current User Time: {currentUserTime}</p>
      <p>Asana Due Time: {asanaTime}</p>
      <p>Formatted Date and Time: {formattedDate}</p>
      <p>Time Difference: {timeDifferenceInHours} hours, {timeDifferenceInMinutes % 60} minutes, {timeDifferenceInSeconds % 60} seconds</p>
    </div>
  )
}

export default DateAndTime
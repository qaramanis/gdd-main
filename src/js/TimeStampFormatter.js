import React from "react";

const TimeStampFormatter = ({ timestamp, format = "full" }) => {
  const formatTimestamp = (timestamp, format) => {
    const date = new Date(timestamp);
    const now = new Date();

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    switch (format) {
      case "full":
        return date
          .toLocaleDateString("en-US", {
            ...options,
            month: "long",
            day: "numeric",
            year: "numeric",
          })
          .replace(",", " at");

      case "short":
        return date.toLocaleDateString("en-US", {
          ...options,
          month: "short",
          day: "numeric",
          year: "numeric",
        });

      case "date":
        return date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

      case "time":
        return date.toLocaleTimeString("en-US", options);

      case "relative":
        const isToday = date.toDateString() === now.toDateString();
        const isYesterday =
          new Date(now - 86400000).toDateString() === date.toDateString();

        if (isToday) {
          return `Today at ${date.toLocaleTimeString("en-US", options)}`;
        } else if (isYesterday) {
          return `Yesterday at ${date.toLocaleTimeString("en-US", options)}`;
        } else {
          return date
            .toLocaleDateString("en-US", {
              ...options,
              month: "long",
              day: "numeric",
              year: "numeric",
            })
            .replace(",", " at");
        }

      default:
        return date.toLocaleString();
    }
  };

  return (
    <span className="timestamp">{formatTimestamp(timestamp, format)}</span>
  );
};

export default TimeStampFormatter;

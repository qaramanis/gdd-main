import React from "react";

const TimeStampFormatter = ({ timestamp, format = "full" }) => {
  const formatTimestamp = (timestamp, format) => {
    const date = new Date(timestamp);
    const now = new Date();

    const formatRelativeTime = () => {
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) {
        return `${diffInSeconds}s ago`;
      } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)}m ago`;
      } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
      } else if (diffInSeconds < 2592000) {
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
      } else if (diffInSeconds < 31536000) {
        return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
      } else {
        return `${Math.floor(diffInSeconds / 31536000)}y ago`;
      }
    };


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
        return formatRelativeTime();
      default:
        return date.toLocaleString();
    }
  };

  return (
    <span className="timestamp">{formatTimestamp(timestamp, format)}</span>
  );
};

export default TimeStampFormatter;

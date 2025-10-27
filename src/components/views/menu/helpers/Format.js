export function getTitleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);

  const formmatedDate = date
    .toLocaleString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");

  return formmatedDate;
};

export const formatDuration = (duration) => {
  if (!duration) return "Invalid duration";

  // Normalize to array of [hours, minutes, seconds] (default 0 if missing)
  const parts = duration.split(":").map((p) => parseInt(p, 10) || 0);
  const [hours, minutes, seconds] = [
    parts[0] || 0,
    parts[1] || 0,
    parts[2] || 0,
  ];

  // Build readable string
  let result = [];
  if (hours > 0) {
    result.push(`${hours} ${hours === 1 ? "Hour" : "Hours"}`);
  }
  if (minutes > 0) {
    result.push(`${minutes} ${minutes === 1 ? "Min" : "Mins"}`);
  }
  if (seconds > 0 && hours === 0) {
    // Only show seconds if duration < 1hr
    result.push(`${seconds} ${seconds === 1 ? "Sec" : "Sec"}`);
  }

  return result.length > 0 ? result.join(" ") : "0 Minutes";
};


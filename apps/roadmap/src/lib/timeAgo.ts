import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

export function getTimeAgo(date: Date, mini?: boolean) {
  if (mini) {
    return timeAgo.format(date, "mini");
  }
  return timeAgo.format(date);
}

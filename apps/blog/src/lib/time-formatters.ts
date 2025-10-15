export function getSmartDate(date: Date): string {
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } else {
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const year = date.getFullYear().toString().slice(-2);
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${day}/${month}/${year}, ${time}`;
  }
}

export function formatDate2(dateInput: Date | string): string {
  const date = new Date(dateInput);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = months[date.getMonth()];

  const getDaySuffix = (day: number): string => {
      if (day >= 11 && day <= 13) return 'th';
      switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
      }
  };

  const suffix = getDaySuffix(day);

  return `${month} ${day}${suffix}`;
}
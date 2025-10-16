export function formatBigNumber(num: number) {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(1).replace(/\.0$/, "") + "T";
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num.toString();
  }
}

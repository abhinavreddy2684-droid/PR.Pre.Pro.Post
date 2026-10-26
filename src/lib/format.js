/** Zero-pads a number to two digits: 3 -> "03". */
export function pad2(value) {
  return String(value).padStart(2, "0");
}

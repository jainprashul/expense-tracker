const colors = [
  "#DC143C", // Crimson
  "#87CEEB", // Sky Blue
  "#50C878", // Emerald Green
  "#DAA520", // Goldenrod
  "#7851A9", // Royal Purple
  "#FF7F50", // Coral
  "#708090", // Slate Gray
  "#FFF700", // Lemon Yellow
  "#40E0D0", // Turquoise
  "#FF00FF", // Magenta
  "#6685FF"  // Charcoal
];


export default colors;

export function NumberToCurrencyINR(number: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number)
}
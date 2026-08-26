export const toFaDigits = (englishNumber: number) => {
  const persianNumberFormat = new Intl.NumberFormat("fa-IR");
  return persianNumberFormat.format(englishNumber);
};

// export const toEnDigits = (persianNumber) => {
//   return persianNumber.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));
// };

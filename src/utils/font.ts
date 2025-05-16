export const fonts = {
  Poppins: {
    regular: "Poppins-Regular",
    italic: "Poppins-Italic",
    bold: "Poppins-Bold",
    semiBold: "Poppins-SemiBold",
    medium: "Poppins-Medium",
    light: "Poppins-Light",
    thin: "Poppins-Thin",
  },
};

export type FontFamily = keyof typeof fonts;
export type FontVariant = keyof (typeof fonts)["Poppins"];

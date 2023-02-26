import { Exo_2, Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });
const exo2 = Exo_2({ subsets: ["latin"] });

export const bodyFonts = {
  fontFamily: exo2.style.fontFamily,
};

export const headingFonts = {
  fontFamily: exo2.style.fontFamily,
};

export const buttonFonts = {
  fontFamily: exo2.style.fontFamily,
};

export const currencyFonts = {
  fontFamily: robotoMono.style.fontFamily,
};

import { Exo_2, Roboto_Mono, Open_Sans } from 'next/font/google';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });
const exo2 = Exo_2({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

export const bodyFonts = {
  fontFamily: openSans.style.fontFamily,
};

export const headingFonts = {
  fontFamily: openSans.style.fontFamily,
};

export const buttonFonts = {
  fontFamily: openSans.style.fontFamily,
};

export const currencyFonts = {
  fontFamily: robotoMono.style.fontFamily,
};

import { Nunito, Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });
const nunito = Nunito({ subsets: ['latin'] });

export const bodyFonts = {
  fontFamily: nunito.style.fontFamily,
  color: '#26474e',
};

export const headingFonts = {
  fontFamily: nunito.style.fontFamily,
  color: '#26474e',
};

export const buttonFonts = {
  fontFamily: nunito.style.fontFamily,
  color: '#26474e',
};

export const currencyFonts = {
  fontFamily: robotoMono.style.fontFamily,
};

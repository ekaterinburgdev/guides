import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/*Обычный*/
@font-face {
  font-family: "IsetSans";
  font-style: normal;
  font-weight: normal;
  src: url(../client/public/public/fonts/IsetSans-Medium.woff2);
}

/*Полужирный*/
@font-face {
  font-family: "IsetSans";
  font-style: normal;
  font-weight: bold;
  src: url(../client/public/fonts/IsetSans-SemiBold.woff2);
}
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps}></Component>
    </>
  );
}

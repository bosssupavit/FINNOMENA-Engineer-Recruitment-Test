import '../styles/globals.css'
import React from "react";
import { lightTheme, darkTheme } from "../src/Theme";
import useDarkMode from "use-dark-mode";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../src/GlobalStyle";
import { Language } from "../src/language"
import { setCookies, getCookie, removeCookies } from 'cookies-next';

function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [lang, setLang] = React.useState(getCookie("language"));
  const darkmode = useDarkMode(false);
  const theme = darkmode.value ? darkTheme : lightTheme;

  React.useEffect(() => {
    setIsMounted(true);
  }, [darkmode.value]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isMounted && <Component {...pageProps} darkmode={darkmode} language={Language} lang={lang} setLang={setLang}/>}
    </ThemeProvider>
  )
}

export default MyApp

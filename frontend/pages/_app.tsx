import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme, { ethereumTheme, polygonTheme } from "../styles/theme";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext";
import { TransactionContextProvider } from "../contexts/TransactionContext";
import Head from 'next/head'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useContext } from "react";
import defaultTheme from "../styles/theme";
import { ConversionContextProvider } from "../contexts/ConversionContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uladandrew/wisp-subgraph",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ToastContainer />
      <AuthContextProvider>
        <TransactionContextProvider>
          <ConversionContextProvider>
            <ThemeSwitch Component={Component} pageProps={pageProps} />
          </ConversionContextProvider>
        </TransactionContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

const ThemeSwitch = (props: any) => {
  const { Component, pageProps } = props;
  const { chainId } = useContext(AuthContext);

  const theme = 
    chainId === "1"
      ? ethereumTheme
      : chainId === "137"
        ? polygonTheme
        : defaultTheme;

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>gRupee Finance</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;

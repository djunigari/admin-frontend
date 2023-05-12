import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import apolloClient from "@frontend/lib/apollo-client/apollo";
import Layout from "@frontend/components/Layout/Layout";
import { RecoilRoot } from "recoil";
import theme from "@frontend/chakra/theme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={apolloClient}>
			<RecoilRoot>
				<ChakraProvider theme={theme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</RecoilRoot>
		</ApolloProvider>
	);
}

export default MyApp;

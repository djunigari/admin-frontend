import { Flex, Show, Spinner, Text } from "@chakra-ui/react";
import { auth } from "@frontend/lib/firebase/clientApp";
import Div100vh from "react-div-100vh";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../auth/Login";
import Menu from "./Menu";

interface LayoutProps {
	children: any;
}

function Layout({ children }: LayoutProps) {
	const [user, loading, error] = useAuthState(auth);

	if (loading)
		return (
			<Flex align="center" justify="center" w="full" h="100vh">
				<Spinner />
			</Flex>
		);

	if (!user) {
		return (
			<Flex
				as={Div100vh}
				direction="column"
				w="100vw"
				align="center"
				justify="center"
				bg="gray.900"
			>
				<Flex
					borderRadius="md"
					bg="gray.600"
					w="300px"
					p={2}
					align="center"
					justify="center"
					mb={2}
				>
					<Text fontWeight="bold" color="gray.50">
						Catalogo Administrator
					</Text>
				</Flex>
				<Login />
			</Flex>
		);
	}

	return (
		<Flex
			direction="column"
			as={Div100vh}
			w="100vw"
			bg="gray.600"
			align="center"
		>
			<Flex w="full" justify="end" p={2} bg="gray.300">
				<Menu />
			</Flex>

			<Flex w="full" maxW="760px" h="full" overflow="scroll" m={2}>
				{children}
			</Flex>
		</Flex>
	);
}

export default Layout;

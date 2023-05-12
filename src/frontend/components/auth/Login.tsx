import {
	Button,
	Center,
	Flex,
	Icon,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";
import { auth } from "@frontend/lib/firebase/clientApp";
import { getRedirectResult } from "firebase/auth";
import { useEffect, useState } from "react";
import {
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	const login = async () => {
		await signInWithEmailAndPassword(email, password);
	};

	if (error) {
		return (
			<div>
				<p>Error: {error.message}</p>
			</div>
		);
	}
	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<VStack
			direction="column"
			borderRadius="md"
			bg="gray.600"
			w="300px"
			p={2}
			align="center"
			justify="center"
			color="gray.50"
		>
			<Input
				type="text"
				placeholder="email@email.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				focusBorderColor="none"
			/>
			<Input
				type="password"
				placeholder="Senha"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				focusBorderColor="none"
			/>
			<Button
				w={"full"}
				fontSize="lg"
				fontWeight="semibold"
				color="gray.50"
				bg="gray.500"
				_hover={{ bg: "gray.400", color: "gray.600" }}
				isLoading={loading}
				onClick={login}
			>
				Login
			</Button>
		</VStack>
	);
}

export default Login;

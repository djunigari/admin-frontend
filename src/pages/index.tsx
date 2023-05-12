import { Flex } from "@chakra-ui/react";
import SearchButton from "@frontend/components/Layout/Search/SearchButton";
import { auth } from "@frontend/lib/firebase/clientApp";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Home: NextPage = () => {
	const [user, loading, error] = useAuthState(auth);
	const [query, setQuery] = useState("");
	useEffect(() => {
		if (user && !loading) {
		}
	}, [user, loading]);

	return (
		<Flex w="full">
			<SearchButton query={query} setQuery={setQuery} />
		</Flex>
	);
};

export default Home;

import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { UPDATE_CITIES_NAMES } from "@frontend/lib/apollo-client/mutations/region/city/UpdateCitiesNames.mutation";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface useUpdateCitiesNamesProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useUpdateCitiesNames({
	callbackSuccess,
	callbackFail,
}: useUpdateCitiesNamesProps) {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [updateCitiesNames, { loading }] = useMutation(UPDATE_CITIES_NAMES, {
		onCompleted: (data) => {
			toast({
				title: "Nomes em romano das cidades alteradas!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			console.log(data);
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("UPDATE_CITIES_NAMES", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao alterar nomes das cidades",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const update = (cities: { name: string; admAreaCode: string }[]) => {
		updateCitiesNames({
			variables: { data: cities },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return {
		update,
		loading,
	};
}

export default useUpdateCitiesNames;

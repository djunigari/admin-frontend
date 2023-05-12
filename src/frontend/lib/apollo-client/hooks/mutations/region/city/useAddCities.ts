import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { ICity } from "@core/model/City";
import { CREATE_CATEGORY } from "@frontend/lib/apollo-client/mutations/category/CreateCategory.mutation";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ADD_CITIES } from "../../../../mutations/region/city/AddCities.mutation";

interface useAddCitiesProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useAddCities({ callbackSuccess, callbackFail }: useAddCitiesProps) {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [addCities, { loading }] = useMutation(ADD_CITIES, {
		onCompleted: () => {
			toast({
				title: "Cidades adicionadas!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("ADD_CITIES", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao criar cidades",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const add = (cities: ICity[]) => {
		addCities({
			variables: { data: cities },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return {
		add,
		loading,
	};
}

export default useAddCities;

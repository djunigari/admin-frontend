import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { UPDATE_CATEGORY } from "@frontend/lib/apollo-client/mutations/category/UpdateCategory.mutation";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface useUpdateCategoryNameProps {
	callbackSuccess: () => void;
	callbackFail: () => void;
}

function useUpdateCategoryName({
	callbackSuccess,
	callbackFail,
}: useUpdateCategoryNameProps) {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [update, { loading }] = useMutation(UPDATE_CATEGORY, {
		onCompleted: () => {
			toast({
				title: "Nome de atualizado!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess();
		},
		onError: (error) => {
			console.error("UPDATE_CATEGORY", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao atualizar o nome",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail();
		},
	});

	const updateCategoryName = (oldName: string, newName: string) => {
		update({
			variables: { name: oldName, newName },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};
	return {
		updateCategoryName,
		loading,
	};
}

export default useUpdateCategoryName;

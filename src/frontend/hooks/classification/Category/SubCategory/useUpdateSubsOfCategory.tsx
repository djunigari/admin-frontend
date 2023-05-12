import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { UPDATE_SUBS_OF_CATEGORY } from "@frontend/lib/apollo-client/mutations/category/UpdateSubsOfCategory";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface useUpdateSubsOfCategoryProps {
	callbackSuccess: () => void;
	callbackFail: () => void;
}

function useUpdateSubsOfCategory({
	callbackSuccess,
	callbackFail,
}: useUpdateSubsOfCategoryProps) {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [update, { loading }] = useMutation(UPDATE_SUBS_OF_CATEGORY, {
		onCompleted: () => {
			toast({
				title: "SubCategorias atualizado!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess();
		},
		onError: (error) => {
			console.error("UPDATE_SUBS_OF_CATEGORY", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao atualizar o subCategorias",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail();
		},
	});

	const updateSubsOfCategory = (name: string, subCategories: string[]) => {
		update({
			variables: {
				name,
				subCategories,
			},
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return {
		updateSubsOfCategory,
		loading,
	};
}

export default useUpdateSubsOfCategory;

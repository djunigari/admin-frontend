import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { CREATE_CATEGORY } from "@frontend/lib/apollo-client/mutations/category/CreateCategory.mutation";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface useCreateCategoryProps {
	callbackSuccess: () => void;
	callbackFail: () => void;
}

function useCreateCategory({
	callbackSuccess,
	callbackFail,
}: useCreateCategoryProps) {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
		onCompleted: () => {
			toast({
				title: "Categoria criada!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess();
		},
		onError: (error) => {
			console.error("CREATE_CATEGORY", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao criar categoria",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail();
		},
	});

	const create = (name: string, subCategories?: string[]) => {
		createCategory({
			variables: { name, subCategories },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return {
		create,
		loading,
	};
}

export default useCreateCategory;

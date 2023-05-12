import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { DELETE_CATEGORY } from "@frontend/lib/apollo-client/mutations/category/DeleteCategory.mutation";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface useDeleteCategoryProps {
	callbackSuccess: () => void;
	callbackFail: () => void;
}
function useDeleteCategory({
	callbackSuccess,
	callbackFail,
}: useDeleteCategoryProps) {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [removeCategory, { called, loading, error }] = useMutation(
		DELETE_CATEGORY,
		{
			onCompleted: () => {
				toast({
					title: "Categoria Deletada com sucesso!",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
				callbackSuccess();
			},
			onError: (error) => {
				console.error("DELETE_CATEGORY", error.graphQLErrors);
				toast({
					title: "Ocorreu um erro ao tentar deletar categoria",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				callbackFail();
			},
		}
	);

	const deleteCategory = (name: string) => {
		removeCategory({
			variables: { name },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return {
		deleteCategory,
		loading,
	};
}

export default useDeleteCategory;

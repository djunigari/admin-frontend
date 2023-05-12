import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { UPDATE_POST } from "@frontend/lib/apollo-client/mutations/blog/post/UpdatePost.mutation";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
};

function useUpdatePost({ callbackSuccess, callbackFail }: Props) {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [updatePost, { loading }] = useMutation(UPDATE_POST, {
		onCompleted: () => {
			toast({
				title: "Post alterado com sucesso!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("UPDATE_POST", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao alterar post",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const save = (id: string, slug: string, title: string, content: any) => {
		updatePost({
			variables: { id, slug, title, content },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return { save, loading };
}

export default useUpdatePost;

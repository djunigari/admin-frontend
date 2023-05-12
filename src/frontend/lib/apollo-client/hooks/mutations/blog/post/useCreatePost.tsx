import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { CREATE_POST } from "@frontend/lib/apollo-client/mutations/blog/post/CreatePost.mutation";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface useCreatePostProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}
function useCreatePost({ callbackSuccess, callbackFail }: useCreatePostProps) {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [createPost, { loading }] = useMutation(CREATE_POST, {
		onCompleted: () => {
			toast({
				title: "Post criado com sucesso@",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("CREATE_POST", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao criar post",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const save = (slug: string, title: string, content: any) => {
		createPost({
			variables: { slug, title, content: content },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return { save, loading };
}

export default useCreatePost;

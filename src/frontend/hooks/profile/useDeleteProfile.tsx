import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { DELETE_PROFILE } from "@frontend/lib/apollo-client/mutations/Profile/DeleteProfile.mutation";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function useDeleteProfile() {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [remove, { called, loading, error }] = useMutation(DELETE_PROFILE, {
		onError: (error) =>
			console.error("DELETE_PROFILE", error.graphQLErrors),
	});

	useEffect(() => {
		if (called && !loading) {
			if (!error) {
				toast({
					title: "Perfil Deletado com sucesso!",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Ocorreu um erro ao tentar deletar perfil",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}
		}
	}, [called, loading, error]);

	const deleteProfile = (uid: string) => {
		remove({
			variables: { uid },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return {
		deleteProfile,
		called,
		loading,
		error,
	};
}

export default useDeleteProfile;

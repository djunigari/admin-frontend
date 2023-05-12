import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { UPDATE_FIREBASE_USER_PHONE_NUMBER } from "@frontend/lib/apollo-client/mutations/Profile/UpdateFirebaseUserPhoneNumber.mutation";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useUpdateFireabseUserPhoneNumber({
	callbackSuccess,
	callbackFail,
}: Props) {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [update, { loading }] = useMutation(
		UPDATE_FIREBASE_USER_PHONE_NUMBER,
		{
			onCompleted: () => {
				toast({
					title: "Atualizado com sucesso!",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
				callbackSuccess && callbackSuccess();
			},
			onError: (error) => {
				console.error(
					"UPDATE_FIREBASE_USER_PHONE_NUMBER",
					error.graphQLErrors
				);
				toast({
					title: "Ocorreu um erro ao altualizar phoneNumber!",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				callbackFail && callbackFail();
			},
		}
	);

	const save = (uid: string, phoneNumber: string) => {
		update({
			variables: {
				uid,
				phoneNumber: phoneNumber,
			},
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return {
		save,
		loading,
	};
}

export default useUpdateFireabseUserPhoneNumber;

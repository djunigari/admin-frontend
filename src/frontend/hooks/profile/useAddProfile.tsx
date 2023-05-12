import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { ProfileAddress } from "@core/model/ProfileAddress";
import IUserProfile from "@core/model/UserProfile";
import { CREATE_PROFILE } from "@frontend/lib/apollo-client/mutations/Profile/CreateProfile.mutation";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface useAddProfileProps {
	callbackSuccess: () => void;
	callbackFail: () => void;
}

function useAddProfile({ callbackSuccess, callbackFail }: useAddProfileProps) {
	const toast = useToast();
	const [user] = useAuthState(auth);
	const [token, setToken] = useState("");
	const [profile, setProfile] = useState<IUserProfile>();

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const [create, { loading, error }] = useMutation(CREATE_PROFILE, {
		onCompleted: () => {
			toast({
				title: "Perfil criado com sucesso!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess();
		},
		onError: (error) => {
			console.error("CREATE_PROFILE", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao criadr perfil!",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail();
		},
	});

	const setProfileProps = (name: string, value: any) => {
		const userProfile = { ...profile, [name]: value };
		setProfile(userProfile);
	};

	const setAddressProps = (name: string, value: string) => {
		const address: ProfileAddress = {
			...profile?.address,
			[name]: value,
		};
		setProfile({ ...profile, address });
	};

	const addProfile = () => {
		create({
			variables: {
				uid: profile?.uid,
				typeProfile: profile?.typeProfile,
				profileData: {
					displayName: profile?.displayName,
					imageUrl: profile?.imageUrl,
					email: profile?.email,
					telephone: profile?.telephone,
					whatsapp: profile?.whatsapp,
					facebook: profile?.facebook,
					instagram: profile?.instagram,
					webSite: profile?.webSite,
					youtube: profile?.youtube,
					attendances: profile?.attendances,
					category: profile?.category,
					subCategory: profile?.subCategory,
					services: profile?.services,
					description: profile?.description,
					notesAndComments: profile?.notesAndComments,
					country: profile?.address?.country,
					postCode: profile?.address?.postCode,
					prefCode: profile?.address?.prefCode,
					cityCode: profile?.address?.cityCode,
					address1: profile?.address?.address1,
					address2: profile?.address?.address2,
				},
			},
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	const reset = () => {
		setProfile(undefined);
	};

	return {
		reset,
		setProfileProps,
		setAddressProps,
		addProfile,
		loading,
		profile,
	};
}

export default useAddProfile;

import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import { GET_PROFILE } from "@frontend/lib/apollo-client/queries/Profile/GetProfile.query";
import { useEffect, useState } from "react";

interface Props {
	callbackSuccess?: (profile: IUserProfile) => void;
	callbackFail?: () => void;
}

function useSearchProfile({ callbackSuccess, callbackFail }: Props) {
	const toast = useToast();
	const [profile, setProfile] = useState<IUserProfile>();

	const [loadProfile, { called, loading, refetch }] = useLazyQuery<{
		profile: IUserProfile;
	}>(GET_PROFILE, {
		onCompleted: (data) => {
			callbackSuccess && callbackSuccess(data?.profile);
		},
		onError: (error) => {
			console.error("GET_PROFILE", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao buscar o perfil",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetchProfile = (uid: string) => {
		if (called) {
			refetch({ uid });
		} else {
			loadProfile({ variables: { uid } });
		}
	};

	return {
		profile,
		loading,
		fetchProfile,
	};
}

export default useSearchProfile;

import { useQuery } from "@apollo/client";
import { Spinner, Text } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import { default as ProfileView } from "@frontend/components/Profiles/Profile/View/View";
import { GET_PROFILE } from "@frontend/lib/apollo-client/queries/Profile/GetProfile.query";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface ProfilePageProps {
	profileId: string;
}

function ProfilePage({ profileId }: ProfilePageProps) {
	const [profile, setProfile] = useState<IUserProfile>();

	const { loading, error } = useQuery<{
		profile: IUserProfile;
	}>(GET_PROFILE, {
		variables: { uid: profileId },
		onCompleted: (data) => {
			setProfile(data.profile);
		},
		onError: (error) => console.error("GET_PROFILE", error.graphQLErrors),
	});

	if (loading) return <Spinner />;
	if (error || !profile) return <Text>Perfil não encontrado!</Text>;

	return <ProfileView userProfile={profile} />;
}

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { profileId } = context.query;

	try {
		if (!profileId) throw new Error("profile id is empty");
		return {
			props: {
				profileId,
			},
		};
	} catch (error) {
		console.log("getServerSideProps error", error);
	}

	return {
		notFound: true,
	};
};

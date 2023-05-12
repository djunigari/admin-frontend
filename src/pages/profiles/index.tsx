import UserProfiles from "@frontend/components/Profiles/Profile/UserProfiles";
import { ISearchUserProfileParams } from "@frontend/lib/apollo-client/queryParams/SearchUserProfileParams";
import { useRouter } from "next/router";

function ProfilesPage() {
	const router = useRouter();
	return <UserProfiles params={router.query} />;
}

export default ProfilesPage;

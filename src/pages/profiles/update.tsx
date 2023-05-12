import UpdateProfileComponent from "@frontend/components/Profiles/Profile/UpdateProfile/UpdateProfile";
import { useRouter } from "next/router";

function UpdateProfilePage() {
	const router = useRouter();
	const { uid } = router.query;
	return <UpdateProfileComponent profileUid={uid as string} />;
}

export default UpdateProfilePage;

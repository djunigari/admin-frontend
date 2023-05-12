import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
	mutation UpdateProfile(
		$uid: String!
		$profileData: UpdateProfileDataInput!
	) {
		updateProfileFromAdmin(uid: $uid, profileData: $profileData) {
			uid
		}
	}
`;

import { gql } from "@apollo/client";

export const CREATE_PROFILE = gql`
	mutation CreateProfile(
		$uid: String
		$typeProfile: String
		$profileData: UpdateProfileDataInput!
	) {
		createProfile(
			uid: $uid
			typeProfile: $typeProfile
			profileData: $profileData
		) {
			uid
		}
	}
`;

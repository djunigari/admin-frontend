import { gql } from "@apollo/client";

export const DELETE_PROFILE = gql`
	mutation DeleteProfile($uid: String!) {
		deleteProfile(uid: $uid)
	}
`;

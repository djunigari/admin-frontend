import { gql } from "@apollo/client";

export const UPDATE_FIREBASE_USER_PHONE_NUMBER = gql`
	mutation UpdateProfile($uid: String!, $phoneNumber: String!) {
		updateUserPhoneNumber(uid: $uid, phoneNumber: $phoneNumber)
	}
`;

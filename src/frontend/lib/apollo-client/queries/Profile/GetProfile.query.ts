import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
	query GetProfile($uid: ID!) {
		profile(uid: $uid) {
			uid
			displayName
			imageUrl
			email
			telephone
			whatsapp
			facebook
			instagram
			webSite
			youtube
			attendances
			category
			subCategory
			services
			description
			notesAndComments
			address {
				country
				postCode
				prefCode
				cityCode
				address1
				address2
			}
		}
	}
`;

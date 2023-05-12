import { gql } from "@apollo/client";

export const UPDATE_SUBS_OF_CATEGORY = gql`
	mutation UpdateSubCategoriesOfCategory(
		$name: String!
		$subCategories: [String!]
	) {
		updateSubCategoriesOfCategory(
			name: $name
			subCategories: $subCategories
		) {
			name
			subCategories
		}
	}
`;

import { gql } from "@apollo/client";

export const ADD_SUB_CATEGORY = gql`
	mutation AddSubCategoriesToCategory(
		$name: String!
		$subCategories: [String!]!
	) {
		addSubCategoriesToCategory(name: $name, subCategories: $subCategories) {
			name
			subCategories
		}
	}
`;

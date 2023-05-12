import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
	mutation createCategory($name: String!, $subCategories: [String!]) {
		newCategory(name: $name, subCategories: $subCategories) {
			name
			subCategories
		}
	}
`;

import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
	mutation UpdateCategory($name: String!, $newName: String!) {
		updateCategoryName(name: $name, newName: $newName) {
			name
			subCategories
		}
	}
`;

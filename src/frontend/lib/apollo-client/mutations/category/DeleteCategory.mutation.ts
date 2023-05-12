import { gql } from "@apollo/client";

export const DELETE_CATEGORY = gql`
	mutation DeleteCategory($name: String!) {
		deleteCategory(name: $name)
	}
`;

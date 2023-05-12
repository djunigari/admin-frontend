import { gql } from "@apollo/client";

export const UPDATE_POST = gql`
	mutation updatePost(
		$id: String!
		$slug: String!
		$title: String!
		$content: String!
	) {
		updatePost(id: $id, slug: $slug, title: $title, content: $content) {
			slug
		}
	}
`;

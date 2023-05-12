import { gql } from "@apollo/client";

export const CREATE_POST = gql`
	mutation createPost($slug: String!, $title: String!, $content: String!) {
		createPost(slug: $slug, title: $title, content: $content) {
			slug
		}
	}
`;

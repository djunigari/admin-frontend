import { gql } from "@apollo/client";

export const ADD_CITIES = gql`
	mutation addCities($data: [NewCityInput!]!) {
		addCities(data: $data) {
			name
			nameJP
			prefCode
			admAreaCode
		}
	}
`;

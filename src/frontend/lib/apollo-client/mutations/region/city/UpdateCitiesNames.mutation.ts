import { gql } from "@apollo/client";

export const UPDATE_CITIES_NAMES = gql`
	mutation updateCitiesName($data: [UpdateCityNameInput!]!) {
		updateCitiesName(data: $data) {
			name
			nameJP
			prefCode
			admAreaCode
		}
	}
`;

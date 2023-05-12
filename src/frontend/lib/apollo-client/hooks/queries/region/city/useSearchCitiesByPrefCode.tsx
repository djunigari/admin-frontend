import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { ICity } from "@core/model/City";
import { GET_CITIES_BY_PREFCODE } from "@frontend/lib/apollo-client/queries/region/GetCitiesByPrefCode";
import { useState } from "react";

function useSearchCitiesByPrefCode() {
	const toast = useToast();
	const [cities, setCities] = useState<ICity[]>();

	const [loadCities, { called, loading, refetch }] = useLazyQuery<{
		citiesFromPrefecture: ICity[];
	}>(GET_CITIES_BY_PREFCODE, {
		onCompleted: (data) => setCities(data.citiesFromPrefecture),
		onError: (error) => {
			console.error("GET_CITIES_BY_PREFCODE", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao buscar cidades",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetch = (prefCode: string) => {
		if (called) {
			refetch({ prefCode });
		} else {
			loadCities({ variables: { prefCode } });
		}
	};

	return {
		cities,
		loading,
		fetch,
	};
}

export default useSearchCitiesByPrefCode;

import { ISearchUserProfileParams } from "@frontend/lib/apollo-client/queryParams/SearchUserProfileParams";
import { useState } from "react";

function useSearchProfileFilters() {
	const [params, setParams] = useState<ISearchUserProfileParams>({});

	const setSearchProps = (name: string, value?: any) => {
		setParams((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const getFilters = () => {
		const filter: ISearchUserProfileParams = {};
		if (params?.displayName) filter.displayName = params.displayName;
		if (params?.attendances) filter.attendances = params.attendances;
		if (params?.category) filter.category = params.category;
		if (params?.subCategory) filter.subCategory = params.subCategory;
		if (params?.services) filter.services = params.services;
		if (params?.prefCode) filter.prefCode = params.prefCode;
		if (params?.cityCode) filter.cityCode = params.cityCode;
		if (params?.query) filter.query = params.query;

		return filter;
	};

	return {
		setSearchProps,
		getFilters,
		setParams,
		query: params?.query,
		companyName: params?.displayName,
		prefCode: params?.prefCode,
		cityCode: params?.cityCode,
		attendances: params?.attendances,
		category: params?.category,
		subCategory: params?.subCategory,
		services: params?.services,
	};
}

export default useSearchProfileFilters;

import { useLazyQuery } from "@apollo/client";
import ICategory from "@core/model/Category";
import { GET_ALL_SUB_CATEGORIES_BY_CATEGORY_ID } from "@frontend/lib/apollo-client/queries/SubCategory/GetAllSubCategoriesByCategoryId.query";
import { useEffect, useState } from "react";

function useSubCategories() {
	const [subCategories, setSubCategories] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [loadSubCategories, { called, refetch }] = useLazyQuery<{
		category: ICategory;
	}>(GET_ALL_SUB_CATEGORIES_BY_CATEGORY_ID, {
		onCompleted: (data) => {
			setSubCategories(data.category.subCategories || []);
			setLoading(false);
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetchSubCategories = (categoryName: string) => {
		if (called) {
			setLoading(true);
			refetch({ name: categoryName });
		} else {
			setLoading(true);
			loadSubCategories({ variables: { name: categoryName } });
		}
	};

	return { subCategories, loading, fetchSubCategories };
}

export default useSubCategories;

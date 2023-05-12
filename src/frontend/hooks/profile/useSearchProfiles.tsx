import { useLazyQuery } from "@apollo/client";
import { IPageInfo } from "@core/model/PageInfo";
import IUserProfile from "@core/model/UserProfile";
import { SEARCH_PROFILES } from "@frontend/lib/apollo-client/queries/Profile/SearchProfiles.query";
import { ISearchUserProfileParams } from "@frontend/lib/apollo-client/queryParams/SearchUserProfileParams";
import { useState } from "react";

interface useSearchProfilesProps {
	params: ISearchUserProfileParams;
	take?: number;
}

function useSearchProfiles({ params, take = 10 }: useSearchProfilesProps) {
	const [pageInfo, setPageInfo] = useState<IPageInfo>();
	const [resultList, setResultList] = useState<IUserProfile[]>([]);
	const [loading, setLoading] = useState(false);

	const [loadSearchUserProfiles, { called, refetch }] = useLazyQuery<{
		searchProfiles: {
			pageInfo: IPageInfo;
			list: IUserProfile[];
		};
	}>(SEARCH_PROFILES, {
		onCompleted: (data) => {
			setPageInfo(data.searchProfiles?.pageInfo);
			setResultList(data.searchProfiles?.list);
		},
		onError: (error) => error,
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const search = (current: number = 0) => {
		let skip = 0;
		if (current > 0) skip = current * take;

		setResultList([]);
		if (called) {
			setLoading(true);
			refetch({ take, skip, params, isAdmin: true });
		} else {
			setLoading(true);
			loadSearchUserProfiles({
				variables: { take, skip, params, isAdmin: true },
			});
		}
	};

	return {
		search,
		loading,
		resultList,
		pageInfo,
	};
}

export default useSearchProfiles;

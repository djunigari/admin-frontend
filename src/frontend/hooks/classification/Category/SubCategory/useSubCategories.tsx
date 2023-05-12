import { useEffect, useState } from "react";
import useUpdateSubsOfCategory from "./useUpdateSubsOfCategory";

interface useSubCategoriesProps {
	categoryName: string;
	originList?: string[];
	setOriginList: (value: string[]) => void;
}

function useSubCategories({
	categoryName,
	originList = [],
	setOriginList,
}: useSubCategoriesProps) {
	const [newSub, setNewSub] = useState("");
	const [modifiedList, setModifiedList] = useState<string[]>(
		originList || []
	);

	const successfulyUpdated = () => {
		setOriginList(modifiedList);
	};

	const { updateSubsOfCategory, loading } = useUpdateSubsOfCategory({
		callbackSuccess: () => {
			successfulyUpdated();
		},
		callbackFail: () => {},
	});

	// useEffect(() => {
	// 	setModifiedList(originList || []);]
	// }, [originList]);

	useEffect(() => {}, []);

	const addSub = () => {
		const sub = newSub.trim();
		if (!sub) return;
		if (
			modifiedList.find(
				(s) => s.toLocaleLowerCase() === sub.toLocaleLowerCase()
			)
		)
			return;
		setModifiedList([...modifiedList, sub].sort());
		setNewSub("");
	};

	const removeSub = (sub: string) => {
		setModifiedList(
			modifiedList.filter(
				(s) => s.toLocaleLowerCase() !== sub.toLocaleLowerCase()
			)
		);
	};

	const updateSubCategories = () => {
		updateSubsOfCategory(categoryName, modifiedList);
	};

	const cancelChanges = () => {
		setModifiedList(originList);
		setNewSub("");
	};

	return {
		newSub,
		modifiedList,
		setNewSub,
		addSub,
		removeSub,
		updateSubCategories,
		cancelChanges,
		loading,
	};
}

export default useSubCategories;

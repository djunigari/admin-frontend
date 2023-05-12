import { Flex, Text } from "@chakra-ui/react";
import useSubCategories from "@frontend/hooks/classification/useSubCategories";
import { useEffect, useState } from "react";
import SelectSearch, { ISelectOption } from "../SelectSearch";

interface SelectSubCategoryProps {
	subCategories: string[];
	subCategoryOption?: ISelectOption;
	setSubCategoryOption: (option?: ISelectOption) => void;
}

function SelectSubCategory({
	subCategories,
	subCategoryOption,
	setSubCategoryOption,
}: SelectSubCategoryProps) {
	const [options, setOptions] = useState<ISelectOption[]>([]);
	// const { subCategories, loading, fetchSubCategories } = useSubCategories();

	// useEffect(() => {
	// 	fetchSubCategories(categoryOption?.value);
	// }, [categoryOption]);

	useEffect(() => {
		const options =
			subCategories?.map(
				(subCategory) =>
					({
						label: subCategory,
						value: subCategory,
					} as ISelectOption)
			) || [];
		setOptions(options);
	}, [subCategories]);

	return (
		<Flex direction="column">
			<Text fontSize="sm" fontWeight="bold">
				SubCategoria
			</Text>
			<SelectSearch
				name="subCategory"
				selectedOption={subCategoryOption}
				setSelectedOption={setSubCategoryOption}
				options={options}
			/>
		</Flex>
	);
}

export default SelectSubCategory;

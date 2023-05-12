import { Flex, Text } from "@chakra-ui/react";
import { prefList } from "@core/prefectures/Prefectures";
import SelectSearch, {
	ISelectOption,
} from "@frontend/components/CustomSelects/SelectSearch";
import { useEffect, useState } from "react";

interface SelectPrefectureProps {
	prefectureOption?: ISelectOption;
	setPrefectureOption: (option?: ISelectOption) => void;
}

function SelectPrefecture({
	prefectureOption,
	setPrefectureOption,
}: SelectPrefectureProps) {
	const [options, setOptions] = useState<ISelectOption[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const options = prefList.map(
			(prefecture) =>
				({
					label: prefecture.name,
					value: prefecture.prefCode,
				} as ISelectOption)
		);
		setOptions(options);
		setLoading(false);
	}, []);

	return (
		<Flex direction="column" width="full">
			<Text fontSize="sm" fontWeight="bold">
				Província
			</Text>
			<SelectSearch
				name="prefecture"
				selectedOption={
					prefectureOption
						? options.find(
								(o) => o.value === prefectureOption.value
						  )
						: undefined
				}
				setSelectedOption={setPrefectureOption}
				options={options}
				loading={loading}
			/>
		</Flex>
	);
}

export default SelectPrefecture;

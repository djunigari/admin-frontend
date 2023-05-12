import { Flex, Text } from "@chakra-ui/react";
import { prefList } from "@core/prefectures/Prefectures";
import SelectSearch, {
	ISelectOption,
} from "@frontend/components/CustomSelects/SelectSearch";
import { useEffect, useState } from "react";

interface SelectCityProps {
	prefectureOption: ISelectOption;
	cityOption?: ISelectOption;
	setCityOption: (option?: ISelectOption) => void;
}

function SelectCity({
	prefectureOption,
	cityOption,
	setCityOption,
}: SelectCityProps) {
	const [options, setOptions] = useState<ISelectOption[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const founded = prefList.find(
			(p) => p.prefCode === prefectureOption?.value
		);
		const options = founded?.cities?.map(
			(city) =>
				({
					label: city.nam || city.nam_jp,
					value: city.admAreaCode,
				} as ISelectOption)
		);
		setOptions(options || []);

		setLoading(false);
	}, [prefectureOption]);

	return (
		<Flex direction="column" width="full">
			<Text fontSize="sm" fontWeight="bold">
				Cidade
			</Text>
			<SelectSearch
				name="city"
				selectedOption={
					cityOption
						? options.find((o) => o.value === cityOption.value)
						: undefined
				}
				setSelectedOption={setCityOption}
				options={options}
				loading={loading}
			/>
		</Flex>
	);
}

export default SelectCity;

import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	Input,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { Attendance } from "@core/enums/Attendance";
import Classification from "@frontend/components/CustomSelects/Classification/Classification";
import Region from "@frontend/components/CustomSelects/Region/Region";
import ServiceInfo from "@frontend/components/Profiles/Profile/ServiceInfo";
import useSearchProfileFilters from "@frontend/hooks/profile/useSearchProfileFilters";
import { ISearchUserProfileParams } from "@frontend/lib/apollo-client/queryParams/SearchUserProfileParams";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import AnimatedText from "../AnimatedText";
import Attendances from "../Attendances";
import SearchButton from "./SearchButton";
import CompanyFilter from "./SearchModal/Filter/CompanyFilter";

interface Props {
	params: ISearchUserProfileParams;
}

function Search({ params }: Props) {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		query,
		companyName,
		attendances,
		prefCode,
		cityCode,
		category,
		subCategory,
		services,
		setSearchProps,
		setParams,
		getFilters,
	} = useSearchProfileFilters();

	const handleCancel = () => {
		setParams(params);
		onClose();
	};

	const search = () => {
		const filters = getFilters();
		router.push({
			pathname: "/profiles",
			query: { ...filters },
		});
		onClose();
	};

	useEffect(() => {
		console.log(params);
		setParams(params);
	}, []);

	return (
		<>
			<AnimatedText colorScheme="gray" onClick={onOpen}>
				<Icon color="gray.700" as={FaSearch} mr={2} />
				Adicionar filtros
			</AnimatedText>
			<SearchButton
				query={query}
				setQuery={(value: string) => setSearchProps("query", value)}
			/>
			<Drawer
				isOpen={isOpen}
				placement="right"
				size={{ base: "full", md: "xl" }}
				onClose={handleCancel}
			>
				<DrawerOverlay />
				<DrawerContent overflow="scroll" maxH="100% !important">
					<DrawerCloseButton zIndex={999} />
					<DrawerHeader borderBottomWidth="1px" pos="sticky">
						Pesquisar Empresas
					</DrawerHeader>

					<DrawerBody>
						<VStack>
							<Input
								type="text"
								value={query}
								onChange={(e) =>
									setSearchProps("query", e.target.value)
								}
							/>
							<CompanyFilter
								companyName={companyName}
								setCompanyName={(value: string) =>
									setSearchProps("displayName", value)
								}
							/>
							<Attendances
								attendances={attendances}
								setAttendances={(value?: Attendance[] | []) =>
									setSearchProps("attendances", value)
								}
							/>

							<Region
								prefectureCode={prefCode}
								cityCode={cityCode}
								setPrefectureCode={(value?: string) => {
									setSearchProps("prefCode", value);
								}}
								setCityCode={(value?: string) =>
									setSearchProps("cityCode", value)
								}
							/>

							<Classification
								category={category}
								subCategory={subCategory}
								setCategory={(value?: string) => {
									setSearchProps("category", value);
									setSearchProps("subCategory", undefined);
								}}
								setSubCategory={(value?: string) => {
									setSearchProps("subCategory", value);
								}}
							/>
							<ServiceInfo
								services={services}
								setServices={(value?: string[]) => {
									setSearchProps("services", value);
								}}
							/>
						</VStack>
					</DrawerBody>

					<DrawerFooter borderTopWidth="1px">
						<Button variant="outline" mr={3} onClick={handleCancel}>
							Cancel
						</Button>
						<Button colorScheme="blue" onClick={search}>
							Pesquisar
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Search;

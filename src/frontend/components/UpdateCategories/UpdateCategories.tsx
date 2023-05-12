import {
	Flex,
	HStack,
	IconButton,
	Spacer,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import ICategory from "@core/model/Category";
import useCategories from "@frontend/hooks/classification/Category/useCategories";
import usePaginator from "@frontend/hooks/utils/usePaginator";
import { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import Paginator from "../Layout/Paginator/Paginator";
import AddCategory from "./AddCategory";
import CategoryItem from "./CategoryItem/CategoryItem";
import ClassificationFilter from "./ClassificationFilter/ClassificationFilter";

function UpdateCategories() {
	const [listAfterFilter, setListAfterFilter] = useState<ICategory[]>([]);
	const take = 10;
	const {
		pagesQuantity,
		currentPage,
		setCurrentPage,
		setTotal,
		getSliceOfList,
	} = usePaginator({ take });

	const {
		categories,
		setCategories,
		setCategory,
		loading,
		removeCategory,
		refetch,
	} = useCategories();

	useEffect(() => {
		setCurrentPage(1);
		setTotal(categories.length || 0);
		setListAfterFilter(categories);
	}, [categories]);

	return (
		<VStack w="full" align="start">
			<HStack w="full" bg="white" borderRadius="md" p={1}>
				<AddCategory
					categories={categories}
					setCategories={setCategories}
				/>
				<Spacer />
				<ClassificationFilter
					categories={categories}
					setCategories={setListAfterFilter}
				/>
				<IconButton
					size="sm"
					aria-label="Next Page"
					icon={<GrUpdate />}
					onClick={() => refetch()}
				/>
			</HStack>
			{loading ? (
				<Flex w="full" align="center">
					<Spinner />
				</Flex>
			) : (
				<VStack direction="column" w="full">
					<HStack w="full">
						<Text
							fontSize="xs"
							fontWeight="semibold"
							borderRadius="md"
							p={1}
							bg="white"
							alignSelf="start"
							w="auto"
						>
							Total encontrado: ({categories?.length || 0})
						</Text>
						<Spacer />
						<Paginator
							pagesQuantity={pagesQuantity}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					</HStack>
					{getSliceOfList(listAfterFilter).map((c) => (
						<CategoryItem
							key={c.name}
							category={c}
							setCategory={(value: ICategory) =>
								setCategory(c, value)
							}
							removeCategory={removeCategory}
						/>
					))}
				</VStack>
			)}
		</VStack>
	);
}

export default UpdateCategories;

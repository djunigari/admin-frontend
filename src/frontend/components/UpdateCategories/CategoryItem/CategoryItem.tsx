import { Button, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import ICategory from "@core/model/Category";
import useDeleteCategory from "@frontend/hooks/classification/Category/useDeleteCategory";
import { useState } from "react";
import CategoryNameInput from "./CategoryNameInput";
import SubCategoriesComponent from "./SubCategories/SubCategories";

interface CategoryItemProps {
	category: ICategory;
	setCategory: (value: ICategory) => void;
	removeCategory: (value: string) => void;
}

function CategoryItem({
	category: { name, subCategories },
	setCategory,
	removeCategory,
}: CategoryItemProps) {
	const [showSubCategories, setShowSubCategories] = useState(false);
	const [isNameReadOnly, setIsNameReadOnly] = useState(true);

	const successfullyDeleted = () => {
		removeCategory(name);
	};

	const { deleteCategory, loading: loadingDelete } = useDeleteCategory({
		callbackSuccess: successfullyDeleted,
		callbackFail: () => {},
	});

	return (
		<>
			<Flex
				direction="column"
				bg="white"
				w="full"
				align="start"
				borderRadius="md"
			>
				<CategoryNameInput
					name={name}
					setName={(value: string) => {
						setCategory({
							name: value,
							subCategories,
						});
					}}
					isReadOnly={isNameReadOnly}
					setReadOnly={setIsNameReadOnly}
				/>

				<HStack w="full" p={2}>
					<Button
						size="xs"
						colorScheme={
							!showSubCategories ? "blackAlpha" : "orange"
						}
						onClick={() => setShowSubCategories(!showSubCategories)}
					>
						{!showSubCategories
							? "Ver SubCategorias"
							: "Esconder SubCategorias"}
					</Button>
					<Text fontSize="xs">
						{`total de subcategorias (${
							subCategories?.length || 0
						})`}{" "}
					</Text>
					<Spacer />
					<Button
						size="xs"
						colorScheme="blue"
						onClick={() => setIsNameReadOnly(false)}
					>
						Editar Nome
					</Button>
					<Button
						size="xs"
						colorScheme="red"
						onClick={() => deleteCategory(name)}
						isLoading={loadingDelete}
					>
						Excluir
					</Button>
				</HStack>
			</Flex>

			<SubCategoriesComponent
				categoryName={name}
				hidden={!showSubCategories}
				subCategories={subCategories}
				setSubCategories={(subs: string[]) => {
					setCategory({
						name,
						subCategories: subs,
					});
				}}
			/>
		</>
	);
}

export default CategoryItem;

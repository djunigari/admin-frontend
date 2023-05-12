import {
	Button,
	Flex,
	FlexProps,
	HStack,
	Input,
	Spacer,
	VStack,
} from "@chakra-ui/react";
import useSubCategories from "@frontend/hooks/classification/Category/SubCategory/useSubCategories";
import SubCategoryItem from "./SubCategoryItem";

interface SubCategoriesProps extends FlexProps {
	categoryName: string;
	subCategories?: string[];
	setSubCategories: (subs: string[]) => void;
}

function SubCategoriesComponent({
	categoryName,
	subCategories,
	setSubCategories,
	...rest
}: SubCategoriesProps) {
	const {
		newSub,
		modifiedList,
		setNewSub,
		addSub,
		removeSub,
		updateSubCategories,
		cancelChanges,
		loading,
	} = useSubCategories({
		categoryName,
		originList: subCategories,
		setOriginList: setSubCategories,
	});

	return (
		<Flex w="full" {...rest}>
			<VStack w="full" direction="column" pl={8}>
				<HStack bg="white" w="full" borderRadius="md" p={1}>
					<Input
						type="text"
						fontWeight="semibold"
						size="sm"
						value={newSub}
						onChange={(e) => setNewSub(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") addSub();
						}}
						width="auto"
					/>

					<Button colorScheme="blue" fontSize="xs" onClick={addSub}>
						Adicionar
					</Button>
					<Spacer />
					<Button
						isLoading={loading}
						colorScheme="green"
						fontSize="xs"
						onClick={updateSubCategories}
					>
						Salvar Alteraçōes
					</Button>
					<Button
						colorScheme="red"
						fontSize="xs"
						onClick={cancelChanges}
					>
						Cancelar Alteraçōes
					</Button>
				</HStack>
				{modifiedList?.map((s) => (
					<SubCategoryItem
						key={s}
						subCategory={s}
						removeSubCategory={removeSub}
					/>
				))}
			</VStack>
		</Flex>
	);
}

export default SubCategoriesComponent;

import { Button, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { IoCubeOutline } from "react-icons/io5";

interface SubCategoryItemProps {
	subCategory: string;
	removeSubCategory: (value: string) => void;
}
function SubCategoryItem({
	subCategory,
	removeSubCategory,
}: SubCategoryItemProps) {
	return (
		<HStack w="full" borderRadius="md" bg="white" p={1} spacing={1}>
			<Icon as={IoCubeOutline} />
			<Text fontWeight="semibold" fontSize="sm">
				{subCategory}
			</Text>
			<Spacer />
			<Button
				colorScheme="red"
				fontSize="xs"
				onClick={() => removeSubCategory(subCategory)}
			>
				Excluir
			</Button>
		</HStack>
	);
}

export default SubCategoryItem;

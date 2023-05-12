import { Flex } from "@chakra-ui/react";
import UpdateCategories from "@frontend/components/UpdateCategories/UpdateCategories";

function CategoriesPage() {
	return (
		<Flex w="full" m={2}>
			<UpdateCategories />
		</Flex>
	);
}

export default CategoriesPage;

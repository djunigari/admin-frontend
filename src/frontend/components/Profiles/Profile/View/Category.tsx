import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface CategoryProps {
	category: string;
	subCategory?: string;
}

function Category({ category, subCategory }: CategoryProps) {
	return (
		<Stack
			spacing={2}
			rounded={"xl"}
			boxShadow={"lg"}
			p={2}
			w={{ base: "full", md: "lg" }}
			bg="white"
			align="center"
			mt={2}
		>
			<Text fontWeight="bold">{`${category} - ${subCategory}`}</Text>
		</Stack>
	);
}

export default Category;

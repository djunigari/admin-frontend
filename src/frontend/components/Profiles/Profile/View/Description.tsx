import { Flex, FlexProps, Text, Textarea } from "@chakra-ui/react";
import React from "react";

interface Props extends FlexProps {
	description?: string;
}

function Description({ description, ...restProps }: Props) {
	return (
		<Flex
			direction="column"
			w="full"
			bg="white"
			rounded={"xl"}
			boxShadow={"lg"}
			p={2}
			align="center"
			{...restProps}
		>
			<Text fontSize="lg" fontWeight="bold" alignSelf="center">
				Descrição
			</Text>
			<Textarea
				isReadOnly
				border="none"
				value={description || ""}
				resize="none"
			/>
		</Flex>
	);
}

export default Description;

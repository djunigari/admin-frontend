import { Flex, FlexProps, Text, Textarea } from "@chakra-ui/react";
import React from "react";

interface Props extends FlexProps {
	notesAndComments?: string;
}

function NotesAndComments({ notesAndComments, ...restProps }: Props) {
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
				Observaçōes
			</Text>
			<Textarea
				isReadOnly
				border="none"
				value={notesAndComments || ""}
				resize="none"
			/>
		</Flex>
	);
}

export default NotesAndComments;

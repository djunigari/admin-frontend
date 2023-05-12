import { Stack, Text, VStack } from "@chakra-ui/react";

interface ServiceInfoProps {
	services: string[];
}
function ServiceInfo({ services }: ServiceInfoProps) {
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
			<Text fontSize="lg" fontWeight="bold" alignSelf="center">
				Serviços
			</Text>

			<VStack
				align="flex-start"
				border="1px dashed "
				borderColor="gray.400"
				borderRadius="md"
				w="full"
				p={2}
			>
				{services?.map((item, index) => (
					<Text
						key={index}
						fontSize="sm"
						fontWeight="semibold"
						color="gray.600"
					>
						{`- ${item} `}
					</Text>
				))}
			</VStack>
		</Stack>
	);
}

export default ServiceInfo;

import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { Attendance } from "@core/enums/Attendance";
import React from "react";
import { GrDeliver, GrPersonalComputer } from "react-icons/gr";
import { IoStorefrontOutline } from "react-icons/io5";

interface AttendancesProps {
	attendances?: Attendance[];
}

function Attendances({ attendances }: AttendancesProps) {
	return (
		<Stack
			direction={{ base: "column", md: "row" }}
			spacing={[2, 4]}
			rounded={"xl"}
			boxShadow={"lg"}
			p={2}
			w={{ base: "full", md: "lg" }}
			bg="white"
			align={{ base: "start", md: "center" }}
			justify="center"
			mt={2}
		>
			{attendances?.includes(Attendance.PRESENTIAL) && (
				<Flex align="center" fontWeight="bold">
					<Icon as={IoStorefrontOutline} mr={1} />
					<Text fontSize="xs">Presencial</Text>
				</Flex>
			)}
			{attendances?.includes(Attendance.ONLINE) && (
				<Flex align="center" fontWeight="bold">
					<Icon as={GrPersonalComputer} mr={1} />
					<Text fontSize="xs">Online</Text>
				</Flex>
			)}
			{attendances?.includes(Attendance.DELIVERY) && (
				<Flex align="center" fontWeight="bold">
					<Icon as={GrDeliver} mr={1} />
					<Text fontSize="xs">Delivery</Text>
				</Flex>
			)}
		</Stack>
	);
}

export default Attendances;

import {
	Avatar,
	Flex,
	HStack,
	Icon,
	Spacer,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Attendance } from "@core/enums/Attendance";
import IUserProfile from "@core/model/UserProfile";
import { useRouter } from "next/router";
import { GrDeliver, GrPersonalComputer } from "react-icons/gr";
import { IoStorefrontOutline } from "react-icons/io5";

interface ProfileItemProps {
	profile: IUserProfile;
}

function ProfileItem({ profile }: ProfileItemProps) {
	const router = useRouter();

	return (
		<Flex w="full" bg="white" p={2} borderRadius="md" shadow="md">
			<Avatar
				alignSelf="center"
				size={{ base: "sm", md: "md" }}
				src={profile.imageUrl as string}
				mr={2}
				bg="rgba(51, 51, 51, 0)"
			/>

			<VStack align="start" flexGrow={1}>
				<HStack w="full">
					<Text fontSize="sm" fontWeight="extrabold">
						{profile?.displayName}
					</Text>
					<Spacer />
					<Flex>
						{profile.attendances?.includes(
							Attendance.PRESENTIAL
						) && <Icon as={IoStorefrontOutline} mr={1} />}
						{profile.attendances?.includes(Attendance.ONLINE) && (
							<Icon as={GrPersonalComputer} mr={1} />
						)}
						{profile.attendances?.includes(Attendance.DELIVERY) && (
							<Icon as={GrDeliver} mr={1} />
						)}
					</Flex>
				</HStack>
				<HStack w="full" align="end">
					<Text
						fontSize="sm"
						fontWeight="extrabold"
						border="1px dashed"
					>
						uid: {profile?.uid}
					</Text>
					<Spacer />
					<Text
						cursor="pointer"
						color="blue.600"
						fontWeight="semibold"
						border="1px dashed"
						borderRadius="sm"
						p={1}
						fontSize="xs"
						onClick={() =>
							router.push(`profiles/update?uid=${profile?.uid}`)
						}
					>
						Editar
					</Text>
				</HStack>
			</VStack>
		</Flex>
	);
}

export default ProfileItem;

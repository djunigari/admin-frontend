import { Avatar, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import Attendances from "./Attendances";
import Category from "./Category";
import Description from "./Description";
import NotesAndComments from "./NotesAndComments";
import ServiceInfo from "./ServiceInfo";
import SocialButtons from "./SocialMedia";

interface ViewProps {
	userProfile: IUserProfile;
}
function View({ userProfile }: ViewProps) {
	return (
		<Flex w="full" direction="column" p={{ base: 8, md: 4 }}>
			<Stack
				spacing={2}
				rounded={"xl"}
				boxShadow={"lg"}
				p={2}
				w={{ base: "full", md: "lg" }}
				bg="white"
				align="center"
			>
				<Text fontSize="2xl" fontWeight="extrabold">
					{userProfile?.displayName}
				</Text>
				<Divider />
				<Avatar size="2xl" src={userProfile.imageUrl} />
				<SocialButtons
					whatsapp={userProfile.whatsapp}
					facebook={userProfile.facebook}
					instagram={userProfile.instagram}
					webSite={userProfile.webSite}
					email={userProfile.email}
				/>
			</Stack>

			<Category
				category={userProfile.category as string}
				subCategory={userProfile.subCategory}
			/>

			<Attendances attendances={userProfile.attendances} />
			<NotesAndComments
				mt={2}
				notesAndComments={userProfile.notesAndComments}
			/>
			<ServiceInfo services={userProfile.services || []} />
			<Description mt={2} description={userProfile.description} />
		</Flex>
	);
}

export default View;

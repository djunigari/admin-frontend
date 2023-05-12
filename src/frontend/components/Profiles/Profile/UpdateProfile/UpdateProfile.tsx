import {
	Button,
	Flex,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	Tab,
	TabList,
	TabPanels,
	Tabs,
	Text,
	VStack,
} from "@chakra-ui/react";
import { TypeProfile } from "@core/enums/typeProfile";
import IUserProfile from "@core/model/UserProfile";
import { default as ProfileView } from "@frontend/components/Profiles/Profile/View/View";
import useSearchProfile from "@frontend/hooks/profile/useSearchProfile";
import useUpdateProfile from "@frontend/hooks/profile/useUpdateProfile";
import { useEffect, useState } from "react";
import AddressTab from "./TabPanel/AddressTab";
import ContactTab from "./TabPanel/ContactTab";
import DescriptionTab from "./TabPanel/DescriptionTab";
import ImageTab from "./TabPanel/ImageTab";
import InfoTab from "./TabPanel/InfoTab";
import NotesAndCommentsTab from "./TabPanel/NotesAndCommentsTab";
import ServicesTab from "./TabPanel/ServicesTab";

interface Props {
	profileUid?: string;
}

function UpdateProfileComponent({ profileUid }: Props) {
	const [uid, setUid] = useState("");
	const {
		profile,
		loading: loadingUpdate,
		setProfileProps,
		setAddressProps,
		saveUserProfile,
		reset,
		setProfile,
	} = useUpdateProfile();

	const { fetchProfile, loading: loadingProfile } = useSearchProfile({
		callbackSuccess: (value: IUserProfile) => setProfile(value),
	});

	const save = () => {
		if (!profile) return;
		saveUserProfile(uid);
	};

	useEffect(() => {
		if (profileUid) {
			setUid(profileUid);
			fetchProfile(profileUid);
		}
	}, [profileUid]);

	if (loadingProfile) return <Spinner />;

	return (
		<Flex direction="column" w="full">
			<Flex w="full" direction="column">
				<VStack p={2} mx={4} bg="white" borderRadius="md">
					<InputGroup size="sm">
						<InputLeftAddon>uid</InputLeftAddon>
						<Input
							type="text"
							placeholder="Digite o uid do perfil"
							value={uid || ""}
							onChange={(e) => setUid(e.target.value)}
						/>
					</InputGroup>

					<HStack w="full">
						<Button
							colorScheme="red"
							w="50%"
							onClick={() => reset()}
						>
							Reset
						</Button>
						<Button
							colorScheme="blue"
							w="50%"
							onClick={() => fetchProfile(uid)}
						>
							Buscar
						</Button>
					</HStack>
				</VStack>
				<Flex w="full" direction="column" p={{ base: 8, md: 4 }}>
					<Stack spacing={4} rounded={"xl"} p={2} bg="white">
						<Text fontSize="xl" fontWeight="bold" align="center">
							Atualizar Perfil
						</Text>

						{/* <SelectImage
							imageUrl={profile?.imageUrl as string}
							setImageUrl={(value: string) => {
								setProfileProps("imageUrl", value);
							}}
						/> */}
						<InputGroup size="sm">
							<InputLeftAddon>uid</InputLeftAddon>
							<Input
								type="text"
								readOnly
								value={profile?.uid || ""}
								borderColor="gray.100"
								_hover={{
									borderColor: "gray.100",
								}}
								_focus={{
									borderColor: "gray.100",
								}}
							/>
						</InputGroup>
						<RadioGroup
							onChange={(value) =>
								setProfileProps("typeProfile", value)
							}
							value={profile?.typeProfile || TypeProfile.FREE}
						>
							<Stack direction="row">
								<Radio value={TypeProfile.FREE}>
									{TypeProfile.FREE}
								</Radio>
							</Stack>
						</RadioGroup>
						<Tabs bg="white" borderRadius="md" shadow="md">
							<TabList w="full" flexWrap="wrap">
								<Tab>Dados</Tab>
								<Tab>Foto</Tab>
								<Tab>Contatos</Tab>
								<Tab>Endereço</Tab>
								<Tab>Serviços</Tab>
								<Tab>Observaçōes</Tab>
								<Tab>Descrição</Tab>
							</TabList>

							<TabPanels>
								<InfoTab
									profile={profile}
									setProfileProps={setProfileProps}
								/>
								<ImageTab
									profile={profile}
									setProfileProps={setProfileProps}
								/>
								<ContactTab
									profile={profile}
									setProfileProps={setProfileProps}
								/>
								<AddressTab
									address={profile?.address}
									setAddressProps={setAddressProps}
								/>
								<ServicesTab
									profile={profile}
									setProfileProps={setProfileProps}
								/>
								<NotesAndCommentsTab
									profile={profile}
									setProfileProps={setProfileProps}
								/>
								<DescriptionTab
									profile={profile}
									setProfileProps={setProfileProps}
								/>
							</TabPanels>
							<Flex w="full" p={2} justify="end">
								<Button
									onClick={save}
									variant="solid"
									colorScheme="green"
									mr={2}
									isLoading={loadingUpdate}
								>
									Salvar
								</Button>
							</Flex>
						</Tabs>
					</Stack>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default UpdateProfileComponent;

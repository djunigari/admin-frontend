import {
	Button,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Radio,
	RadioGroup,
	Stack,
	Tab,
	TabList,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import { TypeProfile } from "@core/enums/typeProfile";
import { default as ProfileView } from "@frontend/components/Profiles/Profile/View/View";
import useAddProfile from "@frontend/hooks/profile/useAddProfile";
import AddressTab from "./UpdateProfile/TabPanel/AddressTab";
import ContactTab from "./UpdateProfile/TabPanel/ContactTab";
import ImageTab from "./UpdateProfile/TabPanel/ImageTab";
import InfoTab from "./UpdateProfile/TabPanel/InfoTab";
import ServicesTab from "./UpdateProfile/TabPanel/ServicesTab";
import { v4 as uuidv4 } from "uuid";
import DescriptionTab from "./UpdateProfile/TabPanel/DescriptionTab";
import NotesAndCommentsTab from "./UpdateProfile/TabPanel/NotesAndCommentsTab";

function AddProfileComponent() {
	const { profile, loading, setProfileProps, addProfile, setAddressProps } =
		useAddProfile({
			callbackSuccess: () => {},
			callbackFail: () => {},
		});

	const save = () => {
		if (!profile) return;
		addProfile();
	};

	return (
		<Flex direction="column" w="full">
			<Flex w="full" direction={{ base: "column", md: "row" }}>
				<Flex w="full" direction="column" p={{ base: 8, md: 4 }}>
					<Stack spacing={4} rounded={"xl"} p={2} bg="white">
						<Heading
							lineHeight={1.1}
							fontSize={{ base: "2xl", sm: "3xl" }}
						>
							Adicionar Novo Perfil
						</Heading>
						<InputGroup size="sm">
							<InputLeftAddon>uid</InputLeftAddon>
							<Input
								type="text"
								placeholder="Digite o uid do perfil"
								value={profile?.uid || ""}
								onChange={(event) =>
									setProfileProps("uid", event.target.value)
								}
							/>
							<InputRightAddon>
								<Button
									colorScheme="orange"
									size="xs"
									onClick={() =>
										setProfileProps(
											"uid",
											`cat-${uuidv4()}`
										)
									}
								>
									Gerar
								</Button>
							</InputRightAddon>
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
							<TabList flexWrap="wrap">
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
									isLoading={loading}
								>
									Criar Perfil
								</Button>
							</Flex>
						</Tabs>
					</Stack>
				</Flex>

				<ProfileView userProfile={profile || {}} />
			</Flex>
		</Flex>
	);
}

export default AddProfileComponent;

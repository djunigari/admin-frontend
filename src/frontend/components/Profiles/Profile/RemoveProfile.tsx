import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Spinner,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import useDeleteProfile from "@frontend/hooks/profile/useDeleteProfile";
import useSearchProfile from "@frontend/hooks/profile/useSearchProfile";
import { useRef, useState } from "react";
import View from "./View/View";

function RemoveProfileComponent() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [profile, setProfile] = useState<IUserProfile>();
	const cancelRef = useRef(null);
	const [uid, setUid] = useState("");
	const { fetchProfile, loading: loadingProfile } = useSearchProfile({
		callbackSuccess: (value: IUserProfile) => setProfile(value),
	});

	const { deleteProfile } = useDeleteProfile();

	if (loadingProfile) return <Spinner />;

	return (
		<Flex direction="column" w="full">
			<Flex w="full">
				<Flex direction="column" m={4}>
					<VStack p={2} bg="white" borderRadius="md">
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
							<Button w="50%" onClick={() => fetchProfile(uid)}>
								Buscar
							</Button>
							<Button w="50%" onClick={onOpen}>
								Excluir
							</Button>
							<AlertDialog
								isOpen={isOpen}
								leastDestructiveRef={cancelRef}
								onClose={onClose}
							>
								<AlertDialogOverlay>
									<AlertDialogContent>
										<AlertDialogHeader
											fontSize="lg"
											fontWeight="bold"
										>
											Excluir Perfil
										</AlertDialogHeader>

										<AlertDialogBody>
											Você tem certeza que quer excluir o
											perfil?
										</AlertDialogBody>

										<AlertDialogFooter>
											<Button
												ref={cancelRef}
												onClick={onClose}
											>
												Cancel
											</Button>
											<Button
												colorScheme="red"
												onClick={() => {
													deleteProfile(uid);
													onClose();
												}}
												ml={3}
											>
												Excluir
											</Button>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialogOverlay>
							</AlertDialog>
						</HStack>
					</VStack>
					<View userProfile={profile || {}} />
				</Flex>
			</Flex>
		</Flex>
	);
}

export default RemoveProfileComponent;

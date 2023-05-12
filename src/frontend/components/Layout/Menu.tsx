import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	Text,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { auth } from "@frontend/lib/firebase/clientApp";
import { signOut } from "firebase/auth";
import { FaPowerOff } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { LinkItems } from "../interfaces/LinkItemProps";
import NavItem from "./SidebarContent/NavItem";

function Menu() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button colorScheme="gray" size="sm" onClick={onOpen}>
				<Icon boxSize={8} as={MdMenu} />
				<Text mx={2}>Menu</Text>
			</Button>

			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent bg="gray.700	">
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px" color="white">
						Catálogo Japão
					</DrawerHeader>
					<DrawerBody>
						<VStack>
							{LinkItems.map((link) => (
								<NavItem
									key={link.name}
									path={link.path}
									icon={link.icon}
								>
									{link.name}
								</NavItem>
							))}

							<NavItem
								icon={FaPowerOff}
								onClick={() => signOut(auth)}
							>
								Logout
							</NavItem>
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Menu;

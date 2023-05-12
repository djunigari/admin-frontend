import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { LinkItems } from "@frontend/components/interfaces/LinkItemProps";
import { auth } from "@frontend/lib/firebase/clientApp";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { FaDog, FaPowerOff } from "react-icons/fa";
import { GiDogBowl } from "react-icons/gi";
import NavItem from "./NavItem";

const SidebarContent = () => {
	const router = useRouter();

	return (
		<VStack
			borderRightColor="gray.700"
			w="15%"
			h="full"
			color="gray.200"
			p={2}
		>
			<HStack
				spacing={1}
				cursor="pointer"
				onClick={() => router.push("/")}
				color="gray.100"
				justify="center"
			>
				<Icon as={FaDog} />
				<Text fontSize="lg" fontWeight="bold" fontFamily="cursive">
					Catalogo Japão
				</Text>
				<Icon as={GiDogBowl} />
			</HStack>

			{LinkItems.map((link) => (
				<NavItem key={link.name} path={link.path} icon={link.icon}>
					{link.name}
				</NavItem>
			))}

			<NavItem icon={FaPowerOff} onClick={() => signOut(auth)}>
				Logout
			</NavItem>
		</VStack>
	);
};

export default SidebarContent;

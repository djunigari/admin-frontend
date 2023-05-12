import { Flex, FlexProps, Icon, Link, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
	icon: IconType;
	path?: string;
	children: any;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
	return (
		<Link
			href={path}
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
			w="full"
		>
			<Flex
				align="center"
				borderRadius="lg"
				color="gray.300"
				cursor="pointer"
				bg="gray.800"
				_hover={{ bg: "cyan.400" }}
				{...rest}
				p={2}
			>
				<Icon mr={4} fontSize={20} as={icon} />
				<Text fontWeight="semibold">{children}</Text>
			</Flex>
		</Link>
	);
};

export default NavItem;

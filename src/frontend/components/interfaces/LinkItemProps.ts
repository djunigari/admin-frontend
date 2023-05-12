import { IconType } from "react-icons";
import { FiHome, FiPlusSquare, FiEdit, FiDelete } from "react-icons/fi";
import { RiNodeTree } from "react-icons/ri";

export interface LinkItemProps {
	name: string;
	path: string;
	icon: IconType;
}
export const LinkItems: Array<LinkItemProps> = [
	{ name: "Home", icon: FiHome, path: "/" },
	{ name: "Pesquisar", icon: FiPlusSquare, path: "/profiles" },
	{ name: "Adicionar", icon: FiPlusSquare, path: "/profiles/add" },
	{ name: "Editar", icon: FiEdit, path: "/profiles/update" },
	{ name: "Remover", icon: FiDelete, path: "/profiles/remove" },
	{ name: "Categoria/Sub", icon: RiNodeTree, path: "/categories" },
	{ name: "Alterar Phone", icon: RiNodeTree, path: "/profiles/phone" },
];

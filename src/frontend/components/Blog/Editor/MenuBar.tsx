import { HStack, IconButton } from "@chakra-ui/react";
import { Editor } from "@tiptap/core";
import { useCallback } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { BsCode, BsCodeSquare } from "react-icons/bs";
import {
	FaBold,
	FaHeading,
	FaImage,
	FaItalic,
	FaList,
	FaListOl,
	FaParagraph,
	FaQuoteRight,
	FaRedo,
	FaStrikethrough,
	FaUndo,
} from "react-icons/fa";
import { MdHorizontalRule } from "react-icons/md";
import SelectTypeText from "./SelectTypeText";

interface MenuBarProps {
	editor?: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
	if (!editor) {
		return null;
	}

	const addImage = useCallback(() => {
		const url = window.prompt("URL");

		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	}, [editor]);

	return (
		<HStack>
			<SelectTypeText editor={editor} />
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				isActive={editor.isActive("bold")}
				icon={<FaBold />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				isActive={editor.isActive("italic")}
				icon={<FaItalic />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				isActive={editor.isActive("strike")}
				icon={<FaStrikethrough />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				isActive={editor.isActive("code")}
				icon={<BsCode />}
			/>

			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				isActive={editor.isActive("bulletList")}
				icon={<FaList />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				isActive={editor.isActive("orderedList")}
				icon={<FaListOl />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				isActive={editor.isActive("codeBlock")}
				icon={<BsCodeSquare />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				isActive={editor.isActive("blockquote")}
				icon={<FaQuoteRight />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().setHorizontalRule().run()}
				icon={<MdHorizontalRule />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().setHardBreak().run()}
				icon={<AiOutlineEnter />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
				icon={<FaUndo />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
				icon={<FaRedo />}
			/>
			<IconButton
				aria-label=""
				size="xs"
				fontSize="xs"
				onClick={addImage}
				icon={<FaImage />}
			/>
		</HStack>
	);
};

export default MenuBar;

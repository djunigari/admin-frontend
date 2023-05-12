import { Select } from "@chakra-ui/react";
import { Editor } from "@tiptap/core";
import React from "react";

interface SelectTypeTextProps {
	editor: Editor;
}

function SelectTypeText({ editor }: SelectTypeTextProps) {
	const typeText = () => {
		if (editor.isActive("paragraph")) return "paragraph";
		if (editor.isActive("heading", { level: 1 })) return "heading1";
		if (editor.isActive("heading", { level: 2 })) return "heading2";
		if (editor.isActive("heading", { level: 3 })) return "heading3";
		if (editor.isActive("heading", { level: 4 })) return "heading4";

		return "paragraph";
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		if (value.startsWith("heading")) {
			const level = parseInt(value.split("heading")[1]) as 1 | 2 | 3 | 4;
			editor.chain().focus().toggleHeading({ level }).run();
		} else {
			editor.chain().focus().setParagraph().run();
		}
	};

	return (
		<Select
			size="xs"
			maxW="100px"
			value={typeText()}
			onChange={handleOnChange}
			bg="white"
			outline="none"
			border="none"
			focusBorderColor="none"
			borderRadius="md"
		>
			<option value="paragraph">Paragraph</option>
			<option value="heading1">Heading 1</option>
			<option value="heading2">Heading 2</option>
			<option value="heading3">Heading 3</option>
			<option value="heading4">Heading 4</option>
		</Select>
	);
}

export default SelectTypeText;

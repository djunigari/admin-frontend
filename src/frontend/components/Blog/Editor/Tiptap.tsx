import { Box } from "@chakra-ui/react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import Image from "@tiptap/extension-image";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { useEffect, useState } from "react";

Image.configure({
	inline: true,
});

type Props = {
	content?: string;
	setContent: (value: string) => void;
};

const Tiptap = ({ content, setContent }: Props) => {
	const editor = useEditor({
		extensions: [StarterKit, Image],

		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			setContent(html);
		},
	});

	useEffect(() => {
		if (content) {
			editor?.commands.setContent(content);
		}
	}, [editor]);

	return (
		<Prose>
			<MenuBar editor={editor} />
			<Box mt={2} bg="white" borderRadius="md">
				<EditorContent editor={editor} />
			</Box>
		</Prose>
	);
};

export default Tiptap;

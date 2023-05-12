import {
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	useToast,
} from "@chakra-ui/react";
import useCreatePost from "@frontend/lib/apollo-client/hooks/mutations/blog/post/useCreatePost";
import { useState } from "react";
import slugify from "slugify";
import Tiptap from "../Editor/Tiptap";

const CreatePost = () => {
	const toast = useToast();
	const [slug, setSlug] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");

	const { save } = useCreatePost({});

	const handleTitleChange = (event: any) => {
		const inputValue = event.target.value;
		setTitle(inputValue);
		setSlug(slugify(inputValue, { lower: true, remove: /[*+~.()'"!:@]/g }));
	};

	const savePost = () => {
		if (!title) {
			toast({
				title: "Digite o título do post",
				status: "warning",
				duration: 9000,
				isClosable: true,
			});
			return;
		}

		save(slug, title, content);
	};

	return (
		<Flex direction="column" w="full" p={2} overflow="scroll">
			<Text>Title</Text>
			<Input
				id="title"
				type="text"
				value={title}
				onChange={handleTitleChange}
			/>
			<Text>Slug</Text>
			<InputGroup size="sm">
				<InputLeftAddon children={`${window.location.origin}/`} />
				<Input id="slug" type="text" value={slug} readOnly />
			</InputGroup>
			<Text>Content</Text>
			<Tiptap content={content} setContent={setContent} />

			<Button mt={4} onClick={savePost}>
				Create Post
			</Button>
		</Flex>
	);
};

export default CreatePost;

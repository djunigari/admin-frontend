import {
	Button,
	Flex,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	useToast,
} from "@chakra-ui/react";
import { IPost } from "@core/model/blog/Post";
import useUpdatePost from "@frontend/lib/apollo-client/hooks/mutations/blog/post/useUpdatePost";
import { useState } from "react";
import slugify from "slugify";
import Tiptap from "../Editor/Tiptap";

interface UpdatePostProps {
	post: IPost;
}

const UpdatePost = ({ post }: UpdatePostProps) => {
	const toast = useToast();
	const [slug, setSlug] = useState<string>(post.slug);
	const [title, setTitle] = useState<string>(post.title);
	const [content, setContent] = useState<string>(post.content);

	const { save } = useUpdatePost({});

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

		save(post.id, slug, title, content);
	};

	// const reset = () => {
	// 	console.log(content);
	// 	setSlug(post.slug);
	// 	setTitle(post.title);
	// 	setContent(post.content);
	// };

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
			<HStack mt={2}>
				<Button onClick={savePost} colorScheme="green">
					Salvar
				</Button>
			</HStack>
		</Flex>
	);
};

export default UpdatePost;

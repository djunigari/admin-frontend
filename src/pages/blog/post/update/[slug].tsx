import { useRouter } from "next/router";
import useGetPostBySlug from "@frontend/lib/apollo-client/hooks/queries/blog/post/useGetPostBySlug";
import React, { useEffect, useState } from "react";
import { IPost } from "@core/model/blog/Post";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import UpdatePost from "@frontend/components/Blog/Post/UpdatePost";

function UpdatePostPage() {
	const router = useRouter();
	const [post, setPost] = useState<IPost | null>(null);

	const { fetch, loading } = useGetPostBySlug({
		callbackSuccess: setPost,
	});

	useEffect(() => {
		if (!router.isReady) return;
		const { slug } = router.query;
		if (slug) {
			fetch(slug as string);
		}
	}, [router.isReady]);

	if (!router.isReady || loading)
		return (
			<Flex w="full" h="full" align="center" justify="center">
				<Spinner />
			</Flex>
		);

	if (!post)
		return (
			<Flex w="full" h="full" align="center" justify="center">
				<Text>Post não encontrado!</Text>
			</Flex>
		);

	return <UpdatePost post={post} />;
}

export default UpdatePostPage;

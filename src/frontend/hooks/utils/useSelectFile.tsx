import { useToast } from "@chakra-ui/react";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export interface SelectedFile {
	type: "image";
	file: File;
	src?: string;
}

function useSelectFile() {
	const [loading, setLoading] = useState(false);
	const [user] = useAuthState(auth);
	const [savedImageProfileUrl, setSavedImageProfileUrl] = useState("");
	const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
	const [token, setToken] = useState("");
	const toast = useToast();

	useEffect(() => {
		if (user) {
			user.getIdToken().then((token) => setToken(token));
		}
	}, [user]);

	const onUploadFile = async (uid?: string) => {
		if (!uid) {
			toast({
				title: "Preencha Uid do perfil",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			return;
		}
		setLoading(true);

		const file = selectedFile?.file;

		if (!file) return;

		try {
			let formData = new FormData();
			formData.append("media", file, `${uid}.jpg`);
			formData.append("profileUid", "uid");

			const res = await fetch("/api/upload/profile", {
				method: "POST",
				body: formData,
				headers: {
					token: token as string,
				},
			});

			const {
				data,
				error,
			}: {
				data?: { url: string };
				error?: string;
			} = await res.json();

			if (error || !data) {
				throw new Error(error);
			}

			setSelectedFile(null);
			setSavedImageProfileUrl(data.url as string);
		} catch (error) {
			console.error(error);
			alert("Sorry! something went wrong.");
		}
		setLoading(false);
	};

	return {
		loading,
		savedImageProfileUrl,
		onUploadFile,
		selectedFile,
		setSelectedFile,
	};
}

export default useSelectFile;

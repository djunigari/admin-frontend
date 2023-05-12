import {
	Avatar,
	Button,
	Flex,
	HStack,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import useSelectFile from "@frontend/hooks/utils/useSelectFile";

import { useEffect, useState } from "react";
import ProfileImageModal from "./ProfileImageModal/ProfileImageModal";

interface SelectImageProps {
	profile?: IUserProfile;
	imageUrl: string;
	setImageUrl: (value: string) => void;
}

function SelectImage({ profile, imageUrl, setImageUrl }: SelectImageProps) {
	const {
		onUploadFile,
		selectedFile,
		setSelectedFile,
		loading,
		savedImageProfileUrl,
	} = useSelectFile();

	useEffect(() => {
		if (savedImageProfileUrl) setImageUrl(savedImageProfileUrl);
	}, [savedImageProfileUrl]);

	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<VStack>
			<ProfileImageModal
				isOpen={isOpen}
				onClose={onClose}
				selectedFile={selectedFile}
				setSelectedFile={setSelectedFile}
			/>
			<Flex>
				<Avatar
					alignSelf="center"
					size="2xl"
					src={selectedFile?.src || imageUrl}
				/>
				<Button size="xs" onClick={() => onOpen()}>
					Add
				</Button>
			</Flex>
			{selectedFile?.file && (
				<HStack>
					<Button onClick={() => setSelectedFile(null)}>
						Cancelar
					</Button>
					<Button
						onClick={() => onUploadFile(profile?.uid)}
						isLoading={loading}
					>
						Salvar
					</Button>
				</HStack>
			)}
		</VStack>
	);
}

export default SelectImage;

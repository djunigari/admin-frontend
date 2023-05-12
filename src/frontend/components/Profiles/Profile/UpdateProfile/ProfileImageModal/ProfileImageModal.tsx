import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import SelectFile from "@frontend/components/SelectFile/SelectFile";
import { SelectedFile } from "@frontend/hooks/utils/useSelectFile";

interface ProfileImageModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedFile: SelectedFile | null;
	setSelectedFile: (file: SelectedFile | null) => void;
}

function ProfileImageModal({
	selectedFile,
	setSelectedFile,
	isOpen,
	onClose,
}: ProfileImageModalProps) {
	const closeModal = () => {
		// reset();
		onClose();
	};

	return (
		<Modal
			isCentered
			isOpen={isOpen}
			onClose={closeModal}
			scrollBehavior="inside"
			size="6xl"
		>
			<ModalOverlay
				bg="none"
				backdropFilter="auto"
				backdropInvert="80%"
				backdropBlur="2px"
			/>
			<ModalContent>
				<ModalHeader>Atualizar a foto de perfil</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<SelectFile
						selectedFile={selectedFile}
						setSelectedFile={setSelectedFile}
						closeModal={closeModal}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default ProfileImageModal;

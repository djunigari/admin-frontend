import { Button, Flex } from "@chakra-ui/react";
import { SelectedFile } from "@frontend/hooks/utils/useSelectFile";
import { getOrientation } from "get-orientation/browser";
import { useRef } from "react";
import { getRotatedImage } from "./canvasUtils";
import CropperImage, { ORIENTATION_TO_ANGLE } from "./CropperImage";

interface CropperImageProps {
	selectedFile: SelectedFile | null;
	setSelectedFile: (file: SelectedFile | null) => void;
	closeModal: () => void;
}

function SelectFile({
	selectedFile,
	setSelectedFile,
	closeModal,
}: CropperImageProps) {
	const selectedFileRef = useRef<HTMLInputElement>(null);

	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			let file = e.target.files[0];
			let type = file.type.split("/")[0];
			if (type === "image") {
				await onFileChangeImage(file);
			} else {
				throw new Error("Filex extension not accept");
			}
		}
	};

	const onFileChangeImage = async (file: File) => {
		let blob = new Blob([file]);
		let src = URL.createObjectURL(blob);
		setSelectedFile({
			file,
			src,
			type: "image",
		});
		// let imageDataUrl = await readFile(file)

		// apply rotation if needed
		const orientation = await getOrientation(file);
		const rotation = ORIENTATION_TO_ANGLE[orientation];

		if (rotation) {
			const dataUrl = await getRotatedImage(src, rotation);
			URL.revokeObjectURL(src);
			src = dataUrl;
			blob = await fetch(dataUrl).then((it) => it.blob());
			file = new File([blob], file.name);
			setSelectedFile({
				file,
				src,
				type: "image",
			});
		}
	};

	return (
		<Flex direction="column">
			<Button onClick={() => selectedFileRef.current?.click()} mb={2}>
				Carregar nova foto de perfil
			</Button>
			{selectedFile?.file && (
				<CropperImage
					selectedFile={selectedFile}
					setSelectedFile={setSelectedFile}
					closeModal={closeModal}
				/>
			)}

			<input
				hidden
				ref={selectedFileRef}
				type="file"
				// accept="audio/*, video/*"
				accept="image/*,video/*"
				onChange={onFileChange}
			/>
		</Flex>
	);
}

export default SelectFile;

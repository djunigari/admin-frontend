import { Box, Flex } from "@chakra-ui/react";
import { SelectedFile } from "@frontend/hooks/utils/useSelectFile";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "./canvasUtils";
import MenuCropper from "./MenuCropper";

type tplotOptions = {
	[key: string]: number;
};
export const ORIENTATION_TO_ANGLE: tplotOptions = {
	"3": 180,
	"6": 90,
	"8": -90,
};

interface CropperImageProps {
	selectedFile: SelectedFile;
	setSelectedFile: (selectedFile: SelectedFile | null) => void;
	closeModal: () => void;
}

function CropperImage({
	selectedFile,
	setSelectedFile,
	closeModal,
}: CropperImageProps) {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [onCropSize, setOnCropSize] = useState({ width: 520, height: 520 });
	const [rotation, setRotation] = useState(0);
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
		null
	);

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const cancelCroppedImage = () => {
		setSelectedFile(null);
		setRotation(0);
		setZoom(1);
		setCrop({ x: 0, y: 0 });
	};

	const addImage = async () => {
		const croppedDataUrl = await getCroppedImg(
			selectedFile?.src!,
			croppedAreaPixels!,
			rotation
		);

		if (croppedDataUrl) {
			const blob = await fetch(croppedDataUrl).then((it) => it.blob());
			const file = new File([blob], `croppedImage.jpg`, {
				type: "image/jpg",
			});
			setSelectedFile({
				type: "image",
				file,
				src: croppedDataUrl,
			});
		}
		closeModal();
	};

	return (
		<Flex direction={{ base: "column", md: "row" }}>
			<Box
				position="relative"
				width="100%"
				height={{ base: "250px", sm: "300px" }}
				bg="rgba(51, 51, 51, 0)"
			>
				<Cropper
					cropShape="round"
					image={selectedFile?.src}
					crop={crop}
					rotation={rotation}
					zoom={zoom}
					onCropSizeChange={setOnCropSize}
					aspect={1}
					onCropChange={setCrop}
					onRotationChange={setRotation}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</Box>
			<MenuCropper
				zoom={zoom}
				setZoom={setZoom}
				rotation={rotation}
				setRotation={setRotation}
				addImage={addImage}
				cancelCroppedImage={cancelCroppedImage}
			/>
		</Flex>
	);
}

export default CropperImage;

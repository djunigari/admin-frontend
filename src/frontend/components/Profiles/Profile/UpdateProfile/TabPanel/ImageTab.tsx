import { TabPanel } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import SelectImage from "../SelectImage";

interface ImageTabProps {
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function ImageTab({ profile, setProfileProps }: ImageTabProps) {
	return (
		<TabPanel>
			<SelectImage
				profile={profile}
				imageUrl={profile?.imageUrl as string}
				setImageUrl={(value: string) => {
					setProfileProps("imageUrl", value);
				}}
			/>
		</TabPanel>
	);
}

export default ImageTab;

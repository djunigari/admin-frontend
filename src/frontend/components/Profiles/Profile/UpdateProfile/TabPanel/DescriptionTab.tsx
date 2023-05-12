import { TabPanel, Textarea } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";

interface Props {
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function DescriptionTab({ profile, setProfileProps }: Props) {
	return (
		<TabPanel>
			<Textarea
				value={profile?.description || ""}
				placeholder="Escreve aqui todas informaçōes extras que você desejar"
				onChange={(event) =>
					setProfileProps("description", event.target.value)
				}
			/>
		</TabPanel>
	);
}

export default DescriptionTab;

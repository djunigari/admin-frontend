import { TabPanel } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import Contact from "../../Contact";

interface ContactTabProps {
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function ContactTab({ profile, setProfileProps }: ContactTabProps) {
	return (
		<TabPanel>
			<Contact
				email={profile?.email}
				telephone={profile?.telephone}
				whatsapp={profile?.whatsapp}
				facebook={profile?.facebook}
				instagram={profile?.instagram}
				webSite={profile?.webSite}
				youtube={profile?.youtube}
				setUserProfileProps={setProfileProps}
			/>
		</TabPanel>
	);
}

export default ContactTab;

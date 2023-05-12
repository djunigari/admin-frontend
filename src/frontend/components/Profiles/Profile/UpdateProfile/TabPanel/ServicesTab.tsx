import { TabPanel } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import ServiceInfo from "../ServiceInfo";

interface ServicesTabProps {
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function ServicesTab({ profile, setProfileProps }: ServicesTabProps) {
	return (
		<TabPanel>
			<ServiceInfo
				services={profile?.services || []}
				setServices={(services: string[]) =>
					setProfileProps("services", services)
				}
			/>
		</TabPanel>
	);
}

export default ServicesTab;

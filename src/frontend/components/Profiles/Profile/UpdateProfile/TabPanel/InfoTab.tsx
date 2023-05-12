import { Input, TabPanel, Text, VStack } from "@chakra-ui/react";
import { Attendance } from "@core/enums/Attendance";
import IUserProfile from "@core/model/UserProfile";
import Classification from "@frontend/components/CustomSelects/Classification/Classification";
import Attendances from "@frontend/components/Layout/Attendances";

interface InfoTabProps {
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function InfoTab({ profile, setProfileProps }: InfoTabProps) {
	return (
		<TabPanel>
			<VStack>
				<Text alignSelf="start" fontWeight="bold">
					Nome da Empresa ou seu Nome
				</Text>
				<Input
					value={profile?.displayName || ""}
					type="text"
					onChange={(event) =>
						setProfileProps("displayName", event.target.value)
					}
				/>

				<Attendances
					attendances={profile?.attendances}
					setAttendances={(value?: Attendance[] | []) => {
						setProfileProps("attendances", value);
					}}
				/>

				<Classification
					category={profile?.category}
					subCategory={profile?.subCategory}
					setCategory={(value?: string) => {
						setProfileProps("category", value);
					}}
					setSubCategory={(value?: string) => {
						setProfileProps("subCategory", value);
					}}
				/>
			</VStack>
		</TabPanel>
	);
}

export default InfoTab;

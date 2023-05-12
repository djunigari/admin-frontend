import { TabPanel, Textarea } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";

interface Props {
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function NotesAndCommentsTab({ profile, setProfileProps }: Props) {
	return (
		<TabPanel>
			<Textarea
				value={profile?.notesAndComments || ""}
				placeholder="Escreva aqui todas observaçōes que você desejar"
				onChange={(event) =>
					setProfileProps("notesAndComments", event.target.value)
				}
			/>
		</TabPanel>
	);
}

export default NotesAndCommentsTab;

import { Attendance } from "@core/enums/Attendance";
import { TypeProfile } from "@core/enums/typeProfile";
import { ProfileAddress } from "./ProfileAddress";

export default interface IUserProfile {
	uid?: string;
	typeProfile?: TypeProfile;
	disabled?: boolean;
	displayName?: string;
	imageUrl?: string;
	email?: string;
	telephone?: string;
	whatsapp?: string;
	facebook?: string;
	instagram?: string;
	webSite?: string;
	youtube?: string;
	attendances?: Attendance[];
	category?: string;
	subCategory?: string;
	services?: string[];
	description?: string;
	notesAndComments?: string;
	address?: ProfileAddress;
}

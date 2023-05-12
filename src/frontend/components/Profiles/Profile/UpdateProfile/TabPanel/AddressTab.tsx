import { TabPanel } from "@chakra-ui/react";
import { ProfileAddress } from "@core/model/ProfileAddress";
import Address from "../Address";

interface AddressTabProps {
	address?: ProfileAddress;
	setAddressProps: (name: string, value: any) => void;
}

function AddressTab({ address, setAddressProps }: AddressTabProps) {
	return (
		<TabPanel>
			<Address
				country={address?.country}
				postCode={address?.postCode}
				prefCode={address?.prefCode}
				cityCode={address?.cityCode}
				address1={address?.address1}
				address2={address?.address2}
				setAddressProps={setAddressProps}
			/>
		</TabPanel>
	);
}

export default AddressTab;

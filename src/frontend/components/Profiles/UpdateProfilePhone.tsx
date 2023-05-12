import {
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	VStack,
} from "@chakra-ui/react";
import useUpdateFireabseUserPhoneNumber from "@frontend/hooks/profile/useUpdateFireabseUserPhoneNumber";
import React, { useState } from "react";

function UpdateProfilePhone() {
	const [uid, setUid] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const { save, loading } = useUpdateFireabseUserPhoneNumber({});

	return (
		<VStack>
			<InputGroup size="sm">
				<InputLeftAddon>uid</InputLeftAddon>
				<Input
					type="text"
					value={uid}
					onChange={(e) => setUid(e.target.value)}
				/>
			</InputGroup>
			<InputGroup size="sm">
				<InputLeftAddon>Phone</InputLeftAddon>
				<Input
					type="text"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
			</InputGroup>
			<Button isLoading={loading} onClick={() => save(uid, phoneNumber)}>
				Alterar
			</Button>
		</VStack>
	);
}

export default UpdateProfilePhone;

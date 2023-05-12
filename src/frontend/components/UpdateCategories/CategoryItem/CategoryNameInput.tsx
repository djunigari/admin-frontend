import { Button, HStack, Icon, Input } from "@chakra-ui/react";
import useUpdateCategoryName from "@frontend/hooks/classification/Category/useUpdateCategoryName";
import { useState } from "react";
import { CgListTree } from "react-icons/cg";

interface CategoryNameInputProps {
	name: string;
	setName: (value: string) => void;
	isReadOnly: boolean;
	setReadOnly: (value: boolean) => void;
}

function CategoryNameInput({
	isReadOnly = true,
	setReadOnly,
	name,
	setName,
}: CategoryNameInputProps) {
	const [nameInput, setNameInput] = useState(name);

	const successfullyUpdatedName = () => {
		setName(nameInput);
		setReadOnly(true);
	};

	const { updateCategoryName, loading } = useUpdateCategoryName({
		callbackSuccess: successfullyUpdatedName,
		callbackFail: () => {},
	});

	return (
		<HStack p={2} borderRadius="md" align="center">
			<Icon as={CgListTree} mr={2} fontSize="md" />
			<Input
				fontWeight="bold"
				fontSize="md"
				readOnly={isReadOnly}
				type="text"
				value={nameInput}
				onChange={(e) => setNameInput(e.target.value)}
				border={isReadOnly ? "none" : "1px solid"}
				outline="none"
				w="auto"
			/>
			{!isReadOnly && (
				<>
					<Button
						size="sm"
						colorScheme="green"
						onClick={() => {
							updateCategoryName(name, nameInput);
						}}
						isLoading={loading}
					>
						Salvar
					</Button>
					<Button
						size="sm"
						colorScheme="red"
						onClick={() => {
							setNameInput(name);
							setReadOnly(true);
						}}
					>
						Cancelar
					</Button>
				</>
			)}
		</HStack>
	);
}

export default CategoryNameInput;

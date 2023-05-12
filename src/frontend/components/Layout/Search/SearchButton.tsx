import {
	Button,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";

interface Props {
	query?: string;
	setQuery: (value: string) => void;
}

function SearchButton({ query, setQuery }: Props) {
	const router = useRouter();

	return (
		<InputGroup w="full">
			<InputLeftElement
				pointerEvents="none"
				children={<Icon as={BiSearch} color="gray.300" />}
			/>
			<Input
				bg="white"
				value={query || ""}
				placeholder="Pesquisar profissional/empresa"
				type="text"
				onChange={(e) => setQuery(e.target.value)}
			/>
			<InputRightElement w="auto">
				<Button
					size="sm"
					mr={2}
					onClick={() =>
						router.push(
							`/profiles${query ? `?query=${query}` : ""}`
						)
					}
				>
					Pesquisar
				</Button>
			</InputRightElement>
		</InputGroup>
	);
}

export default SearchButton;

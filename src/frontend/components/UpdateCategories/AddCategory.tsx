import { Button, Input } from "@chakra-ui/react";
import ICategory from "@core/model/Category";
import useCreateCategory from "@frontend/hooks/classification/Category/useCreateCategory";
import React, { useState } from "react";

interface AddCategoryProps {
	categories: ICategory[];
	setCategories: (value: ICategory[]) => void;
}

function AddCategory({ categories, setCategories }: AddCategoryProps) {
	const [newCategoryName, setNewCategoryName] = useState<string>("");

	const successfullyCreated = () => {
		setCategories([...categories, { name: newCategoryName.trim() }]);
		setNewCategoryName("");
	};

	const { create, loading } = useCreateCategory({
		callbackSuccess: successfullyCreated,
		callbackFail: () => {},
	});

	const addCategory = () => {
		const name = newCategoryName.trim();
		if (!name) return;
		if (categories.find((c) => c.name === name)) return;
		create(newCategoryName);
	};

	return (
		<>
			<Input
				fontWeight="bold"
				type="text"
				value={newCategoryName}
				onChange={(e) => setNewCategoryName(e.target.value)}
				border="1px solid"
				size="sm"
				w="auto"
				_hover={{ border: "gray.100" }}
			/>
			<Button
				size="sm"
				colorScheme="green"
				onClick={addCategory}
				isLoading={loading}
				ml={2}
			>
				Adicionar
			</Button>
		</>
	);
}

export default AddCategory;

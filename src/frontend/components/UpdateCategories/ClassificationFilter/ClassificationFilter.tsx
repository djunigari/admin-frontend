import { Input } from "@chakra-ui/react";
import ICategory from "@core/model/Category";

interface ClassificationFilterProps {
	categories: ICategory[];
	setCategories: (value: ICategory[]) => void;
}

function ClassificationFilter({
	categories,
	setCategories,
}: ClassificationFilterProps) {
	const filterCategories = (list: ICategory[], nameFilter: string) => {
		return list.filter((item) =>
			item.name
				.toLocaleLowerCase()
				.includes(nameFilter.toLocaleLowerCase())
		);
	};

	const filterCategoriesBySubCategory = (
		list: ICategory[],
		nameFilter: string
	) => {
		return list.filter((c) => {
			if (!c.subCategories || c.subCategories.length == 0) {
				if (nameFilter) return false;
				return true;
			} else {
				return c.subCategories.some((s) =>
					s
						.toLocaleLowerCase()
						.includes(nameFilter.toLocaleLowerCase())
				);
			}
		});
	};

	const filter = (nameFilter: string) => {
		const result1 = filterCategoriesBySubCategory(categories, nameFilter);
		const result2 = filterCategories(categories, nameFilter);

		const resultConcat = result1.concat(result2);
		let foo = new Map();
		for (const tag of resultConcat) {
			foo.set(tag.name, tag);
		}
		let final = [...foo.values()].sort((a, b) =>
			a.name < b.name ? -1 : 1
		);

		setCategories(final);
	};

	return (
		<Input
			placeholder="Categoria e SubCategoria"
			size="sm"
			w="auto"
			// value={nameFilter}
			onChange={(e) => {
				// setNameFilter(e.target.value.toLowerCase());
				filter(e.target.value.toLowerCase());
			}}
			_hover={{ border: "gray.100" }}
		/>
	);
}

export default ClassificationFilter;

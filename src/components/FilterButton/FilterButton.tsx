import { ChangeEvent } from "react";

interface FilterButtonProps {
	id: string;
	checked?: boolean;
	label: string;
	value: string;
	name: string;
	className?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
	id,
	checked = false,
	label,
	name,
	value,
	onChange = ({ target }) => {
		console.log(target.value);
	},
	className = "",
	...props
}) => {
	const checkedClass =
		"peer-checked:bg-white " +
		"peer-checked:text-black-300 " +
		"peer-checked:hover:bg-black " +
		"peer-checked:text-[14px]";
	return (
		<div>
			<input
				{...props}
				className="hidden peer"
				id={id}
				type="radio"
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			<label
				htmlFor={id}
				className={
					"cursor-pointer inline-block text-[14px] px-[8px] rounded-[51px] border-[1px] border-black hover:bg-black hover:text-white whitespace-nowrap " +
					checkedClass +
					" " +
					className
				}
			>
				{label}
			</label>
		</div>
	);
};

export default FilterButton;

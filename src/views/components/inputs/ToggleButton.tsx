import { useState } from "react";

function ToggleButton() {

	const [isChecked, setIsChecked] = useState(false)

	return (

		<div>

			<p>isChecked: {isChecked ? "True" : "False"}</p>

			<input
				id="toggle"
				type="checkbox"
				checked={isChecked} onChange={() => setIsChecked(prevState => !prevState)}
				className="hidden peer"
			/>

			<label
				htmlFor="toggle"
				className="block w-16 h-8 cursor-pointer bg-blue-500 appearance-none peer-checked:bg-green-500"
			/>
		</div>
	);
}

export default ToggleButton;
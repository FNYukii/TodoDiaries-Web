import { useState } from "react";

function ToggleButton() {

	const [isChecked, setIsChecked] = useState(false)

	return (

		<div>

			<p>isChecked: {isChecked ? "True" : "False"}</p>



			<div className="relative">

				<input
					id="toggle"
					type="checkbox"
					checked={isChecked} onChange={() => setIsChecked(prevState => !prevState)}
					className="hidden peer"
				/>

				<label
					htmlFor="toggle"
					className="block w-16 h-8 cursor-pointer bg-zinc-300 rounded-full appearance-none peer-checked:bg-green-500 transition"
				/>

				<div className="absolute top-0 bottom-0 my-auto left-1 peer-checked:left-9 w-6 h-6 rounded-full bg-white transition pointer-events-none	" />
			</div>

		</div>
	);
}

export default ToggleButton;
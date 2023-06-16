import ReactLoading from "react-loading"

function SubmitButton(props: { text: string, isLoading: boolean, disabled: boolean }) {

	return (
		<div>

			{!props.isLoading &&

				<button type="submit" disabled={props.disabled} className={`font-bold py-2 px-2 rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:text-gray-400 disabled:dark:text-gray-600 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent`}>
					{props.text}
				</button>
			}

			{props.isLoading &&

				<ReactLoading
					type="spin"
					color="#333"
					height="20px"
					width="20px"
					className="mx-2"
				/>
			}
		</div>
	)
}

export default SubmitButton
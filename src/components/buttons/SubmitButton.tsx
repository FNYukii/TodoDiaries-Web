
function SubmitButton(props: { text: string, isLoading: boolean, disabled: boolean }) {

	return (
		<div>

			{!props.isLoading &&
				<button type="submit" disabled={props.disabled} className={`font-bold py-2 px-3 rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:text-gray-400 disabled:dark:text-gray-600 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent`}>
					{props.text}
				</button>
			}

			{props.isLoading &&
				<p>Loading ...</p>
			}
		</div>
	)
}

export default SubmitButton
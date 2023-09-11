import ReactLoading from "react-loading"

interface Props {
	text: string
	isLoading: boolean
	disabled: boolean

	className?: string
}

function SubmitButton(props: Props) {

	return (

		<div className={props.className}>

			{!props.isLoading &&

				<button type="submit" disabled={props.disabled} className={`font-bold py-1 px-4 rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:text-zinc-400 disabled:dark:text-zinc-600 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent`}>
					{props.text}
				</button>
			}

			{props.isLoading &&

				<div className="px-2">

					<ReactLoading
						type="spin"
						color="#666"
						height="20px"
						width="20px"
						className="mx-2"
					/>
				</div>
			}
		</div>
	)
}

export default SubmitButton
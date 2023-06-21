function EmailInput(props: { value: string, onChange: React.Dispatch<React.SetStateAction<string>>, placeholder?: string, className?: string }) {

	return (

		<div className={props.className}>

			<input
				type="email"
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
				placeholder={props.placeholder ?? "メールアドレス"}
				className="w-full py-2 bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
			/>
		</div>
	)
}

export default EmailInput
function EmailInput(props: { value: string, onChange: React.Dispatch<React.SetStateAction<string>>, placeholder?: string, className?: string }) {

	return (

		<div className={props.className}>

			<input
				type="email"
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
				placeholder={props.placeholder ?? "メールアドレス"}
				className="w-full py-2 bg-transparent border-b border-gray-300 dark:border-slate-600 focus:outline-none focus:border-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-600"
			/>
		</div>
	)
}

export default EmailInput
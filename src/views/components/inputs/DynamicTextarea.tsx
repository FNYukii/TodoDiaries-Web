import { useEffect, useRef } from "react"

interface Props {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	placeholder?: string
	className?: string
}

function DynamicTextarea(props: Props) {

	const textAreaRef = useResizeTextArea(props.value)

	return (

		<textarea
			value={props.value}
			onChange={(e) => props.setValue(e.target.value)}
			ref={textAreaRef}
			placeholder={props.placeholder ?? ""}
			className={`resize-none ${props.className}`}
		/>
	)
}

function useResizeTextArea(value: string) {

	const ref = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {

		const element = ref.current
		if (!element) {
			return
		}

		element.style.height = "1rem"
		element.style.height = `calc(${element.scrollHeight}px + 1px)`
	}, [value])

	return ref
}

export default DynamicTextarea
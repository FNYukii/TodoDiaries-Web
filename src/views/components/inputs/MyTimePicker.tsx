import { ThemeProvider } from "@emotion/react"
import { createTheme, useMediaQuery } from "@mui/material"
import { LocalizationProvider, MultiSectionDigitalClock } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import React from "react"
import { useState } from "react"

interface Props {
	date: Date
	setDate: React.Dispatch<React.SetStateAction<Date | null>>
}

function MyTimePicker(props: Props) {

	const [isOpen, setIsOpen] = useState(false)

	// テーマ設定
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const theme = React.useMemo(() =>
		createTheme({
			palette: {
				mode: prefersDarkMode ? 'dark' : 'light',
				primary: {
					main: '#3b82f6'
				}
			}
		}),
		[prefersDarkMode],
	)

	return (

		<>

			<button type="button" onClick={() => setIsOpen(true)} className="py-1 px-4 bg-zinc-200 dark:bg-zinc-800 rounded-md hover:brightness-90 dark:hover:brightness-125 transition">
				{dayjs(props.date).format('HH:mm')}
			</button>

			{isOpen &&

				<div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center dark:text-white">

					<div onClick={() => setIsOpen(false)} className="w-full h-full bg-black/30 dark:bg-white/20"></div>

					<div className="absolute bg-white dark:bg-black p-4">

						<ThemeProvider theme={theme}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>

								<MultiSectionDigitalClock
									value={dayjs(props.date)}
									onChange={(newValue) => { props.setDate(newValue!.toDate()) }}
									ampm={false}
									timeSteps={{ minutes: 1 }}
									sx={{
										'& ::-webkit-scrollbar': {
											display: "none"
										}
									}}
								/>

							</LocalizationProvider>
						</ThemeProvider>
					</div>
				</div>
			}
		</>
	)
}

export default MyTimePicker
import { ThemeProvider } from "@emotion/react";
import createTheme from "@mui/material/styles/createTheme";
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface Props {
	date: Date
	setDate: React.Dispatch<React.SetStateAction<Date>>
}

function DatetimePicker(props: Props) {

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		}
	})

	return (
		<div className="space-x-2">

			<ThemeProvider theme={darkTheme}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>

					<MobileDatePicker value={dayjs('2022-04-17')} />
					<MobileTimePicker value={dayjs('2022-04-17T15:30')} />
				</LocalizationProvider>
			</ThemeProvider>
		</div>
	)
}

export default DatetimePicker;
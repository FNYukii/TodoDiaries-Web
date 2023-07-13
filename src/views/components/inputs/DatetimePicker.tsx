import { ThemeProvider } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

interface Props {
	date: Date
	setDate: React.Dispatch<React.SetStateAction<Date>>
}

function DatetimePicker(props: Props) {

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

	return (
		<div className="space-x-2">

			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>

					<MobileDatePicker value={dayjs('2022-04-17')} />
					<MobileTimePicker value={dayjs('2022-04-17T15:30')} />
				</LocalizationProvider>
			</ThemeProvider>
		</div>
	)
}

export default DatetimePicker;
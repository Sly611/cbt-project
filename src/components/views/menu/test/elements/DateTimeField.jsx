import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import theme from "../../../../../Theme";
import dayjs from "dayjs";

export const DateField = (props) => {
  return (
    <DemoContainer
      components={[
        "DatePicker",
        "MobileDatePicker",
        "DesktopDatePicker",
        "StaticDatePicker",
      ]}
      sx={{ flex: 1 }}
    >
      <DemoItem>
        <DatePicker
          label="Date"
          value={props.value ? dayjs(props.value) : null}
          onChange={(newValue) => props.setValue(newValue)}
          slotProps={{
            textField: {
              sx: {
                // backgroundColor: theme.palette.grey[200], // matches MUI theme inputs
                borderRadius: 2, // optional rounded corners
                "& .MuiInputBase-root": {
                  boxShadow: "none",
                  height: "2.3rem",
                  px: 0.75,
                },
              },
            },
          }}
        />
      </DemoItem>
    </DemoContainer>
  );
};

export const TimeField = (props) => {
  return (
    <DemoContainer
      components={[
        "TimePicker",
        "MobileTimePicker",
        "DesktopTimePicker",
        "StaticTimePicker",
      ]}
      sx={{ flex: 1 }}
    >
      <DemoItem>
        <TimePicker
          fullWidth
          label="Time"
          value={props.value ? dayjs(props.value) : null}
          onChange={(newValue) => props.setValue(dayjs(newValue))}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          slotProps={{
            textField: {
              sx: {
                // backgroundColor: theme.palette.grey[200], // matches MUI theme inputs
                borderRadius: 2, // optional rounded corners
              },
            },
          }}
        />
      </DemoItem>
    </DemoContainer>
  );
};

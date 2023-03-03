import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {useEffect} from "react";
import scheduleController from "../../../controllers/schedule"
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
export default function ScheduleTimePicker() {
    const [value, setValue] = React.useState(null);
    useEffect(()=>{
        scheduleController.getTime().then((time)=>{
            setValue(time);
        });
    }, [])
    const save = () => {
        scheduleController.saveTime(value).then((res)=>{
            setValue(res.data.time);
        });
    }

    return (
        <>
            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="Time to load data"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <MDBox display="flex">
                    <MDBox>
                        <MDButton variant="gradient" color="info" ml={2} onClick={save}>
                            Save
                        </MDButton>
                    </MDBox>
                </MDBox>
            </MDBox>
        </>
    );
}
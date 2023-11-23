import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function LeaveManagementDialogRadioButton({status,handleChange}) {

  return (
    <FormControl>
      <FormLabel sx = {{color:"black"}} id="demo-controlled-radio-buttons-group">Status</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={status}
        onChange={handleChange}
      >
        <FormControlLabel value="Present" control={<Radio />} label="Present" />
        <FormControlLabel value="Absent" control={<Radio />} label="Absent" />
      </RadioGroup>
    </FormControl>
  );
}
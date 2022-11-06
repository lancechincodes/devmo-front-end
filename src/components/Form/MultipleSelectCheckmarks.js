import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { techOptions } from './multiSelectProps'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({selectedTech, setSelectedTech}) {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTech(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl required sx={{ m: 1, width: 330 }}>
      <InputLabel id="demo-multiple-checkbox-label">Tech Stack</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selectedTech}
        onChange={handleChange}
        input={<OutlinedInput label="Tech Stack" />}
        renderValue={(selectedTech) => selectedTech.join(', ')}
        MenuProps={MenuProps}
      >
        {techOptions.map((tech, idx) => (
          <MenuItem key={idx} value={tech}>
            <Checkbox checked={selectedTech.indexOf(tech) > -1} />
            <ListItemText primary={tech} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
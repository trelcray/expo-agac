import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box, Icon } from 'native-base';
import { Input } from './Input';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';


export function DatePicker({ date , setDate }) {
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [dateFormat, setDateFormat] = useState("");

    const onChange = (event, selectedDated) => {
        if (selectedDated) {
            const formattedDate = date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth().toString().padStart(2, "0"))  + "/" + date.getFullYear()
            setDate(selectedDated);
            setDateFormat(String(formattedDate));
        }
        setIsPickerShow(false);
    }

    return (
        <Box>
           
        </Box>
    );
};
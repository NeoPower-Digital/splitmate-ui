import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

interface EditableTitleProps {
    
}
 
const EditableTitle: React.FC<EditableTitleProps> = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = ()=>{
        if(isEditing){
            // TODO: save new name to DB
        }

        setIsEditing(!isEditing);
    }

    return (  
        <Stack direction='row' justifyContent='center' gap={1} m={3}>
            {isEditing ? <TextField/> : <Typography variant="h2">Group name</Typography>}
            <IconButton onClick={handleChange}>{isEditing ? <CheckIcon fontSize="large"/> : <EditIcon fontSize="large"/>}</IconButton>
        </Stack>
    );
}
 
export default EditableTitle;
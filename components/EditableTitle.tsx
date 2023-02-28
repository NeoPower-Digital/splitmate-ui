import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import {
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface EditableTitleProps {
  title: string;
  handleSave: (value: string) => void;
  isSaving: boolean;
}

const EditableTitle: React.FC<EditableTitleProps> = ({
  title,
  handleSave,
  isSaving,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textTitle, setTextTitle] = useState('');

  useEffect(() => {
    setTextTitle(title);
  }, [title]);

  const edit = () => {
    setIsEditing(true);
  };

  const save = () => {
    console.log(textTitle);
    handleSave(textTitle);
    setIsEditing(false);
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
      {isEditing || isSaving ? (
        <TextField
          required
          id="name"
          label="Your name"
          autoComplete="off"
          value={textTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTextTitle(event.target.value);
          }}
          autoFocus
        />
      ) : (
        <Typography variant="h4">{title}</Typography>
      )}

      {!isEditing && !isSaving && (
        <IconButton onClick={edit}>
          <EditIcon />
        </IconButton>
      )}

      {(isEditing || isSaving) &&
        (isSaving ? (
          <CircularProgress />
        ) : (
          <IconButton onClick={save}>
            <CheckIcon />
          </IconButton>
        ))}
    </Stack>
  );
};

export default EditableTitle;

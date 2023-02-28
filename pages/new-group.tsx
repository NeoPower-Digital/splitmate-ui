import EditableTitle from '@/components/EditableTitle';
import useCopyToClipboard from '@/hooks/useClipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import {
  adjectives,
  Config,
  names,
  uniqueNamesGenerator,
} from 'unique-names-generator';

interface NewGroupProps {}

const config: Config = {
  dictionaries: [adjectives, names],
  separator: ' ',
  style: 'capital',
};

const NewGroup: React.FC<NewGroupProps> = () => {
  const [isCopying, setIsCopying] = useState(false);
  const [_, copy] = useCopyToClipboard();
  const [isSaving, setIsSaving] = useState(false);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const randomName = uniqueNamesGenerator(config);

    setGroupName(randomName);
  }, []);

  // TODO: Replace with unique id from DB
  const id = 1;
  const groupURL = `${window.location.origin}/join-group/${id}`;

  const handleCopy = () => {
    copy(groupURL);
    setIsCopying(true);

    setTimeout(() => {
      setIsCopying(false);
    }, 2000);
  };

  const saveGroupName = (newGroupName: string) => {
    if (newGroupName === groupName) return;

    // TODO: Save name to DB
    setIsSaving(true);
    setGroupName(newGroupName);
    console.log({ groupName: newGroupName });

    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
  };

  return (
    <Stack alignItems="center" gap={2}>
      <EditableTitle
        title={groupName}
        handleSave={saveGroupName}
        isSaving={isSaving}
      />

      <Paper sx={{ p: 4 }}>
        <Stack gap={2} alignItems="center">
          <Typography>
            Share the link or the QR code for others to join
          </Typography>

          <QRCode size={128} value={groupURL} />

          <Button
            startIcon={isCopying ? <DoneIcon /> : <ContentCopyIcon />}
            color="secondary"
            onClick={handleCopy}
          >
            {groupURL}
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default NewGroup;

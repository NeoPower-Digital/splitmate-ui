import { URL } from "@/constants/constants";
import { Button, Stack, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useCopyToClipboard from "@/hooks/useClipboard";
import { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import EditableTitle from "@/components/EditableTitle";

interface NewGroupProps {
    
}

const NewGroup: React.FC<NewGroupProps> = () => {
    const [isCopying, setIsCopying] = useState(false);
    const [_, copy] = useCopyToClipboard();

    // TODO: Replace with unique id from DB
    const id = 1;
    const value = `${URL}join-group/${id}`;

    const handleCopy = ()=> {
        copy(value);
        setIsCopying(true);

        setTimeout(() => {
            setIsCopying(false);
        }, 2000);
    }

    return ( 
        <Stack alignItems='center'>
            <EditableTitle/>
            
            <QRCode
            size={256}
            value={value}
            />
            
            <Button onClick={handleCopy} startIcon={ isCopying ? <DoneIcon/> : <ContentCopyIcon/> }>{value}</Button>
        </Stack>
     );
}
 
export default NewGroup;
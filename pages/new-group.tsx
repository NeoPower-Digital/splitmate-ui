import { URL } from "@/constants/constants";
import { Stack } from "@mui/material";
import QRCode from "react-qr-code";

interface NewGroupProps {
    
}
 
const NewGroup: React.FC<NewGroupProps> = () => {
    const id = 1;
    const value = `${URL}join-group/${id}`;
    return ( 
        <Stack>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={value}
                viewBox={`0 0 256 256`}
                />
            </div>
        </Stack>
     );
}
 
export default NewGroup;
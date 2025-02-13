import {FC} from "react";
import {Alert, AlertColor, Snackbar} from "@mui/material";

type ToastProps = {
    open: boolean;
    msg: string;
    color: AlertColor;
    onClose: () => void;
}

export const Toast : FC<ToastProps> =({open, msg, color, onClose}) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert severity={color} variant="filled" sx={{ width: '100%' }}>{msg}</Alert>
        </Snackbar>
    );
}
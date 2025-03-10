import {FC, useState} from "react";
import {AppBar, Box, Paper, Toolbar, Typography} from "@mui/material";
import {Toast} from "../../utils/toast.tsx";
import {ProveedorForm} from "../../forms/ProveedorForm.tsx";
import {Proveedor} from "../../models/proveedor-model.ts";
import {agregarProveedor} from "../../services/proveedorService.ts";

export const CrearProveedores : FC = () => {

    const [openToast, setOpenToast] = useState<boolean>(false);
    const [toastMsg, setToastMsg] = useState<string>("");

    const submitProveedor = async (data : Proveedor)=>  {
        const result = await agregarProveedor(data);
        setToastMsg(result.msg);
        setOpenToast(true);
    }

    return (
        <Box>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6">
                        Registro de proveedor
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} sx={{p : 4, m : 4}}>
                <ProveedorForm enviarDatos={submitProveedor}/>
            </Paper>
            <Toast open={openToast} msg={toastMsg} color={"success"} onClose={() => setOpenToast(false)}/>
        </Box>
    )
}
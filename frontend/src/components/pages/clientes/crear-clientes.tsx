import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Cliente} from "../../models/cliente-model.ts";
import {
    AppBar,
    Box,
    Paper, SelectChangeEvent,
    Toolbar,
    Typography
} from "@mui/material";
import {listarLocaciones} from "../../services/locationService.ts";
import {Locaciones} from "../../models/locaciones.ts";
import {Toast} from "../../utils/toast.tsx";
import {ClienteForm} from "../../forms/ClienteForm.tsx";
import {agregarCliente} from "../../services/clientesService.ts";

export const CrearClientesPage : FC = () => {

    const [estados, setEstados] = useState<Locaciones[]>([]);
    const [ciudades, setCiudades] = useState<string[]>([]);
    const [toastMsg, setToastMsg] = useState<string>("");
    const [openToast, setOpenToast] = useState<boolean>(false);
    const {setValue} = useForm<Cliente>();


    useEffect(() => {
        listarLocaciones()
            .then(resp => {
                setEstados(resp);
            })
            .catch(err => {
                console.error("Error al cargar las locaciones", err);
            });
    }, []);

    const handleEstadoChange = (event: SelectChangeEvent) => {
      const selected = event.target.value;
      setValue("locacion.estado", selected);

      const ciudadesLista = estados.find(est => est.estado === selected)?.ciudades;
      setCiudades(ciudadesLista as string[]);
    };

    const submitCliente = async (data : Cliente) => {
        const resp = await agregarCliente(data);
        setToastMsg(resp.msg);
        setOpenToast(true);
    };


    return (
        <Box>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6">
                        Registro de clientes
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} sx={{p : 4, m : 4}}>
                <ClienteForm enviarDatos={submitCliente} handleEstadoChange={handleEstadoChange} estados={estados} ciudades={ciudades}/>
            </Paper>
            <Toast open={openToast} msg={toastMsg} color={"success"} onClose={() => setOpenToast(false)}/>
        </Box>
    )
}
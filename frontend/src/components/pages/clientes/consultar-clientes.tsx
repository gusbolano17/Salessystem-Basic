import {FC, useEffect, useState} from "react";
import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    MenuItem,
    Paper,
    Select, SelectChangeEvent,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {Cliente} from "../../models/cliente-model.ts";
import {listarClientes} from "../../services/clientesService.ts";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Controller, useForm} from "react-hook-form";

export const ConsultarClientes : FC = () => {

    const {handleSubmit, control} = useForm();

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [showSearchNombre, setShowSearchNombre] = useState<boolean>(false);
    const [showSearchDoc, setShowSearchDoc] = useState<boolean>(false);
    const [showSearchDate, setSearchShowDate] = useState<boolean>(false);
    // const [renderTable, setRenderTable] = useState<boolean>(false);

    useEffect(() => {
        listarClientes().then(resp => {
            setClientes(resp);
        });
    }, []);

    const opcionesBusqueda = [
        {id : 1, label : "Nombre"},
        {id : 2, label: "Documento"},
        {id : 3, label: "Fecha de creacion"}
    ];

    const handleSelect = (e : SelectChangeEvent) => {
        const value  = e.target.value as unknown as number;

        switch (value) {
            case 1:
                setShowSearchNombre(true);
                setShowSearchDoc(false);
                setSearchShowDate(false);
                break;
            case 2:
                setShowSearchNombre(false);
                setSearchShowDate(false);
                setShowSearchDoc(true);
                break;
            case 3:
                setShowSearchNombre(false);
                setShowSearchDoc(false);
                setSearchShowDate(true);
                break;
            default:
                setShowSearchNombre(false);
                setShowSearchDoc(false);
                setSearchShowDate(false);
        }
    }

    const submitSearch = (search : any) => {
        console.log(search)
    }

    return (
        <Box>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6">
                        Consultar clientes
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} sx={{p : 4, m : 4}}>
                <Box display="flex" alignItems="center" gap={2}>

                    <Select
                        defaultValue=""
                        displayEmpty
                        onChange={handleSelect}
                        sx={{ minWidth: 120 }}
                    >
                        <MenuItem value="">Seleccione una opcion</MenuItem>
                        {opcionesBusqueda.map(op => (
                            <MenuItem key={op.id} value={op.id}>{op.label}</MenuItem>
                        ))}
                    </Select>

                    <form style={{ display: 'flex', alignItems: 'center', gap: '60',  width: '100%'}} onSubmit={handleSubmit(submitSearch)}>
                        {showSearchNombre ? (
                            <Controller
                                name="nombre"
                                control={control}
                                render={({field}) => (
                                    <Autocomplete
                                        freeSolo
                                        sx={{flexGrow : 1}}
                                        options={clientes.map((option) => `${option.nombres} ${option.apellidos}`)}
                                        {...field}
                                        renderInput={(params) => <TextField {...params} label="Nombre persona" />}
                                    />
                                )}/>
                          ) : showSearchDoc ? (
                                <Controller
                                    name="documento"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Documento" />
                                    )}
                                />
                        ) :
                        showSearchDate ? (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Basic date picker" />
                                </DemoContainer>
                            </LocalizationProvider>
                        ): ""}
                        <Button type="submit">Buscar</Button>
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}
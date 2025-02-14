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
import {listarClientes, listarClientesNombre} from "../../services/clientesService.ts";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Controller, useForm} from "react-hook-form";
import {TableRender} from "../../Layout/table-render.tsx";
import dayjs from "dayjs";
import {clientesForTables} from "../../utils/prevew-info-tables.ts";

export const ConsultarClientes : FC = () => {

    const {handleSubmit, control} = useForm();

    const [clientes, setClientes] = useState<any[]>([]);
    const [selectedOp, setSelectedOp] = useState<number>(0);
    const [showSearchNombre, setShowSearchNombre] = useState<boolean>(false);
    const [showSearchDoc, setShowSearchDoc] = useState<boolean>(false);
    const [showSearchDate, setSearchShowDate] = useState<boolean>(false);
    const [showButton, setShowButton] = useState<boolean>(false);
    const [renderTable, setRenderTable] = useState<boolean>(false);

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
        setSelectedOp(value);
        control._reset();
        setShowButton(true);
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
                setShowButton(false)
        }
    }

    const submitSearch = (search : any) => {
        switch (selectedOp) {
            case 1:
                { const {nombre} = search;
                listarClientesNombre(nombre.substring(0,nombre.indexOf(" "))).then(resp => {
                    setClientes(clientesForTables(resp));
                    setRenderTable(true);
                });

                break;
                }
            case 2:
                break;
            case 3:
                break;
        }
        console.log(search)
    }

    const editData = (data : any) => {
        console.log(data);
    }

    const deleteData = (data : any) => {
        console.log(data);
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
                                defaultValue=""
                                render={({ field }) => (
                                    <Autocomplete
                                        freeSolo
                                        sx={{ flexGrow: 1 }}
                                        options={clientes.map((option) => `${option.nombres} ${option.apellidos}`)}
                                        value={field.value || ""}
                                        onChange={(_, newValue) => field.onChange(newValue)}
                                        renderInput={(params) => <TextField {...params} label="Nombre persona" />}
                                    />
                                )}
                            />
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
                                <Controller
                                    name="fecha"
                                    control={control}
                                    defaultValue={null}
                                    render={({ field }) => (
                                        <DemoContainer components={["DatePicker"]}>
                                            <DatePicker
                                                label="Fecha de Nacimiento"
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(newValue) => field.onChange(newValue)}
                                            />
                                        </DemoContainer>
                                    )}
                                />
                            </LocalizationProvider>
                        ): ""}
                        {showButton ? (<Button type="submit">Buscar</Button>) : ""}
                    </form>
                </Box>
                {renderTable ? (
                    <Box>
                        <TableRender data={clientes} editData={editData} deleteData={deleteData}/>
                    </Box>
                ) : ""}
            </Paper>
        </Box>
    )
}
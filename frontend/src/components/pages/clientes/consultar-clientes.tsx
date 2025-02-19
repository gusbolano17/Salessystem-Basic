import {FC, useEffect, useState} from "react";
import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {
    listarClientes,
    listarClientesFecha,
    listarClientesNombre,
    obtenerClientDocumento
} from "../../services/clientesService.ts";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Controller, useForm} from "react-hook-form";
import {TableRender} from "../../Layout/table-render.tsx";
import dayjs from "dayjs";
import {clientesForTables} from "../../utils/prevew-info-tables.ts";
import {Documentos, OpcionesBusqueda} from "../../models/enums/clientes-enums.ts";

export const ConsultarClientes : FC = () => {

    const {handleSubmit, control, reset} = useForm();

    const [clientes, setClientes] = useState<any[]>([]);
    const [clientesOriginales, setClientesOriginales] = useState<any[]>([]);
    const [tipoBusqueda, setTipoBusqueda] = useState<OpcionesBusqueda | null>(null);
    const [showButton, setShowButton] = useState<boolean>(false);
    const [renderTable, setRenderTable] = useState<boolean>(false);

    const opcionesBusqueda = Object.entries(OpcionesBusqueda).map(([key, value]) => ({
        id: key,
        label: value
    }));

    const documentoS = Object.entries(Documentos).map(([key, value]) => ({
        id: key,
        label: value
    }));

    useEffect(() => {
        let isMounted = true;
        listarClientes().then(resp => {
            if(isMounted){
                setClientes(resp);
                setClientesOriginales(resp);
            }
        }).catch(console.error);
        return () => {isMounted = false}
    }, []);

    const handleSelect = (e : SelectChangeEvent) => {
        const value  = e.target.value as unknown as OpcionesBusqueda;
        reset()
        setTipoBusqueda(value);
        setShowButton(value !== OpcionesBusqueda.TODO);
        setRenderTable(value === OpcionesBusqueda.TODO);
        if(value === OpcionesBusqueda.TODO){
            setClientes(clientesForTables(clientesOriginales));
        }
    }

    const submitSearch = (search: any) => {
        if (tipoBusqueda === OpcionesBusqueda.NOMBRE) {
            const { nombre } = search;
            const primerNombre = nombre.split(" ")[0];
            listarClientesNombre(primerNombre).then(resp => {
                setClientes(clientesForTables(resp));
                setRenderTable(true);
            });
        }else if(tipoBusqueda === OpcionesBusqueda.DOCUMENTO){
            const {tipoDocumento, documento} = search;
            obtenerClientDocumento(tipoDocumento, documento).then(resp => {
                setClientes(clientesForTables(resp));
                setRenderTable(true);
            })
        }else if(tipoBusqueda === OpcionesBusqueda.FECHA){
            const {fecha : {$d}} = search;
            listarClientesFecha($d.toISOString()).then(resp => {
                setClientes(clientesForTables(resp));
                setRenderTable(true);
            })
        }
    };

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
                        {tipoBusqueda === OpcionesBusqueda.NOMBRE ? (
                            <Controller
                                name="nombre"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Autocomplete
                                        freeSolo
                                        sx={{ flexGrow: 1 }}
                                        options={clientesOriginales.map((option) => `${option.nombres} ${option.apellidos}`)}
                                        value={field.value || ""}
                                        onChange={(_, newValue) => field.onChange(newValue)}
                                        renderInput={(params) => <TextField {...params} label="Nombre persona" />}
                                    />
                                )}
                            />
                          ) : tipoBusqueda === OpcionesBusqueda.DOCUMENTO ? (
                                <Box gap={2} display="flex">
                                    <Controller
                                        name="tipoDocumento"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                displayEmpty
                                                sx={{ minWidth: 120 }}
                                            >
                                                <MenuItem value="">Seleccione una opción</MenuItem>
                                                {documentoS.map(op => (
                                                    <MenuItem key={op.id} value={op.id}>{op.label}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                    <Controller
                                        name="documento"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <TextField {...field} label="Documento" />}
                                    />
                                </Box>
                        ) :
                        tipoBusqueda === OpcionesBusqueda.FECHA && (
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
                        )}
                        {showButton && (<Button type="submit">Buscar</Button>)}
                    </form>
                </Box>
                {renderTable && (
                    <Box>
                        <TableRender data={clientes} editData={editData} deleteData={deleteData}/>
                    </Box>
                )}
            </Paper>
        </Box>
    )
}
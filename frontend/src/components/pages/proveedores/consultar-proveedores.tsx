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
import {OpcionesBusqueda} from "../../models/enums/clientes-enums.ts";
import {Controller, useForm} from "react-hook-form";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import {TableRender} from "../../Layout/table-render.tsx";
import {ModalFormEdit} from "../../utils/modal-form-edit.tsx";
import {Toast} from "../../utils/toast.tsx";
import {OpcProveedorEnum} from "../../models/enums/proveedor-enums.ts";
import {Proveedor} from "../../models/proveedor-model.ts";
import {ProveedorForm} from "../../forms/ProveedorForm.tsx";
import {listarClientes} from "../../services/clientesService.ts";
import {listarProveedores} from "../../services/proveedorService.ts";
import {clientesForTables, proveedorForTables} from "../../utils/prevew-info-tables.ts";

export const ConsultarProveedores : FC = () => {

    const opcionesBusqueda = Object.entries(OpcProveedorEnum).map(([key, value]) => ({
        id: key,
        label: value
    }));

    const {handleSubmit, control, reset, setValue} = useForm();

    const [proveedores, setProveedores] = useState<any[]>([]);
    const [proveedoresOrg, setProveedoresOrg] = useState<Proveedor[]>([]);
    const [selectProveedor, setSelectProveedor] = useState<Proveedor>()
    const [tipoBusqueda, setTipoBusqueda] = useState<OpcProveedorEnum | null>(null);
    const [showButton, setShowButton] = useState<boolean>(false);
    const [renderTable, setRenderTable] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [toastMsg, setToastMsg] = useState<string>("");
    const [openToast, setOpenToast] = useState<boolean>(false);

    useEffect(() => {
        listarProv();
    }, []);

    const listarProv = () => {
        let isMounted = true;
        listarProveedores().then(resp => {
            if(isMounted){
                setProveedores(resp);
                setProveedoresOrg(resp);
            }
        }).catch(console.error);
        return () => {isMounted = false}
    }

    const handleSelect = (e : SelectChangeEvent) => {
        const value  = e.target.value as unknown as OpcProveedorEnum;
        reset()
        setTipoBusqueda(value);
        setShowButton(value !== OpcProveedorEnum.TODO);
        setRenderTable(value === OpcProveedorEnum.TODO);
        if(value === OpcProveedorEnum.TODO){
            setProveedores(proveedorForTables(proveedoresOrg));
        }
    }

    const submitSearch = () => {

    }

    const editarProveedor = (proveedor : Proveedor) => {

    }

    const editData = (data : any) => {
        const provEd = proveedoresOrg.find(pr => pr.nit === data);
        setSelectProveedor(provEd);
        setOpenModal(true);
    }

    const deleteData = (data : any) => {
        console.log(data);
    }

    const handleToggleModal = () => {
        setOpenModal(false);
    }


    return (
        <>
            <Box>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6">
                            Consultar proveedores
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
                            {tipoBusqueda === OpcProveedorEnum.NOMBRE ? (
                                <Controller
                                    name="nombre"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Autocomplete
                                            freeSolo
                                            sx={{ flexGrow: 1 }}
                                            options={proveedoresOrg.map((option) => `${option.nombre}`)}
                                            value={field.value || ""}
                                            onChange={(_, newValue) => field.onChange(newValue)}
                                            renderInput={(params) => <TextField {...params} label="Nombre persona" />}
                                        />
                                    )}
                                />
                            ) : tipoBusqueda === OpcProveedorEnum.NIT ? (
                                    <Box gap={2} display="flex">
                                        <Controller
                                            name="documento"
                                            defaultValue=""
                                            control={control}
                                            render={({ field }) => <TextField {...field} label="Documento" />}
                                        />
                                    </Box>
                                ) :
                                tipoBusqueda === OpcProveedorEnum.FECHA && (
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
                            <TableRender data={proveedores} editData={editData} deleteData={deleteData}/>
                        </Box>
                    )}
                </Paper>
            </Box>
            {openModal ? (
                <ModalFormEdit onClose={handleToggleModal}>
                    <ProveedorForm enviarDatos={editarProveedor} data={selectProveedor}/>
                </ModalFormEdit>
            ) : ""}
            <Toast open={openToast} msg={toastMsg} color={"success"} onClose={() => setOpenToast(false)}/>
        </>
    )
}
import {
    Button, Card, CardContent, CardHeader,
    Divider,
    Grid2,
    TextField,
    Typography
} from "@mui/material";
import {FC, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import * as React from "react";
import {Proveedor} from "../models/proveedor-model.ts";
import {Producto} from "../models/producto-model.ts";
import {ModalFormEdit} from "../utils/modal-form-edit.tsx";
import {ProductoForm} from "./ProductoForm.tsx";

type ProveedorFormProps = {
    data? : Proveedor;
    enviarDatos : (proveedor: Proveedor, productos : Producto[]) => void;
}

export const ProveedorForm: FC<ProveedorFormProps> = ({data, enviarDatos}) => {

    const {register, formState : {errors} ,handleSubmit, reset} = useForm<Proveedor>();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [openProductModal, setOpenProductModal] = useState<boolean>(false);

    useMemo(() => {
        console.log(productos);
        if(data){
            reset(data);
            setProductos(data.productos || [])
        }
    }, [data, productos, reset]);

    const enviarProveedor = (proveedor: Proveedor) => {
        enviarDatos(proveedor, productos);
        setProductos([]);
        reset();
    }

    const obtenerProductos = (it : Producto) => {
        setProductos((prevItems) => [...prevItems, it]);
        setOpenProductModal(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit(enviarProveedor)}>
                <Typography variant="h5" gutterBottom>
                    Información Básica
                </Typography>
                <Grid2 container spacing={2}>
                    <Grid2 size={{xs : 12, sm : 6}}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            variant="outlined"
                            {...register("nombre", {
                                required : "El nombre es obligatorio"
                            })
                            }
                            error={!!errors.nombre}
                            helperText={errors.nombre?.message as React.ReactNode}
                        />
                    </Grid2>
                    <Grid2 size={{xs : 12, sm : 6}}>
                        <TextField
                            fullWidth
                            label="NIT"
                            variant="outlined"
                            {...register("nit", {
                                required : "El NIT es obligatorio"
                            })
                            }
                            error={!!errors.nit}
                            helperText={errors.nit?.message as React.ReactNode}
                        />
                    </Grid2>
                    <Grid2 size={{xs : 12}}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            {...register("email", {
                                required : "El correo electronico es obligatorio"
                            })
                            }
                            error={!!errors.email}
                            helperText={errors.email?.message as React.ReactNode}
                        />
                    </Grid2>
                </Grid2>

                <Divider sx={{ marginY: 3 }} />

                <Typography variant="h5" gutterBottom>
                    Información Adicional
                </Typography>
                <Grid2 container spacing={3}>
                    <Grid2 size={{xs : 12, sm : 6}}>
                        <TextField fullWidth label="Telefono" variant="outlined" {...register("telefono")}/>
                    </Grid2>
                    <Grid2 size={{xs : 12, sm : 6}}>
                        <TextField fullWidth label="Direccion" variant="outlined"  {...register("direccion")}/>
                    </Grid2>
                </Grid2>
                <Divider sx={{ marginY: 3 }} />
                <Typography variant="h5" gutterBottom>
                    Productos
                </Typography>
                <Grid2 container spacing={2} gap={10}>
                    {productos.map((p, index) => (
                        <Grid2 sx={{xs : 12, sm : 4}} key={index}>
                            <Card sx={{ p: 2, width: "100%" }} variant="outlined">
                                <CardHeader title={p.nombre} sx={{alignItems : "center"}} />
                                <Divider/>
                                <CardContent>
                                    <Typography>Descripcion : {p.descripcion}</Typography>
                                    <Typography>Stock : {p.stock}</Typography>
                                    <Typography>Precio : {p.precio}</Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
                <Grid2 container direction='row' marginY={4} gap={2}>
                    <Button type='button' color="info" variant="contained" onClick={() => {setOpenProductModal(true)}}>agregar producto</Button>
                    <Button type='submit' color="success" variant="contained" disabled={productos.length == 0}>{data ? "Editar proveedor" : "Registrar proveedor"}</Button>
                </Grid2>
            </form>
            {openProductModal ? (
                <ModalFormEdit onClose={() => {setOpenProductModal(false)}}>
                    <ProductoForm enviarDatos={obtenerProductos}/>
                </ModalFormEdit>
            ) : ""}
        </>
    )
}
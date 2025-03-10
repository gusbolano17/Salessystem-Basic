import {
    Button,
    Divider,
    Grid2,
    TextField,
    Typography
} from "@mui/material";
import {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import * as React from "react";
import {Proveedor} from "../models/proveedor-model.ts";

type ProveedorFormProps = {
    data? : Proveedor;
    enviarDatos : (proveedor: Proveedor) => void;
}

export const ProveedorForm: FC<ProveedorFormProps> = ({data, enviarDatos}) => {

    const {register, formState : {errors} ,handleSubmit, reset} = useForm<Proveedor>();

    useEffect(() => {
        if(data){
            reset(data);
        }
    }, [data, reset]);

    const enviarProveedor = (proveedor: Proveedor) => {
        enviarDatos(proveedor);
        reset();
    }

    return (
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
            <Grid2 container direction='column' marginY={4}>
                <Button type='submit' color="success" variant="contained">{data ? "Editar proveedor" : "Registrar proveedor"}</Button>
            </Grid2>
        </form>
    )
}
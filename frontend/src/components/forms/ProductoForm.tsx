import {FC} from "react";
import {Button, Grid2, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {Producto} from "../models/producto-model.ts";
import * as React from "react";

type ProductoFormProps = {
    data?: Producto;
    enviarDatos : (d : Producto) => void
}

export const ProductoForm : FC<ProductoFormProps> = ({data, enviarDatos}) => {

    const {register, formState : {errors} ,handleSubmit, reset} = useForm<Producto>();

    const submitProducto = (data : Producto) => {
        enviarDatos(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(submitProducto)}>
            <Typography variant="h5" gutterBottom align="center">
                Info producto
            </Typography>
            <Grid2 container spacing={2}>
                <Grid2 size={{xs : 12, sm : 6}}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        variant="outlined"
                        {...register("nombre", {
                            required : "El nombre del producto es obligatorio"
                        })
                        }
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message as React.ReactNode}
                    />
                </Grid2>
                <Grid2 size={{xs : 12, sm : 6}}>
                    <TextField
                        fullWidth
                        type="number"
                        label="stock"
                        variant="outlined"
                        {...register("stock", {
                            required : "El stock o existencias es obligatorio"
                        })
                        }
                        error={!!errors.stock}
                        helperText={errors.stock?.message as React.ReactNode}
                    />
                </Grid2>
                <Grid2 size={{xs : 12}}>
                    <TextField
                        fullWidth
                        label="precio"
                        type="number"
                        variant="outlined"
                        {...register("precio", {
                            required : "el precio por unidad es obligatorio"
                        })
                        }
                        error={!!errors.precio}
                        helperText={errors.precio?.message as React.ReactNode}
                    />
                </Grid2>
                <Grid2 size={{xs : 12}}>
                    <TextField
                        fullWidth
                        label="descripcion"
                        variant="outlined"
                        {...register("descripcion", {
                            required : "la descripcion es obligatoria"
                        })
                        }
                        error={!!errors.descripcion}
                        helperText={errors.descripcion?.message as React.ReactNode}
                    />
                </Grid2>
            </Grid2>
            <Grid2 container direction='column' marginY={4}>
                <Button type='submit' color="success" variant="contained">Agregar producto</Button>
            </Grid2>
        </form>
    )
}
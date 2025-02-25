import {
    Button,
    Divider,
    FormControl,
    Grid2,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Cliente} from "../models/cliente-model.ts";
import {Locaciones} from "../models/locaciones.ts";

type ClienteFormProps = {
    data? : Cliente;
    enviarDatos : (cliente: Cliente) => void;
    estados : Locaciones[];
    ciudades : string[];
    handleEstadoChange : (event : SelectChangeEvent) => void;
}

export const ClienteForm: FC<ClienteFormProps> = ({data, estados, ciudades, enviarDatos, handleEstadoChange}) => {

    const {register, formState : {errors} ,handleSubmit, reset} = useForm<Cliente>();

    useEffect(() => {
        if(data){
            reset(data);
        }
    }, [data, reset]);

    const enviarCliente = (cliente : Cliente) => {
        enviarDatos(cliente);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(enviarCliente)}>
            <Typography variant="h5" gutterBottom>
                Información Básica
            </Typography>
            <Grid2 container spacing={2}>
                <Grid2 size={{xs : 12, sm : 6}}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        variant="outlined"
                        {...register("nombres", {
                            required : "El nombre es obligatorio"
                        })
                        }
                        error={!!errors.nombres}
                        helperText={errors.nombres?.message as React.ReactNode}
                    />
                </Grid2>
                <Grid2 size={{xs : 12, sm : 6}}>
                    <TextField
                        fullWidth
                        label="Apellido"
                        variant="outlined"
                        {...register("apellidos", {
                            required : "El apellido es obligatorio"
                        })
                        }
                        error={!!errors.apellidos}
                        helperText={errors.apellidos?.message as React.ReactNode}
                    />
                </Grid2>
                <Grid2 size={{xs : 12, sm : 6}}>
                    <TextField
                        fullWidth
                        label="Tipo Documento"
                        variant="outlined"
                        {...register("tipoDocumento", {
                            required : "El tipo de documento es obligatorio"
                        })
                        }
                        error={!!errors.tipoDocumento}
                        helperText={errors.tipoDocumento?.message as React.ReactNode}
                    />
                </Grid2>
                <Grid2 size={{xs : 12, sm : 6}}>
                    <TextField
                        fullWidth
                        label="Documento"
                        variant="outlined"
                        {...register("documento", {
                            required : "El documento es obligatorio"
                        })
                        }
                        error={!!errors.documento}
                        helperText={errors.documento?.message as React.ReactNode}
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
                <Grid2 size={{xs : 12, sm : 6}}>
                    <TextField fullWidth label="Tipo de persona" variant="outlined"  {...register("tipoPersona")}/>
                </Grid2>
                <Grid2 size={{xs : 12, sm : 6}}>
                    <TextField fullWidth label="Pais" variant="outlined"   {...register("locacion.pais")}/>
                </Grid2>
                <Grid2 size={{xs : 12, sm : 6}}>
                    <FormControl fullWidth>
                        <InputLabel id="estado-label">Estado</InputLabel>
                        <Select
                            id="estado-label"
                            {...register("locacion.estado")}
                            defaultValue=""
                            label="Estado"
                            disabled={estados.length === 0}
                            onChange={handleEstadoChange}
                        >
                            {estados.map((option) => (
                                <MenuItem key={option._id} value={option.estado}>
                                    {option.estado}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={{xs : 12, sm : 6}}>
                    <FormControl fullWidth>
                        <InputLabel id="label-ciudad">Ciudad</InputLabel>
                        <Select
                            id="label-ciudad"
                            {...register("locacion.ciudades")}
                            defaultValue=""
                            label="Ciudad"
                            disabled={ciudades.length === 0}
                        >
                            {ciudades.map((city) => (
                                <MenuItem key={city} value={city}>
                                    {city}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
            </Grid2>
            <Grid2 container direction='column' marginY={4}>
                <Button type='submit' color="success" variant="contained">{data ? "Editar cliente" : "Registrar cliente"}</Button>
            </Grid2>
        </form>
    )
}
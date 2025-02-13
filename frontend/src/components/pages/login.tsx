import {FC} from 'react';
import {Avatar, Button, Grid2, Paper, TextField, Typography} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import * as React from "react";
import {login} from "../services/loginService.ts";
import {useNavigate} from "react-router-dom";

type FormLoginProps = {
    usuario: string;
    password: string;
}

export const Login : FC = () => {

    const paperSt = {padding : 20, height : '70vh', width: 300};
    const sxProps = {alignItems : 'center', justifyContent : 'center'};
    const avatarSt = {backgroundColor : '#9c27b0'};

    const {register, formState : {errors}, handleSubmit} = useForm<FormLoginProps>();
    const navigate = useNavigate();

    const submitForm = async (data:any) => {
        try{
            const logData = await login(data);
            sessionStorage.setItem("token", logData.token);
            navigate("/dashboard");
        }catch (err){
            console.log(err);
        }
    }

    return (
        <Grid2 display='flex' alignItems='center' justifyContent='center'>
            <Paper elevation={10} style={paperSt}>
                <Grid2 container direction="column" sx={sxProps}>
                    <Avatar style={avatarSt}><LockOutlined/></Avatar>
                    <Typography variant="h4">Login</Typography>
                </Grid2>
                <form onSubmit={handleSubmit(submitForm)}>
                    <Grid2 container direction="column">
                        <TextField
                            margin="normal"
                            label="Username"
                            variant="standard"
                            fullWidth
                            {...register("usuario", {
                                required : "El username es obligatorio"
                            })
                            }
                            error={!!errors.usuario}
                            helperText={errors.usuario?.message as React.ReactNode}
                        />
                        <TextField
                            margin="normal"
                            type="password"
                            label="Password"
                            variant="standard"
                            fullWidth
                            {...register("password", {
                                required : "la password es obligatoria"
                            })
                            }
                            error={!!errors.password}
                            helperText={errors.password?.message as React.ReactNode}
                        />
                    </Grid2>
                    <Grid2 container direction='column' marginY={4}>
                        <Button type='submit' color="secondary" variant="contained">LogIN</Button>
                    </Grid2>
                </form>
            </Paper>
        </Grid2>
    )
}
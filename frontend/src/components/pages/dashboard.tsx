import {FC} from "react";
import {Box, Card, CardContent, CardHeader, Grid2, Typography} from "@mui/material";

export const Dashboard : FC = () => {

    return (
        <Box display={"flex"}>
            <Box component="main" flexGrow={1} p={3}>
                <Grid2 container spacing={2}>
                    <Grid2 size={8}>
                        <Card>
                            <CardHeader>
                                <Typography>Hola</Typography>
                            </CardHeader>
                            <CardContent>
                                Mundo
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={4}>
                    </Grid2>
                    <Grid2 size={4}>
                    </Grid2>
                    <Grid2 size={8}>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    )
}
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button} from "@mui/material";

type TableRenderProps<T> = {
    data : T[]
    editData : (id : T) => void
    deleteData : (id : T) => void
}

export const TableRender = <T extends { [key: string]: any }>({ data, editData, deleteData }: TableRenderProps<T>) => {

    // Obtener las claves dinámicamente del primer objeto
    const keys = Object.keys(data[0]) as (keyof T)[];

    const formatValue = (value: any) => {
        if (Array.isArray(value)) {
            return value.join(", ");
        } else if (typeof value === "object" && value !== null) {
            return JSON.stringify(value);
        } else if (value instanceof Date) {
            return value.toLocaleString();
        }
        return String(value);
    };

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {keys.map((key) => (
                            <TableCell key={String(key)}>{String(key)}</TableCell>
                        ))}
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {keys.map((key) => (
                                <TableCell key={String(key)}>{formatValue(row[key])}</TableCell>
                            ))}
                            <TableCell>
                                <Button variant="contained" onClick={() => editData(row.Documento)} color="warning">Editar</Button>
                                <Button variant="contained" onClick={() => deleteData(row.Documento)} color="error" sx={{ marginLeft: 1 }}>Eliminar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
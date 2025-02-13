import { FC } from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LayoutComponent} from "./components/Layout/layout-component.tsx";
import {Login} from "./components/pages/login.tsx";
import {Dashboard} from "./components/pages/dashboard.tsx";
import {Productos} from "./components/pages/productos.tsx";
import {Proveedores} from "./components/pages/proveedores.tsx";
import {Ventas} from "./components/pages/ventas.tsx";
import {PrivateRoute} from "./components/services/private-route.tsx";
import {ConsultarClientes} from "./components/pages/clientes/consultar-clientes.tsx";
import {CrearClientesPage} from "./components/pages/clientes/crear-clientes.tsx";
import {ClientesParent} from "./components/pages/clientes/clientesParent.tsx";


export const App: FC = () => {

    return (
        <BrowserRouter>
            <LayoutComponent>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute/>}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/clientes" element={<ClientesParent/>}>
                            <Route path="consultar" element={<ConsultarClientes/>}/>
                            <Route path="agregar" element={<CrearClientesPage/>}/>
                        </Route>
                        <Route path="/productos" element={<Productos />} />
                        <Route path="/proveedores" element={<Proveedores />} />
                        <Route path="/ventas" element={<Ventas />} />
                    </Route>
                </Routes>
            </LayoutComponent>
        </BrowserRouter>
    );
};


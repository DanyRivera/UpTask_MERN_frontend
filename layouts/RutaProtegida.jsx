import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../src/hook/useAuth";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    if(cargando) return "Cargando..."

    return (
        <>
            {auth._id ? (
                <div className="bg-gray-100">
                    <Header />

                    <div className="md:flex md:min-h-screen">
                        <SideBar />

                        <main className="flex-1 p-5 md:p-10">
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to="/" />} 
        </>
    )
}

export default RutaProtegida
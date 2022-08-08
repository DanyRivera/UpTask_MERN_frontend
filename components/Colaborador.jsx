import useProyectos from "../src/hook/useProyectos";
import useAdmin from "../src/hook/useAdmin";

const Colaborador = ({ colaborador }) => {

    const { handleModalEliminarColaborador } = useProyectos();
    const admin = useAdmin();
    const { nombre, email } = colaborador;

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p>{nombre}</p>
                <p className="text-sm text-gray-700">{email}</p>
            </div>
            {admin && (
                <div>
                    <button
                        onClick={() => handleModalEliminarColaborador(colaborador)}
                        type="button"
                        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg "
                    >Eliminar</button>
                </div>
            )}

        </div>
    )
}

export default Colaborador
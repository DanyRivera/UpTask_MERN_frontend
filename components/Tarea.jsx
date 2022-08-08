import useProyectos from "../src/hook/useProyectos";
import useAdmin from "../src/hook/useAdmin";
import { formatearFecha } from "../src/helpers/formatearFecha";

const Tarea = ({ tarea }) => {

  const { descripcion, nombre, prioridad, fechaEntrega, _id, estado } = tarea;
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();
  const admin = useAdmin();

  return (
    <div className="border p-5 flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="text-xl mb-1">{nombre}</p>
        <p className="text-sm text-gray-500 uppercase mb-1">{descripcion}</p>
        <p className="text-sm mb-1">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600 mb-1">Prioridad: {prioridad}</p>
        {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por {tarea.completado.nombre}</p>}
      </div>
      <div className="flex flex-col lg:flex-row gap-3">

        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditarTarea(tarea)}
          >Editar</button>
        )}

        <button
          onClick={() => completarTarea(tarea._id)}
          className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} outline-none px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
        >{estado ? 'Completa' : 'Imcompleta'}</button>

        {admin && (
          <button
            onClick={() => handleModalEliminarTarea(tarea)}
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          >Eliminar</button>
        )}

      </div>
    </div >
  )
}

export default Tarea
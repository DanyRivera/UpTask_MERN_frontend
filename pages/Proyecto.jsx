import { useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import useProyectos from "../src/hook/useProyectos";
import useAdmin from "../src/hook/useAdmin";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import io from "socket.io-client";

let socket;

const Proyecto = () => {

  const { id } = useParams();
  const { obtenerProyecto, proyecto, cargando, handleModalTarea, submitTareasProyecto, submitEliminarTareasProyecto, submitEditarTareasProyecto, submitCambiarEstadoTareas } = useProyectos();
  const admin = useAdmin();

  useEffect(() => {

    obtenerProyecto(id);

  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('abrir proyecto', id);
  }, [])

  useEffect(() => {

    socket.on('tarea agregada', tareaNueva => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva)
      }
    })

    socket.on('tarea eliminada', tarea => {
      if (tarea.proyecto === proyecto._id) {
        submitEliminarTareasProyecto(tarea);
      }
    })

    socket.on('tarea editada', tarea => {
      if(tarea.proyecto._id === proyecto._id) {
        submitEditarTareasProyecto(tarea);
      }
    })

    socket.on('estado cambiado', tarea => {
      if(tarea.proyecto._id === proyecto._id) {
        submitCambiarEstadoTareas(tarea);
      }
    })
  })

  const { nombre } = proyecto;

  if (cargando) return "Cargando..."

  return (

    <>

      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1 >

        {admin && (
          <div className="flex items-center gap-2 text-gray-400 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <Link
              to={`/proyectos/editar/${id}`}
              className="uppercase font-bold"
            >Editar</Link>
          </div>
        )}

      </div >

      {admin && (
        <button
          type="button"
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
          onClick={handleModalTarea}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Nueva Tarea
        </button>

      )}

      <p className="font-bold text-xl mt-10">Tareas del proyecto</p>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ?
          proyecto.tareas.map(tarea => (
            <Tarea tarea={tarea} key={tarea._id} />
          ))
          : (
            <p className="text-center my-5 p-10">No hay tareas en este proyectos</p>
          )}
      </div>

      <div className="flex items-center justify-between mt-10">
        <p className="font-bold text-xl">Colaboradores</p>
        {admin && (
          <Link
            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            className="text-gray-400 hover:text-black uppercase font-bold"
          >A??adir</Link>
        )}
      </div>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.colaboradores?.length ?
          proyecto.colaboradores.map(colaborador => (
            <Colaborador colaborador={colaborador} key={colaborador._id} />
          ))
          : (
            <p className="text-center my-5 p-10">No hay colaboradores en este proyectos</p>
          )}
      </div>

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />

    </>
  )

}

export default Proyecto
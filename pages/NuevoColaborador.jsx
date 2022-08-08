import FormularioColaborador from "../components/FomularioColaborador"
import useProyectos from "../src/hook/useProyectos"
import Alerta from "../components/Alerta";

const NuevoColaborador = () => {

  const { proyecto, colaborador, cargando, agregarColaborador, alerta, mostrarAlerta } = useProyectos();

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-black">Añadir Colaborador(a) al proyecto: {proyecto.nombre}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {cargando ? <p className="text-center mt-10">Cargando...</p> : colaborador?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
            <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="mb-3 md:mb-0">{colaborador.nombre}</p>
              <button
                onClick={() => agregarColaborador({
                  email: colaborador.email
                })}
                type="button"
                className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
              >Agregar al Proyecto</button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default NuevoColaborador
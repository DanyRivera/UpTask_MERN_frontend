import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../src/config/clienteAxios";

const NuevoPassword = () => {

  const { token } = useParams();
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState('');
  const [passwordModificado, setPasswordModificado] = useState('');

  useEffect(() => {

    const confirmarToken = async () => {

      try {

        await clienteAxios(`/usuarios/olvide-password/${token}`);

        setTokenValido(true);

      } catch (error) {

        setAlerta({
          msg: error.response.data.msg,
          error: true
        })

      }

    }
    confirmarToken();

  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if (password === '' || password.length < 6) {
      setAlerta({
        msg: "Password no válido",
        error: true
      })
      return;
    }

    try {

      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password })

      setAlerta({
        msg: data.msg,
        error: false
      })

      setPassword('');
      setPasswordModificado(true);

    } catch (error) {

      setAlerta({
        msg: data.msg,
        error: true
      })

    }

  }


  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl md:text-6xl capitalize">Resetea tu password y no pierdas acceso a tus <span className="text-slate-700">Proyectos</span></h1>


      {msg && (
        <Alerta alerta={alerta} />
      )}

      {tokenValido && (

        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >Nuevo Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu nuevo password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar nuevo password"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
          />

        </form>

      )}

      {passwordModificado && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >Inicia Sesión</Link>
      )}

    </>
  )
}

export default NuevoPassword
import { api } from 'src/boot/axios';
import { formatApiData } from '.';



export const getUsuarioId = async () => {
  try {
    const url = 'usuario/id';
    const data = formatApiData();
    const response = await api.post(url, data);

    return response
  } catch (error) {
    throw new Error(error as string);
  }
}

export const getDadosUsuario = async (values: { idUsuario: string }) => {
  try {
    const url = 'usuario';
    const data = formatApiData(values);
    const response = await api.post(url, data);

    return response
  } catch (error) {
    throw new Error(error as string);
  }
}


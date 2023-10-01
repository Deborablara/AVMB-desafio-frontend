import { api } from 'src/boot/axios';
import { formatApiData } from '.';

export const getRepositorio = async (values: { idRepositorio: string }) => {
  try {
    const url = 'repositorio/id';
    const data = formatApiData(values);
    const response = await api.post(url, data);

    return response
  } catch (error) {
    throw new Error(error as string);
  }
}




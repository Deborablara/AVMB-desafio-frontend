import { api } from 'src/boot/axios';
import { formatApiData } from '.';

export const getEnvelopes = async (values: { idRepositorio: string }) => {
  try {
    const url = 'envelopes/by-repo';
    const data = formatApiData(values);
    const response = await api.post(url, data);

    return response
  } catch (error) {
    throw new Error(error as string);
  }
}

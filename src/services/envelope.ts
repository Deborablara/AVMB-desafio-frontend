import { api } from 'src/boot/axios';
import { formatApiData } from '.';
import { FormEnvelopeData, SignatarioFormData } from './types';

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

export const encaminharEnvelopeParaAssinatura = async (values: { id: string }) => {
  const formatValues = {
    Envelope: values
  };

  const url = 'envelopes/forward-for-signature';
  const data = formatApiData(formatValues);
  const response = await api.post(url, data);

  return response

}


export const novoEnvelope = async (values: FormEnvelopeData) => {
  const url = 'envelopes/new';
  const data = formatApiData(values);
  const response = await api.post(url, data);

  return response

}

export const buscarDocumento = async (values: { envelope_id: string }) => {
  const url = 'envelopes/documento';
  const data = formatApiData(values);
  const response = await api.post(url, data);

  return response

}

export const buscarSignatarios = async (values: { idEnvelope: string }) => {
  const url = 'envelopes/signatarios';
  const data = formatApiData(values);
  const response = await api.post(url, data);

  return response

}


export const adicionarSignatario = async (values: SignatarioFormData) => {
  const url = 'envelopes/signatario';
  const data = formatApiData(values);
  const response = await api.post(url, data);

  return response

}

export const uploadArquivo = async (data: FormData) => {
  const url = 'envelopes/upload';
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  };
  const response = await api.post(url, data, config);

  return response

}


import useNotify from 'src/composables/useNotify';
import { buscarDocumento } from 'src/services/envelope';
import { Envelope } from 'src/services/types';

const { notifyError } = useNotify();

export const downloadDocumento = async (envelope: Envelope) => {
  try {
    const response = await buscarDocumento({ envelope_id: envelope.id as string });


    if (response) {
      console.log('entrei');
      const { nome_arquivo, conteudo, mimeType } = response.data.data;

      console.log(response.data.data);

      const byteCharacters = atob(conteudo);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });


      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = nome_arquivo;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } else {
      notifyError('Erro ao buscar documento');
    }
  } catch (error) {
    notifyError('Erro ao fazer download do documento');
  }
};


import { Notify } from 'quasar'

export default function useNotify() {

  const notifySuccess = (message: string) => {
    Notify.create({
      type: 'positive',
      message: message || 'Sucesso',
    });
  }

  const notifyError = (message: string) => {
    Notify.create({
      type: 'negative',
      message: message || 'Erro',
    });
  }


  return {
    notifySuccess,
    notifyError,
  }
}

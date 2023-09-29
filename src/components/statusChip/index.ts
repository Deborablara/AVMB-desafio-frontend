import { QChip } from 'quasar';
import { h } from 'vue';

export const formatStatus = (status: string) => {
  switch (status) {
    case '1':
      return h(QChip, {
        color: 'yellow',
        textColor: 'black',
        label: 'Em construção',
        outlined: true,
      });
      break;
    case '2':
      return h(QChip, {
        color: 'blue',
        textColor: 'white',
        label: 'Aguardando Assinaturas',
        outlined: true,
      });
      break;
    case '3':
      return h(QChip, {
        color: 'green',
        textColor: 'white',
        label: 'Concluído',
        outlined: true,
      });
      break;
    case '4':
      return h(QChip, {
        color: 'gray',
        textColor: 'white',
        label: 'Arquivado',
        outlined: true,
      });
      break;
    case '5':
      return h(QChip, {
        color: 'red',
        textColor: 'white',
        label: 'Cancelado',
        outlined: true,
      });
      break;
    case '6':
      return h(QChip, {
        color: 'orange',
        textColor: 'white',
        label: 'Expirado',
        outlined: true,
      });
      break;
    default:
      return h(QChip, {
        color: 'black',
        textColor: 'white',
        label: 'Desconhecido',
        outlined: true,
      });
      break;
  }
};

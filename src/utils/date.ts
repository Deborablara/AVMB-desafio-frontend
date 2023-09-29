import { format } from 'date-fns';

export const formatDate = (data: string) => {
  const dataFormatada = new Date(data);
  return format(dataFormatada, 'dd/MM/yyyy HH:mm');
}

export type Usuario = {
  id: string;
  nome: string;
}

export type Envelope = {
  id: string;
  descricao: string;
  dataHoraCriacao: string;
  status: string;
}

export type Documento = {
  conteudo: string;
  mimeType: string;
  nomeArquivo: string;
}

export type Repositorio = {
  id: string;
  nome?: string;
}


export type FormEnvelopeData = {
  descricao: string;
  Repositorio: Repositorio;
  listaDocumentos: {
    Documento: Documento[];
  };
  listaSignatariosEnvelope?: {
    SignatarioEnvelope: any[];
  };
}


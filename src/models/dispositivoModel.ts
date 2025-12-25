import type CoordenadaModel from "./coordenadaModel";

export default interface DispositivoModel {
  id: string,
  condominioId:string;
  nome: string,
  aberto: boolean,
  distanciaMinima: number,
  coordenadas: CoordenadaModel,
  permiteAcionamentoRemoto:boolean;
  token:string;
  distanciaCalculada?:number
};

import CoordenadaModel from "./coordenadaModel";

export default interface DispositivoModel {
  id: string,
  nome: string,
  aberto: boolean,
  distanciaMinima: number,
  coordenadas: CoordenadaModel
};

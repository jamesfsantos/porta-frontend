import type DispositivoModel from "./dispositivoModel";
import type  HospedeModel from "./hospedeModel";
import type { EStatusReserva } from "./types/EStatusReserva.enum";
import type UnidadeModel from "./unidadeModel";

export default interface ReservaModel {
  dispositivos: DispositivoModel[],
  id: string,
  codigo:string,
  hospede: HospedeModel,
  unidade:UnidadeModel,
  dataEntrada: Date,
  dataSaida: Date,
  statusReserva: EStatusReserva
};

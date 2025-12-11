import DispositivoModel from "./dispositivoModel";
import HospedeModel from "./hospedeModel";

export default interface ReservaModel {
  dispositivos: DispositivoModel[],
  id: string,
  hospede: HospedeModel,
  dataInicio: Date,
  dataFim: Date,
};

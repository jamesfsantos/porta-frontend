import type ReservaModel from "@/models/reservaModel";
import apiClient from "./apiService";
import type { Resultado } from "@/models/types/resultado.type";
import type { AcionamentoType } from "@/models/types/acionamentoType";


class AcionamentoService {
  async acionarDispositivo(acionamentoDispositivo: AcionamentoType): Promise<Resultado<any | null>> {

    const { condominioId, dispositivoId } = acionamentoDispositivo;
    const result = await apiClient.post<AcionamentoType>(`condominios/${condominioId}/dispositivos/${dispositivoId}/acionamentoRemoto`,acionamentoDispositivo);
    return result;

  }
}
export default new AcionamentoService();

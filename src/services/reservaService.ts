import type ReservaModel from "@/models/reservaModel";
import apiClient from "./apiService";
import type { Resultado } from "@/models/types/resultado.type";


class ReservaService {
  async obterReservaAsync(id: string): Promise<Resultado<ReservaModel | null>> {
    const result = await apiClient.get<ReservaModel>(`reservas/${id}`);
    return result;

  }
}
export default new ReservaService();

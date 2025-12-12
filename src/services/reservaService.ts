import type ReservaModel from "@/models/reservaModel";
import apiClient from "./apiService";

class ReservaService {
    async obterReserva(id:string ):Promise<ReservaModel> {
      const response = await apiClient.get<ReservaModel>(`reservas/${id}`);
      return response.data;
    }
}
export default new ReservaService();

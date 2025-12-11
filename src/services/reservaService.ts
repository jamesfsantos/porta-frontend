import ReservaModel from "@/models/reservaModel";

class ReservaService {
    obterReserva():Promise<ReservaModel> {
     return new Promise<ReservaModel>((resolve, reject) => {
       const reserva: ReservaModel ={
        id:"324",
        dataFim: new Date(),
        dataInicio : new Date(),
        dispositivos: [
          {
            aberto: false,
            coordenadas: { latitude: 1, longitude: 8 },
            id: "234234",
            nome: "fdgsdfgdsf",
            distanciaMinima: 0
          }
        ],
        hospede: {
          nome: "234234324234324234",
          id: "23423"
        }

      }

      setTimeout(()=> {
        resolve(reserva)
      },5000);

      //so para nao executar
       if(reserva == null)
        reject();

     });
    }

}
export default new ReservaService();

export type Resultado<T = null> = {
  sucesso: boolean;
  data?: T,
  erros: string[]
}

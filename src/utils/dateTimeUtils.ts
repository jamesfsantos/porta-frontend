function toDatePtBR(data: Date | undefined): string {
  if (!data) return '';
  return new Intl.DateTimeFormat('pt-BR').format(new Date(data))
}


export default {
  toDatePtBR,
}

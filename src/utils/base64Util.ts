function decodeBase64(data: string): string | null {

  try {
    const valor = atob(data);
    return valor;
  } catch (ex) {
    console.warn("Nao foi possivel converter o valor", data);
  }

  return null;
}

function decodeFromJson<T>(data: string): T | undefined | null {
  const obj = decodeBase64(data);
  if (obj == null) return null;

  const obj2 = JSON.parse(obj) as T;
  return obj2;


}

export default {
  decodeFromJson
}

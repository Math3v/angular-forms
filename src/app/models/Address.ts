export interface Address {
  street: string,
  number: number
}

export function emptyAddress(): Address {
  return {
    street: '',
    number: 42
  };
}

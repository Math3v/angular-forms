import { Address, emptyAddress } from './Address';

export interface User {
  name: string,
  address: Address,
  password: string,
  passwordConfirmation: string
}

export function emptyUser(): User {
  return {
    name: '',
    address: emptyAddress(),
    password: '',
    passwordConfirmation: ''
  };
}

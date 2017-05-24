import { Address } from './Address';

export interface User {
  name: string,
  address: Address,
  password: string,
  passwordConfirmation: string
}

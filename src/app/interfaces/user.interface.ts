export interface IUser {
  name: string,
  lastname?: string,
  email: string,
  google: boolean,
  img: string,
  role: 'ADMIN_ROLE' | 'USER_ROLE',
  uid?: string
}

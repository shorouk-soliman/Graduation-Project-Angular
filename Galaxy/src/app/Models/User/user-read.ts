export interface IUserRead {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    image: string,
}

export const initUserRead: IUserRead = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    image: '',
};
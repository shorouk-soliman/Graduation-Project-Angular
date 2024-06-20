export interface IUserUpdate {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
};

export const initUserUpdate: IUserUpdate = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
};
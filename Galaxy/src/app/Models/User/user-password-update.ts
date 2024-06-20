export interface IUserPasswordUpdate {
    oldpassword: string,
    newpassword: string,
};

export const initUserPasswordUpdate: IUserPasswordUpdate = {
    oldpassword: '',
    newpassword: '',
};
export interface Profile{
    firstname: string,
    middlename: string,
    lastname: string,
    email: string, 
    mobilenumber: string
}

export interface ChangePassword{
    oldPassword: string,
    newPassword: string 
}
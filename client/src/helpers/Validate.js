export const RegisterValidate = ({ firstName, lastName, email, password, repPassword }) => {
    const err = [];
    const nameReg = /^([a-zA-Z])+.{3,20}/g;
    if (!firstName || !lastName || !email || !password || !repPassword) err.push(1);
    if (firstName !== nameReg) err.push(1);
    return err;
}
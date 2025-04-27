import bcrypt from "bcrypt";

export const hashPassword = async (userPassword) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    // console.log(hashedPassword);

    return hashedPassword;
};

export const comparePassword = async (userPassword, hashedPassword) => {
    // console.log(userPassword, hashedPassword);
    return await bcrypt.compare(userPassword, hashedPassword);
};

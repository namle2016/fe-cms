import { LANGUAGE } from "./locale.type";

export const getValueLocale = (locale: any, key: any) => {
    return locale == LANGUAGE.VI ? key?.vn_VN : key?.en_US;
};
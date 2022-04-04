import { SyntheticEvent } from "react";

export const validateEmail = (email: string) => {
    const regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regEx.test(email)
}

export const elementFromEvent = (event: SyntheticEvent) => event.currentTarget as HTMLInputElement;
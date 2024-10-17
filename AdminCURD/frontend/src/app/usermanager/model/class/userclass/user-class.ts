import { Injectable } from "@angular/core";

type EmailType = string & { type: "EmailType" };
type PasswordType = string & { type: "PasswordType" };
@Injectable({
    providedIn: 'root'
  })

export class UserClass {
    emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; 
    passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/;

    constructor() {}

    createEmailType = (email: string): EmailType => {
        // console.log(email);
        if (this.emailPattern.test(email)) {
            return email as EmailType;
        }
        throw new Error("Invalid email format"); 
    };

    isPasswordValid = (input: string): PasswordType => {
        if (!this.passwordPattern.test(input)) {
            throw new Error("Invalid password format"); 
        }
        return input as PasswordType;
    };
}

export interface IUserAdd {
    name: string; 
    email: EmailType;
    password: PasswordType;
    group_id: number;
    company_id: number;
}

// @inspired by: https://coryrylan.com/blog/angular-2-form-builder-and-validation-management
// form validation examples: http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html

export class ValidationService {
    public getValidatorErrorMessage(validatorName: string) {
        let config = {
            required: 'Required',
            invalidEmailAddress: 'Invalid email address',
            invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.',
        };

        return config[validatorName];
    }

    public emailValidator(control: any) {
        // RFC 2822 compliant regex for email validation
        // tslint:disable-next-line:max-line-length
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    public passwordValidator(control: any) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
}

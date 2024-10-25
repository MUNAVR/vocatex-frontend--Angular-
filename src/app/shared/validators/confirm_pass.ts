import { FormGroup } from "@angular/forms";

export const confirmPasswordValidator = (passwordControlName: string, confirmPasswordControlName: string) => {
    return (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls[passwordControlName];
        const confirmPasswordControl = formGroup.controls[confirmPasswordControlName];

        // Avoid setting error if other validators have already failed
        if (confirmPasswordControl.errors && !confirmPasswordControl.errors['confirmPasswordValidator']) {
            return;
        }

        // Set error if passwords do not match
        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ confirmPasswordValidator: true });
        } else {
            // Clear error if passwords match
            confirmPasswordControl.setErrors(null);
        }
    };
};

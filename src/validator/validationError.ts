import { ValidationResult } from "joi";

class ValidationError extends Error {
    constructor(validationResult: ValidationResult | string) {
        if (typeof validationResult === "string") {
            super(validationResult);
        } else {
            super(validationResult.error?.details[0].message.replace(/"/g, ""));
        }
    }
}

export default ValidationError;
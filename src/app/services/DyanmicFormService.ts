import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField, ValidationRule } from '../models/form-field.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  constructor(private fb: FormBuilder) {}

  createForm(fields: FormField[]): FormGroup {
    const group: { [key: string]: any } = {};

    fields.forEach(field => {
      const validations = this.getValidations(field.validation);
      group[field.name] = [field.value || '', validations];
    });

    return this.fb.group(group);
  }

  private getValidations(validationRules: ValidationRule[] = []): any[] {
    const validations:any = [];

    validationRules.forEach(rule => {
      switch (rule.type) {
        case 'required':
          validations.push(Validators.required);
          break;
        case 'email':
          validations.push(Validators.email);
          break;
        case 'minLength':
          validations.push(Validators.minLength(rule.value));
          break;
        default:
          break;
      }
    });

    return validations;
  }
}

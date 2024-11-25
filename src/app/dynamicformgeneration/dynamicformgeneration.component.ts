import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ValidationRule {
  type: string;
  value?: any;
  message?: string;
}


@Component({
  selector: 'app-dynamicformgeneration',
  templateUrl: './dynamicformgeneration.component.html',
  styleUrls: ['./dynamicformgeneration.component.scss']
})
export class DynamicformgenerationComponent implements OnInit {

  @Input() fields: any[] = [];
  formGroup!: FormGroup;

  validations: ValidationRule[] = [
    { type: 'required', message: 'This field is required.' },
    { type: 'minlength', value: 3, message: 'Minimum length is 3 characters.' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({});
    this.fields.forEach((field) => {
      const validationsArray = [];
      if (field.validations.required) {
        validationsArray.push(Validators.required);
      }
      if (field.validations.minlength) {
        validationsArray.push(Validators.minLength(field.validations.minlength));
      }
      this.formGroup.addControl(
        field.name,
        this.fb.control('', validationsArray)
      );
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.formGroup.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${requiredLength} characters.`;
    }
    return '';
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form Submitted:', this.formGroup.value);
    } else {
      console.error('Form Invalid');
    }
  }

}

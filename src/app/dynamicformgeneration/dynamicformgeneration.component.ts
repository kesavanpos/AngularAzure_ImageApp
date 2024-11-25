import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validations?: any;
  defaultValue?: any;
}


@Component({
  selector: 'app-dynamicformgeneration',
  templateUrl: './dynamicformgeneration.component.html',
  styleUrls: ['./dynamicformgeneration.component.scss']
})
export class DynamicformgenerationComponent implements OnInit {

  @Input() steps: any[] = [];  // Now using 'steps' to handle dynamic fields
  formGroup!: FormGroup;
  currentStepIndex = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({});
    
    // Dynamically create controls for each field in 'steps'
    this.steps.forEach((step) => {
      step.fields.forEach((field: Field) => {
        const validationsArray = this.mapValidations(field.validations);
        this.formGroup.addControl(
          field.name,
          this.fb.control(field.defaultValue || '', validationsArray)
        );
      });
    });
  }

  mapValidations(validations: any) {
    const validators = [];
    if (validations?.required) validators.push(Validators.required);
    if (validations?.minlength) validators.push(Validators.minLength(validations.minlength));
    if (validations?.maxlength) validators.push(Validators.maxLength(validations.maxlength));
    if (validations?.pattern) validators.push(Validators.pattern(validations.pattern));
    return validators;
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
    if (control?.hasError('maxlength')) {
      const requiredLength = control.errors?.['maxlength'].requiredLength;
      return `Maximum length is ${requiredLength} characters.`;
    }
    if (control?.hasError('pattern')) {
      return 'Invalid format.';
    }
    return '';
  }

  goToStep(stepIndex: number) {
    if (this.formGroup.valid || stepIndex < this.currentStepIndex) {
      this.currentStepIndex = stepIndex;
    } else {
      alert('Please complete the current step!');
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Form Submitted:', this.formGroup.value);
    } else {
      console.error('Form Invalid');
    }
  }

  onFileSelect(event: any, controlName: string) {
    const file = event.target.files[0];
    const control = this.formGroup.get(controlName);
    control?.setValue(file);
  }
}

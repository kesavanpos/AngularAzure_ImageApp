export interface FormField {
    type: string; // 'text', 'email', 'datepicker', etc.
    label: string;
    name: string;
    value?: any;
    validation?: any; // validation rules
    options?: string[]; // for dropdowns
  }

  export interface ValidationRule {
    type: string; // e.g., 'required', 'email', 'minLength'
    message: string;
    value?: any;
  }
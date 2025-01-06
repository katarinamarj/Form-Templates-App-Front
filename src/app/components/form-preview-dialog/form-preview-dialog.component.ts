import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-preview-dialog',
  standalone: false,
  
  templateUrl: './form-preview-dialog.component.html',
  styleUrl: './form-preview-dialog.component.css'
})
export class FormPreviewDialogComponent implements OnInit{
  formGroup: FormGroup;

  private apiUrl = 'https://127.0.0.1:8000/form-answer';

  constructor(
    public dialogRef: MatDialogRef<FormPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fields: any[], formTemplateId: number },
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.data.fields.forEach(field => {
      this.formGroup.addControl(
        field.label,
        new FormControl('') 
      );
    });
  }
  
  submitForm(): void {
    if (this.formGroup.valid) {
      const answers = this.formGroup.value; 
      const payload = {
        formTemplateId: this.data.formTemplateId, 
        answers: answers 
      };

      this.http.post(this.apiUrl, payload).subscribe({
        next: () => {
          alert('Form submitted successfully!');
          this.dialogRef.close(); 
        },
        error: () => {
          alert('Error submitting form. Please try again.');
        }
      });
    } 
  }
  
  closeDialog(): void {
    this.dialogRef.close(); 
  }

}

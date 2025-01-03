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

  constructor(
    public dialogRef: MatDialogRef<FormPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fields: any[] },
    private fb: FormBuilder
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
  
  closeDialog(): void {
    this.dialogRef.close(); 
  }

}

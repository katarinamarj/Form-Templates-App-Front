import { Component, OnInit } from '@angular/core';
import { FormTemplateService } from '../../services/form-template.service';

@Component({
  selector: 'app-form-templates',
  standalone: false,
  
  templateUrl: './form-templates.component.html',
  styleUrl: './form-templates.component.css'
})
export class FormTemplatesComponent implements OnInit{
  
  formTemplates: any[] = [];
  newFormTemplate = { name: '', description: '' };

  constructor(private formTemplateService: FormTemplateService) {}
  ngOnInit(): void {
    this.loadFormTemplates();
  }

  loadFormTemplates(): void {
    this.formTemplateService.getFormTemplates().subscribe(data => {
      this.formTemplates = data;
    });
  }

  createFormTemplate(): void {
    if (this.newFormTemplate.name) {
      this.formTemplateService.createFormTemplate(this.newFormTemplate).subscribe(() => {
        this.newFormTemplate = { name: '', description: '' }; 
        this.loadFormTemplates();
      });
    }
  }
}

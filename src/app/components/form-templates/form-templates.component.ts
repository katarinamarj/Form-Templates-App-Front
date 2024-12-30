import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormTemplateService } from '../../services/form-template.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-form-templates',
  standalone: false,
  
  templateUrl: './form-templates.component.html',
  styleUrl: './form-templates.component.css'
})
export class FormTemplatesComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['name', 'description', 'actions'];
  formTemplates: any[] = [];
  newFormTemplate = { id: null, name: '', description: '' };
  errorMessage: string | null = null;

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private formTemplateService: FormTemplateService) {}
  
  ngOnInit(): void {
    this.loadFormTemplates();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadFormTemplates(): void {
    this.formTemplateService.getFormTemplates().subscribe(data => {
      this.dataSource.data = data;
    });

  }


saveTemplate(): void {

  if (!this.newFormTemplate.name) {
    this.errorMessage = 'Name is required.';
    return;
  }

  if (this.newFormTemplate.description.length > 250) {
    this.errorMessage = 'Description cannot exceed 250 characters.';
    return;
  }


  if (this.newFormTemplate.id) {
    this.formTemplateService.updateFormTemplate(this.newFormTemplate).subscribe(() => {
      this.newFormTemplate = { id: null, name: '', description: '' }; 
      this.loadFormTemplates();
      this.errorMessage = null;
    });
  } else {
    this.formTemplateService.createFormTemplate(this.newFormTemplate).subscribe(() => {
      this.newFormTemplate = { id: null, name: '', description: '' };
      this.loadFormTemplates(); 
      this.errorMessage = null;
    });
  }
}
  
editTemplate(template: any): void {
  this.newFormTemplate = { ...template }; 
}

deleteTemplate(id: number): void {
  if (confirm('Are you sure you want to delete this template?')) {
    this.formTemplateService.deleteFormTemplate(id).subscribe(() => {
      this.loadFormTemplates(); 
    });
  }
}
  
  
  
}

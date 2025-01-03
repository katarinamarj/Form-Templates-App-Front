import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormTemplateService } from '../../services/form-template.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormPreviewDialogComponent } from '../form-preview-dialog/form-preview-dialog.component';

@Component({
  selector: 'app-form-templates',
  standalone: false,
  templateUrl: './form-templates.component.html',
  styleUrls: ['./form-templates.component.css']
})
export class FormTemplatesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  formTemplates: any[] = [];
  newFormTemplate: { 
    id: number | null; 
    name: string; 
    description: string; 
    fields: { label: string; type: string; options: string }[] 
  } = { 
    id: null, 
    name: '', 
    description: '', 
    fields: [] 
  };
  newField = { label: '', type: '', options: '' };
  errorMessage: string | null = null;
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private formTemplateService: FormTemplateService,  public dialog: MatDialog) {}

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
    if (this.newFormTemplate.id) {
      this.formTemplateService.updateFormTemplate(this.newFormTemplate).subscribe(() => {
        this.resetForm();
        this.loadFormTemplates();
      });
    } else {
      this.formTemplateService.createFormTemplate(this.newFormTemplate).subscribe(() => {
        this.resetForm();
        this.loadFormTemplates();
      });
    }
  }

  resetForm(): void {
    this.newFormTemplate = { id: null, name: '', description: '', fields: [] };
    this.newField = { label: '', type: '', options: '' };
    this.errorMessage = null;
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

  addField(): void {
    if (!this.newField.label || !this.newField.type) {
      alert('Field label and type are required.');
      return;
    }

    this.newFormTemplate.fields.push({ ...this.newField });
    this.newField = { label: '', type: '', options: '' };
    this.newFormTemplate.fields = [...this.newFormTemplate.fields]; 
  }


  editField(field: any): void {
    this.newField = { ...field };
    this.newFormTemplate.fields = this.newFormTemplate.fields.filter(f => f !== field);
  }


  deleteField(field: any): void {
    if (this.newFormTemplate.id && field.id) {
      this.formTemplateService.deleteField(this.newFormTemplate.id, field.id).subscribe(() => {
        this.newFormTemplate.fields = this.newFormTemplate.fields.filter(f => f !== field);
      });
    }
  }

  openPreviewDialog(template: any): void {
    this.dialog.open(FormPreviewDialogComponent, {
      width: '70%',  
      height: '70%',  
      data: { fields: template.fields }  
    });
  }
  

}

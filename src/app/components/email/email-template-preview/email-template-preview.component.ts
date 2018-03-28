import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmailTemplate } from '../../../models/EmailTemplate';

@Component({
  selector: 'app-email-template-preview',
  templateUrl: './email-template-preview.component.html',
  styleUrls: ['./email-template-preview.component.css']
})
export class EmailTemplatePreviewComponent implements OnInit {
  header: string;
  @ViewChild('content') contentElement: ElementRef;
  constructor(
    private dialogRef: MatDialogRef<EmailTemplatePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) private template: EmailTemplate) { }

  ngOnInit() {
    this.header = this.template.subject;
    const contentDiv: HTMLElement = this.contentElement.nativeElement;
    contentDiv.innerHTML = this.template.htmlTemplate;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

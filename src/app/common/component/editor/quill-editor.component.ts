import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quill-editor',
  template: `
  <div class="col-md-12">
       <p>{{title}} </p>
       <quill-editor [styles]="{height: '200px'}"
       [(ngModel)]="editorText"
       [modules]="toolbar"
       ></quill-editor>
  </div>
  `,
  styles: []
})
export class QuillEditorComponent {

  @Input() title: string;
  @Input() toolbar: any;

  editorText:string;

 constructor() {}

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from '../../../dialogs/dialog.module';
import { FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    FileuploadComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    FileuploadComponent
  ]
})
export class FileuploadModule { }

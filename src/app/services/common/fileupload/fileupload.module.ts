import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from '../../../dialogs/dialog.module';



@NgModule({
  declarations: [
    FileuploadComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    DialogModule
  ],
  exports: [
    FileuploadComponent
  ]
})
export class FileuploadModule { }

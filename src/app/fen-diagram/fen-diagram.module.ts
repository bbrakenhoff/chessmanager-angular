import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FenDiagramComponent } from './fen-diagram.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FenDiagramComponent, ChessboardComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedComponentsModule],
  exports: [FenDiagramComponent]
})
export class FenDiagramModule { }

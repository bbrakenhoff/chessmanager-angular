import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FenPositionComponent } from './fen-position.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [FenPositionComponent, ChessboardComponent],
  imports: [CommonModule, SharedComponentsModule],
  exports: [FenPositionComponent]
})
export class FenPositionModule {}

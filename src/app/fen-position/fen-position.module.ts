import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FenPositionComponent } from './fen-position.component';
import { ChessboardComponent } from './chessboard/chessboard.component';

@NgModule({
  declarations: [FenPositionComponent, ChessboardComponent],
  imports: [CommonModule],
  exports: [FenPositionComponent]
})
export class FenPositionModule {}

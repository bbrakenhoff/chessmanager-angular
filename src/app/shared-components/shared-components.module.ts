import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessPieceIconDirective } from './chess-piece-icon.directive';
import { SvgIconDirective } from './svg-icon/svg-icon.directive';

@NgModule({
  declarations: [ChessPieceIconDirective, SvgIconDirective],
  exports: [ChessPieceIconDirective, SvgIconDirective],
  imports: [CommonModule]
})
export class SharedComponentsModule {}

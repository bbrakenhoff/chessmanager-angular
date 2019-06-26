import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessPieceIconDirective } from './chess-piece-icon.directive';

@NgModule({
  declarations: [ChessPieceIconDirective],
  exports: [ChessPieceIconDirective],
  imports: [
    CommonModule
  ]
})
export class SharedComponentsModule { }

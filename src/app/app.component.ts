import { Component } from '@angular/core';
import { StorageService } from './core/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chessmanager';

  constructor(private _storageService: StorageService) {
    // this._storageService.createTestData();
  }
}

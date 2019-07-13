import { Component, OnInit } from '@angular/core';
import { StorageService } from '../core/storage.service';
import { Collection } from 'src/models/collection.model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections-overview.component.html',
  styleUrls: ['./collections-overview.component.scss']
})
export class CollectionsOverviewComponent implements OnInit {
  collections: Collection[] = [];

  constructor(private _storageService: StorageService) {
    this.collections = this._storageService.collections;
  }

  ngOnInit() {}
}

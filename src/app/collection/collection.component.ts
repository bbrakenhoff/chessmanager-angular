import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../core/storage.service';
import { FenPosition } from 'src/models/fen-position.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  fenPositions: FenPosition[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService
  ) {
    this._activatedRoute.params.subscribe(
      params =>
        (this.fenPositions = this._storageService.getFenPositionsByCollection(
          params.collectionId
        ))
    );
  }

  ngOnInit() {}
}

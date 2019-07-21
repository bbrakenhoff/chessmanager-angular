import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FenDiagram } from '../../models/fen-diagram.model';
import { StorageService } from '../core/storage.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  fenDiagrams: FenDiagram[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService
  ) {
    this._activatedRoute.params.subscribe(
      params =>
        (this.fenDiagrams = this._storageService.getFenDiagramsByCollectionId(
          params.collectionId
        ))
    );
  }

  ngOnInit() {}
}

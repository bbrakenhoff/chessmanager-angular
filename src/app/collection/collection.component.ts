import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FenDiagram } from '../../models/fen-diagram.model';
import { StorageService } from '../core/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumAware } from '../util/enum-aware.decorator';
import { SvgIcons } from '../shared-components/svg-icon/svg-icons';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
@EnumAware([{ name: 'SvgIcons', type: SvgIcons }])
export class CollectionComponent implements OnInit {
  fenDiagrams: FenDiagram[] = [];
  form: FormGroup;

  private _collectionId: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _storageService: StorageService
  ) {
    this._activatedRoute.params.subscribe(params => {
      this._collectionId = params.collectionId;
      this._updateFenDiagrams();
    });

    this.form = this._formBuilder.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onFormSubmit() {
    if (this.form.valid) {
      const newFenDiagram = FenDiagram.create();
      newFenDiagram.description = this.form.value.description;
      newFenDiagram.collectionId = this._collectionId;
      this._storageService.saveFenDiagram(newFenDiagram);
      this._router.navigate(['../../fen-diagram', newFenDiagram.id]);
    }
  }

  onDeleteButtonClicked(fenDiagramId: string) {
    this._storageService.deleteFenDiagram(fenDiagramId);
    this._updateFenDiagrams();
  }

  private _updateFenDiagrams() {
    this.fenDiagrams = this._storageService.getFenDiagramsByCollectionId(
      this._collectionId
    );
  }
}

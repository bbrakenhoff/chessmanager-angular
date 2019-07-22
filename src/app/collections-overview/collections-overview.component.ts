import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/models/collection.model';
import { StorageService } from '../core/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-collections',
  templateUrl: './collections-overview.component.html',
  styleUrls: ['./collections-overview.component.scss']
})
export class CollectionsOverviewComponent implements OnInit {
  collections: Collection[] = [];
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _storageService: StorageService
  ) {
    this._updateCollections();

    this.form = this._formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onFormSubmit() {
    if (this.form.valid) {
      this._storageService.saveCollection(
        Collection.create(this.form.value.name)
      );
      this._updateCollections();
    }
  }

  private _updateCollections() {
    this.collections = this._storageService.getCollections();
  }
}

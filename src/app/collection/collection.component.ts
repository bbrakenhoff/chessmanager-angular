import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute) {

    this._activatedRoute.params.subscribe(result =>
      console.log(
        `%cBijoya: collections-overview.component -> CollectionsOverviewComponent`,
        'color: orange;',
        result
      )
    );
  }

  ngOnInit() {}
}

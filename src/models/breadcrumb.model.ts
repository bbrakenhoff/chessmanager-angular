export class Breadcrumb {
  readonly url: string;
  readonly label: () => string;
  readonly params: { collectionId: string; fenDiagramId: string } = {
    collectionId: null,
    fenDiagramId: null
  };

  private _collectionName = '';
  public get collectionName() {
    return this._collectionName;
  }

  private _fenDiagramDescription = '';
  public get fenDiagramDescription() {
    return this._fenDiagramDescription;
  }

  private constructor(url: string, label: () => string) {
    this.url = url;
    this.label = label;
  }

  static create(url: string, label: () => string) {
    return new Breadcrumb(url, label);
  }

  public setParamCollectionId(collectionId: string) {
    this.params.collectionId = collectionId;
    return this;
  }

  public setParamFenDiagramId(fenDiagramId: string) {
    this.params.fenDiagramId = fenDiagramId;
    return this;
  }

  public resolveLabel() {
    // resolve collection name and fen diagram description
  }
}

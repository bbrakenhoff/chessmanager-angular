export class Breadcrumb {
  private _label: string;
  get label() {
    return this._label;
  }

  private _url: string;
  get url() {
    return this.param ? `${this._url}/${this.param}` : this._url;
  }

  private _param: string;
  get param(): string {
    return this._param;
  }

  private constructor() {}

  static create(label: string, url: string, param?: string) {
    const breadcrumb = new Breadcrumb();
    breadcrumb._label = label;
    breadcrumb._url = url;
    breadcrumb._param = param;

    return breadcrumb;
  }
}

export class Breadcrumb {
  readonly url: string;
  readonly label: string;

  private constructor(url: string, label: string) {
    this.url = url;
    this.label = label;
  }

  static create(url: string, label: string) {
    return new Breadcrumb(url, label);
  }
}

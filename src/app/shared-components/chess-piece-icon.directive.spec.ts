import { ChessPieceIconDirective } from './chess-piece-icon.directive';
import { IconSet } from 'src/models/icon-set.model';

describe('ChessPieceIconDirective', () => {
  let directive: ChessPieceIconDirective;

  beforeEach(() => {
    directive = new ChessPieceIconDirective(null, null);
  });

  describe('_iconPath(): string', () => {
    it('should return the svg path to the icon', () => {
      directive.fenChar = 'R';
      directive.iconSet = IconSet.Maya;
      const iconPath: string = (directive as any)._iconPath();
      expect(
        iconPath.startsWith((ChessPieceIconDirective as any).iconsSvg)
      ).toEqual(true);
      expect(iconPath.includes(directive.iconSet.toLowerCase())).toEqual(true);
      expect(iconPath.includes((directive as any)._fenCharToChessPieceIconName())).toEqual(true);
    });
  });

  describe('_fenCharToChessPieceIconName():string', () => {
    it('should start with "w" when fen char is uppercase', () => {
      (directive as any).fenChar = 'R';
      const iconName: string = (directive as any)._fenCharToChessPieceIconName();
      expect(iconName).toBeDefined();
      expect(iconName.length).toEqual(2);
      expect(iconName.charAt(0)).toEqual('w');
      expect(iconName.charAt(1)).toEqual('r');
    });

    it('should start with "b" when fen char is lowercase', () => {
      (directive as any).fenChar = 'r';
      const iconName: string = (directive as any)._fenCharToChessPieceIconName();
      expect(iconName).toBeDefined();
      expect(iconName.length).toEqual(2);
      expect(iconName.charAt(0)).toEqual('b');
      expect(iconName.charAt(1)).toEqual('r');
    });
  });
});

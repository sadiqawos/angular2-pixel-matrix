import { NgLedMatrixPage } from './app.po';

describe('ng-led-matrix App', function() {
  let page: NgLedMatrixPage;

  beforeEach(() => {
    page = new NgLedMatrixPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { MemoriesPage } from './app.po';

describe('memories App', () => {
  let page: MemoriesPage;

  beforeEach(() => {
    page = new MemoriesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

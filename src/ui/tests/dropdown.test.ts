describe('Dropdown', () => {
  const url = 'https://the-internet.herokuapp.com/';
  const dropdownSelector = 'select#dropdown';

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(url);
    await $('//a[text()="Dropdown"]').click();
  });

  it('Select option 1', async () => {
    const dropdown = await $(dropdownSelector);
    await dropdown.waitForDisplayed();
    await dropdown.selectByVisibleText('Option 1');
  });

  it('Select option 2', async () => {
    const dropdown = await $(dropdownSelector);
    await dropdown.waitForDisplayed();
    await dropdown.selectByIndex(2);
  });
});

describe('Authentication', () => {
  const linkSelectorCSS = 'a[href="/login"]';
  const url = 'https://the-internet.herokuapp.com/';
  const expectedPageTitle = 'Login Page';

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(url);
    const authenticationLink = await $(linkSelectorCSS);
    await authenticationLink.click();
    const authPageTitle = await $('div.example h2');
    // await expect(authPageTitle).toHaveText(expectedPageTitle);
    const actualPageTitle = await authPageTitle.getText();
    expect(actualPageTitle).toBe(expectedPageTitle);
  });

  context('Positive scenarios', () => {
    const validCredentials = {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    };

    it('Should login with valid credentials', async () => {
      const username = await $('#username');
      const password = await $('[name="password"]');
      const loginButton = await $('button.radius');

      await username.setValue(validCredentials.username);
      await password.setValue(validCredentials.password);
      await loginButton.click();

      const secretAreaNotification = await $('div.flash.success');
      const expectedNotificationText = 'You logged into a secure area!';
      const secretAreaNotificationText = await secretAreaNotification.getText();
      expect(secretAreaNotificationText.includes(expectedNotificationText)).toBeTruthy();
    });

    it('Should log out', async () => {
      const username = await $('#username');
      const password = await $('[name="password"]');
      const loginButton = await $('button.radius');

      await username.setValue(validCredentials.username);
      await password.setValue(validCredentials.password);
      await loginButton.click();

      const subheader = await $('.subheader');
      await expect(subheader).toHaveText('Welcome to the Secure Area. When you are done click logout below.');

      const logoutSelector = '.button';

      await $(logoutSelector).click();
      const authPageTitle = await $('div.example h2');

      await expect(authPageTitle).toHaveText(expectedPageTitle);
    });
  });

  context('Negative scenarios', () => {
    const invalidCredentials = {
      username: 'tomsmith1',
      password: 'SuperSecretPassword!'
    };

    it('Should not log in with invalid credentials', async () => {
      const username = await $('#username');
      const password = await $('[name="password"]');
      const loginButton = await $('button.radius');

      await username.setValue(invalidCredentials.username);
      await password.setValue(invalidCredentials.password);
      await loginButton.click();

      const errorNotificationText = await $('div.flash.error').getText();
      expect(errorNotificationText.includes('Your username is invalid!')).toBeTruthy();
    });
  });
});

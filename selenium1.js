

const {Builder, By} = require('selenium-webdriver');
require("chromedriver");
(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await driver.get('https://www.talentlabs.org/m1-modules/sql');

        // Get all the elements available with tag 'p'
        let heading = await driver.findElements(By.xpath('//*[@id="app"]/div/main/div/div/div[1]/div/hgroup'));
        for(let e of heading) {
            console.log(await e.getText());
        }
        let content = await driver.findElements(By.xpath('//*[@id="app"]/div/main/div/div/div[2]'));
        for(let e of content) {
            console.log(await e.getText());
        }
    }
    finally {
        await driver.quit();
    }
})();
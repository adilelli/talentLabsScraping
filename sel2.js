

const {Builder, By} = require('selenium-webdriver');
require("chromedriver");
(async function getCourseLink() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await driver.get('https://www.talentlabs.org/courses');

        // Get all the elements available with tag 'p'
        let heading = await driver.findElements(By.xpath('//*[@id="app"]/div/main/div/div/div[2]/div[2]/a'));
        let f = '';
        let allLinks = [];
        for (let i = 1; i <= heading.length; i++){
            let headings = await driver.findElements(By.xpath('//*[@id="app"]/div/main/div/div/div[2]/div[2]/a['+i+']'));
            for(let e of headings) {
                f = await e.getAttribute('href');
            } allLinks.push(f);
        }
        
        for (let i = 0; i<allLinks.length;i++){
            await driver.get(allLinks[i]);
            let heading = await driver.findElements(By.xpath('//*[@id="app"]/div/main/div/div/div[1]/div/hgroup'));
        for(let e of heading) {
            console.log(await e.getText());
        }
        let content = await driver.findElements(By.xpath('//*[@id="app"]/div/main/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div'));
        for(let e of content) {
            console.log(await e.getText());
        }
        }



    }
    finally {
        await driver.quit();
    }
})();
  
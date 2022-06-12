

const {Builder, By} = require('selenium-webdriver');
require("chromedriver");
(async function getCourseLink() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url Courses talentLabs
        await driver.get('https://www.talentlabs.org/courses');

        // Make an array of links href to respective courses
        let heading = await driver.findElements(By.css('#app > div > main > div > div > div.container > div.container-cards > a'));
        let allLinks = Array(heading.length).fill('');

        for (let i = 1; i <= heading.length; i++){
            let headings = await driver.findElements(By.css('#app > div > main > div > div > div.container > div.container-cards > a:nth-child('+i+')'));
            for(let e of headings) {
                allLinks[i-1] = await e.getAttribute('href');
            } 
        }
        
        //Loop through the allLinks array with href data to get content
        for (let i = 0; i<allLinks.length;i++){
            await driver.get(allLinks[i]);
            let heading = await driver.findElements(By.css('#app > div > main > div > div > div.course-banner > div > hgroup'));
            for(let e of heading) {
                console.log(await e.getText());
            }
            let content = await driver.findElements(By.css('#app > div > main > div > div > div.container.container-main > div.component-panel-tabs > div.v-window.v-item-group.theme--light.v-tabs-items > div > div > div > div'));
            for(let e of content) {
                console.log(await e.getText());
            }
        }

    }
    finally {
        await driver.quit();
    }
})();
  
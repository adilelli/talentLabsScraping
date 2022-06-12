

const PromptSync = require('prompt-sync');
const prompt = require('prompt-sync')({sigint: true});
const search = prompt('What watch do you want to search? eg: "Rolex Submariner"');
console.log(`Ok searching for your ${search}`)

const {Builder, By, Key} = require('selenium-webdriver');
require("chromedriver");
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
      
        await driver.get('https://www.chrono24.com/'+search+'/--mod1.htm');

    // Enter text "webdriver" and perform keyboard action "Enter"
    //await driver.findElement(By.xpath('//*[@id="query"]')).sendKeys(search, Key.ENTER);

        let content = await driver.findElements(By.xpath('//*[@id="wt-watches"]/div'));
        let allLinks = Array(content.length).fill('');
        for (let i = 1; i <= content.length; i++){
            let contents = await driver.findElements(By.xpath('//*[@id="wt-watches"]/div['+i+']/a/div[2]/div[2]/div[1]/div/strong'));
            for(let e of contents) {
                stringDollar = await e.getText();
                allLinks[i-1] = Number(stringDollar.replace(/[^0-9.-]+/g,""));
            } 
        }

        

        let sum = 0;
        for (i=0; i<allLinks.length; i++){
            sum = Number(allLinks[i]) + sum;
        }
        console.log(typeof allLinks[0])
        average = sum / allLinks.length;
        
        console.log(allLinks.length + ' watches are scraped')
        console.log('The prices are ' + allLinks )
        console.log('The average price for a ' + search + ' is  USD ' + average)



  }
  finally {
    await driver.quit();
  }
})();

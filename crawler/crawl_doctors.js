const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.vinmec.com/vi/danh-sach/bac-si/ca-nuoc/');

 // Chờ cho dữ liệu được tải hoàn thành
 await page.waitForSelector('#list > div > div > ul > li');

 const items = await page.evaluate(() => {
   const itemNodes = document.querySelectorAll('#list > div > div > ul > li');
   const itemList = [];

   itemNodes.forEach((node) => {
     const name = node.querySelector('div.body > div.info > h2 > a').innerText.trim(); // Thay '.name-selector' bằng CSS selector của tên
    //  const specialty = node.querySelector('.specialty-selector').innerText.trim(); // Thay '.specialty-selector' bằng CSS selector của chuyên ngành
    //  const hospital = node.querySelector('.hospital-selector').innerText.trim(); // Thay '.hospital-selector' bằng CSS selector của bệnh viện

     itemList.push({ name });
   });

   return itemList;
 });

 console.log(items);

 await browser.close();
})();

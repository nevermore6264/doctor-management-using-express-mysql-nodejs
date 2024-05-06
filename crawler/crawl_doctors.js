const puppeteer = require("puppeteer");
const fs = require("fs");
const { stringify } = require("csv-stringify");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.vinmec.com/vi/danh-sach/bac-si/ca-nuoc/");

  // Chờ cho dữ liệu được tải hoàn thành
  await page.waitForSelector("#list > div > div > ul > li");

  const items = await page.evaluate(() => {
    const itemNodes = document.querySelectorAll("#list > div > div > ul > li");
    const itemList = [];

    itemNodes.forEach((node) => {
      const name = node
        .querySelector("div.body > div.info > h2 > a")
        .innerText.trim();
      const degree = node
        .querySelector("div.body > div.info > dl > dd:nth-child(2) > a")
        .innerText.trim();
      const specialty = node
        .querySelector(
          "div.body > div.info > dl > dd:nth-child(4) > a:nth-child(1)"
        )
        .innerText.trim();
      const hospital = node
        .querySelector("div.body > div.info > dl > dd:nth-child(6) > a")
        .innerText.trim();
      const desc = node
        .querySelector("div.body > div.info > div")
        .innerText.trim();
      itemList.push({ name, degree, specialty, hospital, desc });
    });

    return itemList;
  });

  console.log(items);
  const filename = "saved_from_db.csv";
  const writableStream = fs.createWriteStream(filename);

  const columns = ["name", "degree", "specialty", "hospital", "desc"];

  const stringifier = stringify({ header: true, columns: columns });

  stringifier.pipe(writableStream);

  items.forEach((row) => {
    stringifier.write(row);
  });

  stringifier.end();

  console.log("Finished writing data");

  await browser.close();
})();

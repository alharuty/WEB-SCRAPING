const puppeteer = require('puppeteer');
const fs = require('fs');

// función asíncrona
(async () => {
    // inicializamos el navegador
    const browser = await puppeteer.launch({ headless: true }); // sin abrir navegador
    const page = await browser.newPage();
    const baseUrl = 'https://books.toscrape.com/catalogue/page-';

    let books = [];

    for (let i = 1; i <= 50; i++) {
        let url = `${baseUrl}${i}.html`;
        // console.log(`Scrapeando página: ${url}`);
        
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const booksOnPage = await page.evaluate(() => {
            let booksArray = [];
            let items = document.querySelectorAll('.product_pod'); // Cada libro está en un div con esta clase

            items.forEach(book => {
                let titulo = book.querySelector('h3 a').getAttribute('title');
                let precio = book.querySelector('.price_color').innerText;
                let stock = book.querySelector('.instock.availability').innerText.trim();

                booksArray.push({ titulo, precio, stock });
            });

            return booksArray;
        });

        books = books.concat(booksOnPage);
    }

    await browser.close();

    // guardamos los datos en un archivo JSON
    fs.writeFileSync('books.json', JSON.stringify(books, null, 2));

    console.log('Scraping completado. Datos guardados en books.json');
})();



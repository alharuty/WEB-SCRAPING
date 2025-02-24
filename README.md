# WEB SCRAPING CON HTML Y JS

## ¿QUÉ ES WEB SCRAPING?
Web scraping es un conjunto de prácticas utilizadas para extraer datos de forma automática de otros sitios web. Se puede hacer usando código JavaScript mediante el navegador o usando librerías de JavaScript como `Puppeteer` o `Cheerio`.

En esta presentación veremos muchos conceptos que en conjunto nos ayudarán a entender el funcionamiento del scraping.

## ¿CUÁNDO SE USA ESTE TIPO DE TÉCNICA?
El scraping se puede usar por varias razones como pueden ser:
- **Análisis de precios**: Comparar precios de productos en diferentes tiendas.
- **Seguimiento de noticias**: Extraer titulares de periódicos digitales.
- **Investigación de mercado**: Recopilar datos de tendencias o productos populares.
- **Extracción de leads**: Extraer datos de contacto para usarlos como leads para marketing.

Estos son solo algunos de los posibles usos de scraping.<br>**Pero, ¿es legal extraer datos de otros sitios web?** La respuesta es Sí, siempre y cuando la propia página web nos proporcione las URLS de sus APIs y sea de libre acceso.<br>
**¿Y cómo podemos saber si una página web nos da acesso a esta scraping?**
1. Ver si la web tiene un archivo robots.txt y tiene la opción Allow o Disallow.
2. Buscar en sus Términos y condiciones.
3. Ver si la web nos ofrece sus APIs. Esta es la opción más recomendada y legal para extraer datos de webs. 

✅ [twitter.com](https://docs.x.com/home) | Permite hacer peticiones a sus APIs<br>
✅ [books.toscrape.com](https://books.toscrape.com/) | Permite scraping<br>
❌ [zara.com](zara.com/tobots.txt) | No permite scraping

## PARA ENTENDER CÓMO FUNCIONA EL SCRAPING CON HTML Y JS VAMOS A REPASAR LOS CONECPTOS CLAVE DE ESTOS

### ¿Cómo funciona una web con HTML?<br>
Cuando entramos a cualquier página web que haya sido diseñado en HTML, lo que vemos es una estructura de etiquetas HTML que se van anidando unas dentro de otras, y el navegador lo interpreta y nos lo muestra. <br>

Estas etiquetas HTML son como un tipo de marcadores que envuelven cada parte de la página web para ser mostrados en el navegador y son calve para poder hacer scraping. Ejemplos de etiquetas:

| **Etiqueta** | **Descripción**                                           | **Ejemplo**                           |
|--------------|-----------------------------------------------------------|---------------------------------------|
| `<h1>` a `<h6>` | Encabezados de diferentes tamaños (donde `<h1>` es el más grande) | `<h1>Este es un encabezado grande</h1>` |
| `<p>`        | Para párrafos de texto                                     | `<p>Este es un párrafo de ejemplo.</p>` |
| `<a>`        | Para crear enlaces                                         | `<a href="https://www.ejemplo.com">Haz clic aquí</a>` |
| `<div>`      | Para crear divisiones o secciones en la página             | `<div class="seccion">Contenido</div>` |
| `<img>`      | Para insertar imágenes                                     | `<img src="imagen.jpg" alt="Descripción de la imagen">` |
| `<ul>`       | Para listas desordenadas (sin numerar)                     | `<ul><li>Elemento 1</li><li>Elemento 2</li></ul>` |
| `<ol>`       | Para listas ordenadas (numeradas)                          | `<ol><li>Primer elemento</li><li>Segundo elemento</li></ol>` |
| `<li>`       | Elementos de lista (tanto en `<ul>` como en `<ol>`)         | `<li>Elemento de lista</li>` |

Estas etiquetas en conjunto con sus **clases** y los **id** nos permiten seleccionar cualquier elemento que queramos de la página web y en este caso poder extraerlos haciendo scraping. 

### ¿Qué es la consola?
Cuando hacemos scraping la consola nos puede servir para ver y extraer datos de una página web, su cuerpo de HTML y sus atributos o clases.

### ¿Qué es el DOM?
Cuando cargamos una pagina web en un navegador, el código HTML se convierte en una estructura jerárquica llamada DOM (Document Object Model), donde cada etiqueta HTML es un nodo dentro del documento. 

DOM tiene un elemento muy importante llamado `document` que representa el documento HTML completo. Usaremos este objeto para seleccionar elementos y extraer datos de la página web.

```javascript
console.log(document.title); // mostramos el título de la página
```

### COMANDOS BÁSICOS DE JS EN LA CONSOLA:

1.  POR ID:
    ```javascript
    document.getElementById("id_del_elemento")
    ````
2. POR CLASE:
-  Seleccionar todos los elementos con una clase específica:
    ```javascript
    document.getElementsByClassName("clase_del_elemento")
    ````

-  Seleccionar todos los elementos con una clase específica:
    ```javascript
    document.querySelectorAll(".clase_del_elemento")
    ````

- Seleccionar el primer elemento con una clase específica:
    ```javascript
    document.querySelector(".clase_del_elemento")
    ````
3. POR ETIQUETA:
    ```javascript
    document.getElementsByTagName("h1")
    ```
    ```javascript
    document.getElementsByTagName("p")
    ```
    ```javascript
    document.getElementsByTagName("ul")
    ````
4. ATRIBUTO:
    ```javascript
    document.querySelectorAll("[atributo='valor']")
    ````
5. TEXTO DE UN ELEMENTO:
    ```javascript
    document.querySelector("h1").textContent
    ````
6. HTML DE UN ELEMENTO:
    ```javascript
    document.querySelector("h1").innerHTML
    ````
Para entender cómo podemos acceder a cada uno de estos datos, iremos paso por paso hasta conseguir una lista larga de productos con sus precios y enlaces.

1. Buscar la clase común de cada producto. En este caso es `class="product_pod"`
2. Ahora podemos acceder a cada uno de los productos con la función `querySelectorAll` y le pasamos la clase que hemos encontrado. Esto nos traerá un array con todos los productos.
```javascript
document.querySelectorAll(".product_pod")
```

3. Ahora podemos acceder a cada h3 que hay dentro de esta clase:
```javascript
[...document.querySelectorAll(".product_pod")].map(title => ({titulo: title.querySelector("h3").innerText}));
```

4. O también podemos solicitar el precio y si hay stock:
```javascript
[...document.querySelectorAll(".product_pod")].map(product => ({
    titulo: product.querySelector("h3").innerText,
    precio: product.querySelector(".price_color").innerText,
    availability: product.querySelector(".instock.availability").innerText
}));
```

5. También podemos guardar esta petición en una variable:
```javascript
const listaLibros = [...document.querySelectorAll(".product_pod")].map(product => ({
    titulo: product.querySelector("h3").innerText,
    precio: product.querySelector(".price_color").innerText,
    availability: product.querySelector(".instock.availability").innerText
}));
```
6. Y convertirlo a una tabla:
```javascript
console.table(listaLibros);
```


### EJERCICIO PRÁCTICO:
1. Ir a la pagina [Wikipedia.com](https://en.wikipedia.org/wiki/Main_Page)

2. encontrar el primer elemento con la etiqueta < p >

3. Devolver en la consola el texto de ese elemento.

**Nota:** No es lo mismo `.querySelector(".p")` que `.querySelector("p")`.<br>
El punto (.) es la diferencia, cuando usamos querySelector, el punto indica que estamos buscando por calse y si no hay punto, estamos buscando por etiqueta. 


También podemos hacer todo este proceso con librerías como Cheerio o Puppeteer. Estas librerías nos permiten hacer scraping de una forma más sencilla y rápida, y guardar el resultado en un archivo JSON o CSV.

1. Actualizar Node.js a la versión >20:
```bash
nvm install 20
```
2. Usar la version >20 de Node.js:
```bash
nvm use 20
```
3. Instalar la librería Puppeteer:
```bash
npm install puppeteer
```
4. Verificar si se ha instalado correctamente:
```bash
node -e "const puppeteer = require('puppeteer'); console.log('Puppeteer instalado correctamente')"
```
5. Escribir el código de scraping en un archivo .js:
```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: true }); // Ejecuta en modo sin cabeza (sin abrir navegador)
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
                let title = book.querySelector('h3 a').getAttribute('title');
                let price = book.querySelector('.price_color').innerText;
                let stock = book.querySelector('.instock.availability').innerText.trim();

                booksArray.push({ title, price, stock });
            });

            return booksArray;
        });

        books = books.concat(booksOnPage);
    }

    await browser.close();

    // Guardar los datos en un archivo JSON
    fs.writeFileSync('books.json', JSON.stringify(books, null, 2));

    console.log('Scraping completado. Datos guardados en books.json');
})();
```
6. Ejecutar el código:
```bash
node pupee.js 
```

[SABER MÁS SOBRE PUPPEETER](https://www.youtube.com/watch?v=gBnrdedhuU4)

# El equipo NovaByte presenta la plataforma web: "AgroBisnes"

Nuestro objetivo con AgroBisnes es transformar e impulsar el sector agropecuario a través de una herramienta innovadora que optimice los procesos de compra y venta de productos. Buscamos fortalecer la economía local, facilitando conexiones más eficientes entre productores y compradores.

Es una aplicación web gratuita que brindará a los usuarios información detallada de los precios de los granos básicos en el mercado a nivel nacional, los productores podrán ofrecer sus cultivos, los distribuidores podrán cotizar y negociar con los productores, de ésta forma generar ingresos de manera más cómoda y efectiva, los consumidores también podrán cotizar y negociar con los productores y distribuidores en base a las necesidades de éste (En dependencia de la cantidad que desee obtener).

Nuestro proyecto en **React-vite + Tailwind (Frontend)** y **Laravel (Backend)**  

- `front/` → Aplicación en React + Tailwind  
- `server/` → API REST con Laravel  

---

### Para la utilizacion y valoracion del funcionamiento de nuestra plataforma, recomendamos estos pasos a seguir:

```bash (Terminal en VSCode o CMD)

git clone https://github.com/FredderBaca/AgroBisnes.git
cd AgroBisnes
cd front

### Verificacion del funcionamiento del frontend de la plataforma 

npm install 
npm run dev

### Por alguna existencia de errores en la ejecucion, recomendamos el uso de la reinstalacion:

rm -rf node_modules package-lock.json
npm install
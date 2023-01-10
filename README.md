# Proyecto Final Backend

Proyecto finalizado en la carpeta /3_3er Proyecto Final

Deploy: https://proyectofinalbackend-production-071b.up.railway.app/

## Instalación del proyecto

- Primer paso debe clonar el repositorio

  ```
  git clone https://github.com/merb26/ProyectoFinalBackend.git
  ```

- Segundo paso abra la terminal o powershell ubicandose en el directorio /ProyectoFinalBackend/3_3er Proyecto Final
  para instalar todas las dependencias que están detalladas en el fichero package.json.

  Ejecuta el siguiente comando:

  ```
  npm i
  ```

- Tercer paso ya puede ejecutar el proyecto (nota: debe configurar en el archivo ./3_3er Proyecto Final/src/config.js) usa el siguiente comando:

  ```
  npm start
  ```

##

## Endpoints

```
INICIO SESIÓN

/
```

```
CERRAR SESIÓN

/logout
```

```
REGISTRO

/register
```

```
PRODUCTOS

/products
/products/:id
/products/category/:category

```

```
CHAT

/chat
/chat/:email
```

```
CARRITO

/1/products
```

```
INFORMACIÓN Y CONFIGURACIÓN DEL SERVIDOR

/info
```

##

## Tecnologías

- yargs
- connect-mongo
- passport
- passport-local
- bcrypt
- socket.io
- dotenv
- pug
- nodemailer
- pino
- express
- cookie-parser
- express-session
- mongoose
- uuid
- bootstrap

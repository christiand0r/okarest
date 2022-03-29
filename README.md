# Okarest - API REST

Okarest ofrece la posibilidad de consultar 3 endpoints utilizando los verbos `GET, POST, PUT y DELETE`. Está API se integra algunas características especiales como:

- Login (con JWT).
- Ordenes.

**NOTA**: propiedades como id, state, createAt y UpdateAt son autogeneradas y no pueden ser modificables.

Okarest cuenta con rutas privadas protegidas con JWT. Para poder hacer uso de estás rutas, debe realizar lo siguiente:

- Utilizar o crear un nuevo **customer**

- Enviar mediante el body el email y contraseña del customer que se utilizará a la ruta de logueo, ejemplo:

  ```
  {
    "email": "email@email.com",
    "email": "@password1"
  }
  ```

- Una vez logueado usted recibirá un JWT que durará 4h. Para usar las rutas protegidas debe indicar en el header una propiedad llamada oka-token y establecerle como valor su JWT

**NOTA**: las rutas privades se indicarán en su titulo

Los enpoints a consultar son los siguientes:

## **LOGIN**

Este endpoint le permitirá obtener su JWT utilizando algun cliente de la base de datos o creando uno en las rutas para customers

### `POST` /login

## **CUSTOMERS**

Este endpoint devolverá información sobre los clientes, que se encuentran formados de la siguiente manera:

```
{
  id:        {type: String},
  name:      {type: String, required: true},
  email:     {type: String, required: true},
  password:  {type: String, required: true},
  phone:     {type: String},
  state:    {type: Boolean},
  createAt: {type: Date},
  UpdateAt:  {type: Date},
}
```

### `GET` /api/customers

Este endpoint devolverá todos los clientes registrados en la base datos. Para evitar mermas en el rendimiento se cuenta con un páginado que puede ser o no indicado en los **query params** de la petición.

`/api/customers | /api/customers?page=number&per_page=number `

- `page`: indica la página desde se comenzará.
- `per_page`: indica la cantidad de cliente que se enviará por página.

### `GET` /api/customers/:id

Este endpoint devolverá un cliente especifico, indicado mediante el id.

### `POST` /api/customers

Al momento de crear un nuevo cliente se deben indicar las propiedades requeridas en un formato JSON proporcionados mediante el body.

### `PUT` /api/customers/:id - Protegida

La actualización de un cliente se realiza enviado en formato JSON las propiedades que se quieren actualizar, tenga en cuenta que Okarest no ofrece una verificación de dos pasos al momento de actualizar.

Támbien se establece una restricción que solo permite modificar el cliente con el que se logueo

**Además de las propiedades deberá proporcionar el token de verificación para hacer uso de está ruta**

## **PRODUCTS**

Este endpoint devolverá información sobre los productos, que se encuentran formados de la siguiente manera:

```
{
  id:           {type: String},
  name:         {type: String, required: true},
  price:        {type: Number, required: true},
  description:  {type: String},
  owner:        {type: String, required:true},
  state:        {type: Boolean},
  createAt:     {type: Date},
  UpdateAt:     {type: Date},
}
```

### `GET` /api/products

Este endpoint devolverá todos los productos registrados en la base datos. Para evitar mermas en el rendimiento se cuenta con un páginado que puede ser o no indicado en los **query params** de la petición.

`/api/products | /api/products?page=number&per_page=number `

- `page`: indica la página desde se comenzará.
- `per_page`: indica la cantidad de cliente que se enviará por página.

### `GET` /api/products/:id

Este endpoint devolverá un producto especifico, indicado mediante el id.

### `POST` /api/products - Protegida

Al momento de crear un nuevo producto se deben indicar las propiedades requeridas en formato JSON proporcionados mediante el body

### `PUT` /api/customers/:id - Protegida

La actualización de un usuario se realiza enviado en formato JSON las propiedades que se quieren actualizar, solo podrá actualizar los productos que hayan sido agregados por el usuario con el que inicio sesión

**Además de las propiedades deberá proporcionar el token de verificación para hacer uso de está ruta**

## **ORDERS**

Este endpoint devolverá información sobre las ordenes solicitadas por los cliente, se encuentra formado de la siguiente manera:

```
{
  id:                  {type: String},
  customer_id:         {type: String, required: true},
  customer:            {type: Object, required: true},
  products:            {type: Object[], required: true},
  total:               {type: Number, required: true},
  completed:           {type: Boolean},
  state:               {type: Boolean},
  createAt:            {type: Date},
  UpdateAt:            {type: Date},
}
```

### `GET` /api/orders - Protegida

Este endpoint devolverá todas las ordenes registradas en la base datos. Para evitar mermas en el rendimiento se cuenta con un páginado que puede ser o no indicado en los **query params** de la petición.

`/api/orders | /api/orders?page=number&per_page=number `

- `page`: indica la página desde se comenzará.
- `per_page`: indica la cantidad de cliente que se enviará por página.

### `GET` /api/orders/:id - Protegida

Este endpoint devolverá una orden especifica, indicada mediante el id.

### `POST` /api/products - Protegida

Al momento de crear un nueva orden solo se debe indicar el arreglo de productos seleccionado por el cliente utlizando el formato JSON y siendo proporcionados mediante el body

### `PUT` /api/customers/:id - Protegida

La actualización de una orden solo admite la propiedad **completed**, en caso de algun error de teclado o otra naturaleza, se deberá borrar la orden y solicitar una nueva

## **RUTAS DELETE**

### /api/ `customers | products | orders` /:id - Protegida

Okarest maneja la eliminación mediante una propiedad establecida como `state`, esto con el propósito de mantener las referencias en la base datos. Cuando un cliente se marque como eliminado su propiedad `status` pasará a `false` y de está manera será considerado eliminado.

**Además de indicar el id deberá proporcionar el token de verificación para hacer uso de está ruta**

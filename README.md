# Arquetipo NodeJs - Arquitectura limpia Amazon

Aplicación serverless con SAM para la creación de distintas lambdas en las cuentas.
Este proyecto es un arquetipo base pensado para servir como punto de partida. Los usuarios tienen total libertad para personalizarlo, agregar o eliminar funcionalidades según las necesidades específicas de sus proyectos. Siéntete libre de adaptarlo a tu propio flujo de trabajo.

## Requisitos de sistema

Antes de instalar el repositorio asegurate de tener las siguientes herramientas para el desarrollo
de tu aplicación

- [Instalar Docker](https://www.docker.com/get-started)
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [NodeJs y NPM](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

## Instalación

Puedes usar un script de instalacion que clonara el repositorio, eliminara el registro de git e instalara las dependencias
usando el gesto de paquetes de tu gusto

Tenemos que pasar 2 argumentos:

1. Carpeta destino.
2. Gestor de paquetes: npm, yarn o pnpm (obligatorio).

### Uso:

- Para usar el script usa el siguiente comando en bash:

```bash
bash <(curl -s https://raw.githubusercontent.com/jhonGriGi/node-hexagonal-archetype/refs/heads/main/install-script.bash)
```

## Instalacion manual y configuracion de arquetipo

1. Clonar el repositorio e ingresar a la carpeta

```bash
git clone https://github.com/jhonGriGi/node-hexagonal-archetype.git <nombre_carpeta>
cd <nombre_carpeta>
```

2. Eliminar el .git del arquetipo

```bash
rm -rf .git
```

```powershell
Remove-Item -Path ".git" -Recurse -Force
```

3. Inicializar nuevo repositorio

```bash
git init
git fetch
```

4. Agregar nuevo repositorio de trabajo

```bash
git remote add origin <url>
```

## Variables de entorno

Para desplegar el servicio en tu cuenta de aws necesitas configurar 2 variables de entorno en
template.yml

`POWERTOOLS_SERVICE_NAME`

`POWERTOOLS_METRICS_NAMESPACE`

El objetivo de estas variables es identificar el servicio en el momento de leer metricas y logs

## Ejecución local

En la consola entra a la carpeta del proyecto

```bash
  cd node-hexagonal-archetype
```

Instala las dependencias

```bash
  npm install
```

Asegurate de tener tu docker activo, en caso de estar en linux puedes ejecutar:

```bash
  sudo systemctl is-active docker
```

Ejecuta SAM para la invocación local de tu función lambda usando el evento que se encuentra en la
carpeta events del proyecto

```bash
sam local invoke ProductsFunction --event events/event.json
```

## Tests

Para ejecutar los test, ejecuta el siguiente comando en la terminal

```bash
  npm run test
```

## Explicación del proyecto

El proyecto utiliza la arquitectura limpia de Amazon Web Services, puedes encontrar más información
en el siguiente link.

[Hexagonal architectures](https://docs.aws.amazon.com/es_es/prescriptive-guidance/latest/hexagonal-architectures/hexagonal-architectures.pdf)

```bash
├── app
│   ├── adapters
│   │   └── sql-driver-repository.ts # los adapters tendran las implementaciones externas como bases de datos u otras apis
│   ├── domain
│   │   ├── Builders
│   │   │   └── ApiResponseBuilder.ts # builder para crear la respuesta de la lambda
│   │   ├── command      # dentro de los command estara la logica de negocio de la aplicacion
│   │   │   ├── create_product
│   │   │   │   ├── query_handler.ts
│   │   │   │   └── query.ts
│   │   │   ├── delete_product
│   │   │   │   ├── query_handler.ts
│   │   │   │   └── query.ts
│   │   │   └── update_product
│   │   │       ├── query_handler.ts
│   │   │       └── query.ts
│   │   ├── constants
│   │   │   └── constants.ts
│   │   ├── exceptions
│   │   │   ├── domain-exception.ts
│   │   │   └── repository-exception.ts
│   │   ├── model
│   │   │   ├── product.ts
│   │   │   └── product-version.ts
│   │   └── ports     # los ports seran las interfaces que seran implementadas en los adaptadores
│   │       └── product-repository.ts
│   ├── entrypoints
│   │   ├── lambda    # los entrypoints de la lambda en este lugar estaran los handlers
│   │   │   └── products-handler.ts
│   │   ├── schemas   # los tipos de request y response de los handlers
│   │   │   └── products.ts
│   │   └── tests
│   │       └── unit
│   │           └── products-handler.test.ts
│   └── libraries     # en libraries estaran las implementaciones de las librerias externas
│       ├── lambda-handler-interface.ts
│       ├── logger.ts
│       ├── metrics.ts
│       ├── orm
│       │   └── internals
│       │       ├── database-config.ts
│       │       ├── prisma.ts
│       │       ├── sequelize.ts
│       │       └── sql-driver.ts
│       └── tracer.ts
├── app.ts
├── events     # Los eventos estaran alojados en events para la ejecucion local con sam
│   └── event.json
├── jest.config.ts
├── package.json
├── package-lock.json
├── README.md
├── samconfig.toml
├── template.yaml
└── tsconfig.json
```

El repositorio utiliza los siguientes patrones:

- [Factory](https://refactoring.guru/es/design-patterns/factory-method): para la implementación de
  conexiones a base de datos
- [Proxy](https://refactoring.guru/es/design-patterns/proxy): para la implementación de librerias
  reduciendo asi la integración de librerias externas en el código fuente
- [Builder](https://refactoring.guru/es/design-patterns/builder): se usa principalmente en la
  creación de las respuestas de la api

```typescript
ApiResponseBuilder.empty()
    .withStatusCode(200)
    .withHeaders({ 'Content-Type': 'application/json' })
    .withBody({
        Hello: 'World',
    })
    .build();
```

## Desplegar la aplicación de ejemplo

La Interfaz de Línea de Comandos del Modelo de Aplicaciones Sin Servidor (SAM CLI) es una extensión
de la AWS CLI que agrega funcionalidades para construir y probar aplicaciones Lambda. Utiliza Docker
para ejecutar tus funciones en un entorno Amazon Linux que coincide con Lambda. También puede emular
el entorno de construcción y la API de tu aplicación.

Para usar la SAM CLI, necesitas las siguientes herramientas:

- SAM
  CLI - [Instalar SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Node.js - [Instalar Node.js 20](https://nodejs.org/en/), incluyendo la herramienta de gestión de
  paquetes NPM.
- Docker - [Instalar Docker edición comunitaria](https://hub.docker.com/search/?type=edition&offering=community)

Para construir y desplegar tu aplicación por primera vez, ejecuta lo siguiente en tu terminal:

```bash
sam build
sam deploy --guided
```

El primer comando construirá el código fuente de tu aplicación. El segundo comando empaquetará y
desplegará tu aplicación a AWS, con una serie de indicaciones:

- **Nombre de la pila**: El nombre de la pila para desplegar en CloudFormation. Debe ser único para
  tu cuenta y región, y un buen punto de partida podría ser algo que coincida con el nombre de tu
  proyecto.
- **Región de AWS**: La región de AWS a la que deseas desplegar tu aplicación.
- **Confirmar cambios antes del despliegue**: Si se establece en sí, cualquier conjunto de cambios
  se mostrará antes de la ejecución para una revisión manual. Si se establece en no, la AWS SAM CLI
  desplegará automáticamente los cambios de la aplicación.
- **Permitir creación de roles IAM por la SAM CLI**: Muchas plantillas de AWS SAM, incluida esta,
  crean roles IAM de AWS requeridos para que las funciones AWS Lambda incluidas accedan a los
  servicios de AWS. Por defecto, estos roles están limitados a los permisos mínimos necesarios. Para
  desplegar una pila de AWS CloudFormation que cree o modifique roles IAM, se debe proporcionar el
  valor `CAPABILITY_IAM` para `capabilities`. Si no se proporciona este permiso a través de este
  mensaje, para desplegar este ejemplo, debes pasar explícitamente `--capabilities CAPABILITY_IAM`
  al comando `sam deploy`.
- **Guardar los argumentos en samconfig.toml**: Si se establece en sí, tus elecciones se guardarán
  en un archivo de configuración dentro del proyecto, para que en el futuro solo tengas que volver a
  ejecutar `sam deploy` sin parámetros para desplegar cambios en tu aplicación.

Puedes encontrar la URL del Endpoint de tu API Gateway en los valores de salida que se muestran
después del despliegue.

## Agregar un recurso a tu aplicación

La plantilla de la aplicación utiliza el Modelo de Aplicaciones Sin Servidor de AWS (AWS SAM) para
definir los recursos de la aplicación. AWS SAM es una extensión de AWS CloudFormation con una
sintaxis más sencilla para configurar recursos comunes de aplicaciones sin servidor, como funciones,
activadores y APIs. Para los recursos que no están incluidos
en [la especificación de SAM](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md),
puedes utilizar los tipos de recursos estándar
de [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).

## Recursos

Consulta
la [guía para desarrolladores de AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
para obtener una introducción a la especificación de SAM, la CLI de SAM y los conceptos de
aplicaciones sin servidor.

A continuación, puedes utilizar el Repositorio de Aplicaciones Sin Servidor de AWS para desplegar
aplicaciones listas para usar que van más allá de los ejemplos de "Hola Mundo" y aprender cómo los
autores desarrollaron sus
aplicaciones: [Página principal del Repositorio de Aplicaciones Sin Servidor de AWS](https://aws.amazon.com/serverless/serverlessrepo/)

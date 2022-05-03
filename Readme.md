# Recordatorio de medicamentos

Cada pantalla debe enviar sus datos en un objeto JSON a las siguiente pantalla, es decir la primera pantalla manda los datos a la segunda, la segunda debe mandar los datos de la primera y la segunda a la tercera pantalla, y la última pantalla debe guardar todos los datos obetenidos en la base de datos.
```json
{pantallaRegitrarMEdicamento : {regitrarMEdicamento:{nombreMedicamento:String,tipoAdministracion:String}}}

{pantallaDosisDelMedicamento : { dosisDelMedicamento: {dosis:Int, cantidadMed:Int}}}

{pantallaFrecuenciaMedicamento : {frecuenciaMedicamento: {frecuencica:Int}}}

{pantallaHoraRecordatorio : {horaRecordatorio: {hora:[Datetime]}}}

{pantallaDuracionTratamiento : {duracionTratamiento: {duracion:String}}}
```

Para la editar y elimnar datos por medio de las pantallas se utilizara los parametros
             {id:String,editar : boolean } 
junto con todos los datos que manda cada pantalla

## Reglas
- Para la navegación entre pantallas se usará el módulo navigation.js
- Que App.js será el archivo principal de ejecución, que llamará a todos los módulos y pantallas
- Todo código debe estar en espaniol (no usen el caracter "ñ" en el programa), excepto las dependencias.
- Se debe añadir al archivo readme, el m¿nombre de las dependencias usadas (picker, datepicker, elements.....)
- Lo estilos de cada pantalla se encontraran en el mismo archivo (por ahora...)
- Tamanios de pantalla:
    fontSize: 
        encabezado: 30
        subtitulo: 25
        botones: 20
        demas texto: 20-25
    font: predeterminado
    
## Dependencias
- @react-native-picker/picker
- expo-notifications
- expo-device




## Como Utilizar El Proyecto
Es necesario instalar [Git](https://git-scm.com/) para clonar el repositorio y [Node.js](https://nodejs.org/) 16.14.2 , para correr el proyecto.

Una vez en el proyecto y con Git instalado, se procede a clonar el repositorio localmente.
```cmd
git clone https://github.com/RodolfoLL/proyectoIS-2022.git
```
O
```cmd
git clone git@github.com:RodolfoLL/proyectoIS-2022.git
```
Cualquiera de las dos formas, de acuerdo a la configuración local de cada uno.

Con el proyecto clonado, se dirige a la carpeta del proyecto.
```cmd
cd proyectoIS-2022
```
Dentro de la carpeta se instalaran las dependencias del proyecto con npm, para esto, se debe contar ya con Node.js corriendo.
```cmd
npm install
```
y depués para correr el proyecto: 
```cmd
npm start
```
## Como hacer deploy?
Debes cambiar version del proyecto y la versión del codigo en el archivo app.json y correr el siguiente comando:
```cmd
expo build:android
```
Esto subira el proyecto a expo y hará el lanzamiento de la applicación de forma clásica, hay otra forma de lanzar con eas pero se explicará en otro apartado.
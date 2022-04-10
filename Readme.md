# Recordatorio de medicamentos

Cada pantalla debe enviar sus datos en un objeto JSON a las siguiente pantalla, es decir la primera pantalla manda los datos a la segunda, la segunda debe mandar los datos de la primera y la segunda a la tercera pantalla, y la última pantalla debe guardar todos los datos obetenidos en la base de datos.

```json
pantallaRegitrarMEdicamento = {regitrarMEdicamento:{nombreMedicamento:String,tipoAdministracion:String}}

pantallaDosisDelMedicamento = { dosisDelMedicamento: {dosis:Int, cantidadMed:Int}}

pantallaFrecuenciaMedicamento = {frecuenciaMedicamento: {frecuencica:Int}}

pantallaHoraRecordatorio = {horaRecordatorio: {hora:[Datetime]}}

pantallaDuracionTratamiento = {duracionTratamiento: {duracion:String}}
```

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





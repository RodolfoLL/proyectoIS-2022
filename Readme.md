# Recordatorio de medicamentos

Cada pantalla debe enviar sus datos en un objeto JSON a las siguiente pantalla, es decir la primera pantalla manda los datos a la segunda, la segunda debe mandar los datos de la primera y la segunda a la tercera pantalla, y la última pantalla debe guardar todos los datos obetenidos en la base de datos.
'''json
pantallaRegitrarMEdicamento = {regitrarMEdicamento:     
                        {nombreMEdicamento:String,tipoAdministracion:String}}

pantallaDosisDelMedicamento = { dosisDelMedicamento:
                        {dosis:Int, cantidadMed:Int}}

pantallaFrecuenciaMedicamento = {frecuenciaMedicamento:
                        {frecuencica:Int}}

pantallaHoraRecordatorio = {horaRecordatorio:
                    {hora:[Datetime]}}

pantallaDuracionTratamiento = {duracionTratamiento:
                        {duracion:String}}
'''






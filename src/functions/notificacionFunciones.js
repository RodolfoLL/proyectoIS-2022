import AsyncStorage from '@react-native-async-storage/async-storage';

//Este metodo convierte un arreglo de horas como por ejemplo: ["5:06 PM", "10:20 AM"] a [{hora:17,minuto:6},{hora:10,minuto:20}]
const parseHorasMinutos = (arregloHoras) =>{
    let resultadoHoras =[]
    let horaParse = 0;
    let minutoParse = 0;
    let sistHorario = "";
    console.log(arregloHoras)
    arregloHoras.forEach(horaMinuto =>{
        if(horaMinuto.length==7){
            horaParse = Number(horaMinuto[0])
            minutoParse = Number(horaMinuto[2]+horaMinuto[3])
            sistHorario = horaMinuto[5]+horaMinuto[6]
        }else{
            horaParse = Number(horaMinuto[0]+horaMinuto[1])
            minutoParse = Number(horaMinuto[3]+horaMinuto[4])
            sistHorario = horaMinuto[6]+horaMinuto[7]
        }
        horaParse = sistHorario=="PM" && horaParse!=12? horaParse+12: horaParse;
        resultadoHoras.push({hora:horaParse, minuto:minutoParse});
    });
    return resultadoHoras
}

const crearFechasNotificación = (horasMinutos,fechaTermino, minutosAnticipación=0)=>{
    var fechasNotificacion = []
    const horas = parseHorasMinutos(horasMinutos)// arreglo de horas en formato de 24hrs
    console.log(horas)
    horas.forEach(objHora => {
        let fechaContenedora = new Date(Date.now());//iniciara como la fecha actual
        fechaContenedora.setHours(objHora.hora,objHora.minuto,0,0);
        fechaTermino.setHours(objHora.hora,objHora.minuto,0,0)
        while(fechaContenedora.getTime() <= fechaTermino.getTime()){
            fechasNotificacion.push(new Date(fechaContenedora.getTime()- 60 * minutosAnticipación * 1000));
            fechaContenedora.setTime(fechaContenedora.getTime() + 60 * 60 * 24 *1000)
        }
    });
    return fechasNotificacion;
};
const eliminarRecordatorioStorage = async (userId,recordatorioId)=>{
    let recordatorio = {};
    AsyncStorage.getItem(userId)
      .then(itemStorage=> {
        if(itemStorage != null){
            recordatorio = JSON.parse(itemStorage);
            if(recordatorio["usersId"][userId]["recordatoriosId"][recordatorioId] !=null){
                delete recordatorio["usersId"][userId]["recordatoriosId"][recordatorioId]
                let jsonValue = JSON.stringify(recordatorio);
                AsyncStorage.setItem(userId, jsonValue)
                .then(data=>{console.log("Recordatorio eliminado-----------------------------");})
            }
        }
      })
};
const guardarNotificaciones = async (userId,recordatorioId,notificacionId) => {
    console.log("--------------------------------Guardar En storage")
    try {
      userId = userId + "";
      recordatorioId = recordatorioId + "";
      let recordatorio = {};
      await AsyncStorage.getItem(userId)
      .then(async itemStorage=> {
        console.log(itemStorage)
        if(itemStorage != null){
            recordatorio = JSON.parse(itemStorage);
            console.log(recordatorio)
            console.log("------------------------------------------------------Entra para itemStorage "+ userId)
           
            if((recordatorio["usersId"][userId] !=null)){
                
                console.log("------------------------------------------------------Entra para userid")
                recordatorio["usersId"][userId]["recordatoriosId"][recordatorioId] = notificacionId
            }else{
                console.log("------------------------------------------------------Entra para el else")
                recordatorio["usersId"][userId]= {"recordatoriosId":{}}
                recordatorio["usersId"][userId]["recordatoriosId"][recordatorioId] = notificacionId
            }
        }else{
            recordatorio["usersId"] = {}
            recordatorio["usersId"][userId]= {"recordatoriosId":{}}
            recordatorio["usersId"][userId]["recordatoriosId"][recordatorioId] = notificacionId
        }  
        const jsonValue = JSON.stringify(recordatorio)
        console.log("**********************")
        console.log(jsonValue)
        await AsyncStorage.setItem(userId, jsonValue)
        .then(()=>{return jsonValue})
        
      });
      

    } catch (e) {
        console.log("Error al guardar datos en la memoria !!!!")
      // saving error
    }
  }
//recordatorio = {item.id, notificaciones}
const obetenerDatosRecordatorios = async (userId, recordatorioId) => {
    let recordatoriosIds = [];
    let recordatorios = {};
    try {
        userId = userId + "";
        const jsonValue = await AsyncStorage.getItem(userId);
        // var res = jsonValue != null ? JSON.parse(jsonValue) : {};
        if(jsonValue != null){
            recordatorios = JSON.parse(jsonValue);
            recordatoriosIds = recordatorios["usersId"][userId]["recordatoriosId"][recordatorioId]
        }
        console.log(JSON.stringify(recordatorios))
        // alert(JSON.stringify(res));
    } catch(e) {
        console.log("No se pudo obtener las notiicaiones del almacenamiento por :"+e)
        // error reading value
    }
    return recordatorios;
}

export { parseHorasMinutos, crearFechasNotificación, obetenerDatosRecordatorios, guardarNotificaciones, eliminarRecordatorioStorage};
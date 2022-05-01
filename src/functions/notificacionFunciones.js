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

export { parseHorasMinutos, crearFechasNotificación};
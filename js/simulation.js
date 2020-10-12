
let capitalRange ={
    valor_actual: 50000,
    valor_max:100000,
    valor_min:1000,
    valor_formato: function(){
        return new Intl.NumberFormat(
            'es-PE', { 
                style: 'currency', currency: 'PEN' 
            }
            ).format(this.valor_actual);
        },    
        color : '#39b54a',
        porcentaje_pintado: function(){
                return (this.valor_actual / this.valor_min);
            }, 
        pintar: function(){
            return `linear-gradient(to right, ${this.color} 0%, ${this.color} ${this.porcentaje_pintado()}%, #fff  ${this.porcentaje_pintado()}%, white 100%)`
        }    
}

let tiempoRange ={
    valor_actual:18,
    valor_max:24,
    valor_min:6,
    valor_formato: function(){
        return this.valor_actual + " meses";
    },
    color : '#39b54a',
    porcentaje_pintado: function(){
            let _percentage = 65;
            switch(this.valor_actual)
            {
                case "6":
                    _percentage=1
                break;
                case "12":
                    _percentage=35
                break;
                case "18":
                    _percentage=65
                break;
                case "24":
                    _percentage=100
                break;

                default:
                    _percentage=65
                break;
            }
            return _percentage;
        },

    pintar: function(){
            return `linear-gradient(to right, ${this.color} 0%, ${this.color} ${this.porcentaje_pintado()}%, #fff  ${this.porcentaje_pintado()}%, white 100%)`
        }  
}

let simulacion = {

    rentabilidad_total: function(){
        let percentage = '42 %';
        switch (tiempoRange.valor_actual) {
            case "6":
                percentage='12 %'
                break;
            case "12":
                percentage='28 %'
                break;
            case "18":
                percentage='42 %'    
                break;
            case "24":
                percentage='60 %'
                break;
        
            default:
                break;
        }
        return percentage;
    },
    
    porcentaje_mensual:function(){
        textoPorcentajeTotal =  this.rentabilidad_total().substring(0,2)
        let porcentaje = textoPorcentajeTotal/tiempoRange.valor_actual;
        return porcentaje.toFixed(3);
    },
    pago_mensual: function(){
        let pago_mensual =(this.porcentaje_mensual()*capitalRange.valor_actual)/100;
        
        return new Intl.NumberFormat(
            'es-PE', { 
                style: 'currency', currency: 'PEN' 
            }
            ).format(pago_mensual);
    },
    total_intereses: function(){
        let pago_mensual =(this.porcentaje_mensual()*capitalRange.valor_actual)/100;
        let total = pago_mensual * tiempoRange.valor_actual;
        return new Intl.NumberFormat(
            'es-PE', { 
                style: 'currency', currency: 'PEN' 
            }
            ).format(total);

    }

}

actualizarData();

capital_range.oninput = function() {
   capitalRange.valor_actual =this.value;
   actualizarData()
}

capital_range_dos.oninput = function() {
   capitalRange.valor_actual =this.value;

   actualizarData()
}

time_range.oninput = function() {
   tiempoRange.valor_actual =this.value;
   actualizarData()
}

time_range_dos.oninput = function() {
   tiempoRange.valor_actual =this.value;

   actualizarData()
}

btn_calcular.onclick = function(){
    // alert("jeee")
    url =`https://api.whatsapp.com/send?phone=51924617931&text=Hola!%20quiero%20invertir%20${capitalRange.valor_formato()}%20por%20${tiempoRange.valor_formato()},%20mi%20nombre%20es`;
    window.open(url);

}



function actualizarData(){

    // capital 
    document.getElementsByName('capital')[0].innerHTML = capitalRange.valor_formato();
    document.getElementsByName('capital')[1].innerHTML = capitalRange.valor_formato();
    
    
    document.getElementById('capital_range').value = capitalRange.valor_actual;
    document.getElementById('capital_range_dos').value = capitalRange.valor_actual;
    
    // pintado de range capital 
    document.getElementById('capital_range').style.background = capitalRange.pintar();
    document.getElementById('capital_range_dos').style.background = capitalRange.pintar();
    
    //tiempo
    
    document.getElementsByName('time')[0].innerHTML = tiempoRange.valor_formato();
    document.getElementsByName('time')[1].innerHTML = tiempoRange.valor_formato();
    document.getElementsByName('time')[2].innerHTML = tiempoRange.valor_formato();
    
    document.getElementById('time_range').value = tiempoRange.valor_actual;
    document.getElementById('time_range_dos').value = tiempoRange.valor_actual;

    document.getElementById('time_range').style.background = tiempoRange.pintar();
    document.getElementById('time_range_dos').style.background = tiempoRange.pintar();

    //simulacion
    document.getElementsByName("rentabilidad_percentage")[0].innerHTML = simulacion.rentabilidad_total();
    document.getElementsByName("rentabilidad_percentage")[1].innerHTML = simulacion.rentabilidad_total();
    
    document.getElementsByName("month_paid")[0].innerHTML = simulacion.pago_mensual();
    
    document.getElementsByName("mes_percentage")[0].innerHTML = simulacion.porcentaje_mensual() +' %';
    document.getElementsByName("interes_total")[0].innerHTML = simulacion.total_intereses();
    
    document.getElementsByName("inversion_output")[0].innerHTML = capitalRange.valor_formato();
    document.getElementsByName("inversion_output")[1].innerHTML = capitalRange.valor_formato();


    //tabla
// document.getElementById("titulo_tabla").innerHTML = tituloTabla(tiempoRange.valor_actual);

    generarTabla("table_body",tiempoRange.valor_actual)

}



function generarTabla(table_bodyId,tiempo){

    let body_table = document.getElementById(table_bodyId)
    // porcentaje
    let percentage = simulacion.porcentaje_mensual();

    // pago mensual 
    let pago_mensual_interes = simulacion.pago_mensual();

    // tiempo de inversion
    let fechas_pagos = FechasPago(tiempo);

    // generando la tabla
    body_table.innerHTML="";
    for (let i = 0; i < tiempo; i++) {
        let mes = i+1;
        let fila = document.createElement("tr");
        fila.appendChild(crearCell(mes))
        // fila.appendChild(crearCell(percentage))
        fila.appendChild(crearCell(pago_mensual_interes))
        fila.appendChild(crearCell(fechas_pagos[i]))
        body_table.appendChild(fila);
    }
    // resultados 
    return body_table;
}



function crearCell( val){
    let cell = document.createElement("td");
    let textoCelda = document.createTextNode(val)
    cell.appendChild(textoCelda)
    return cell
}

function FechasPago(tiempo)
{
    
    let fecha_actual = new Date();
    let dia = fecha_actual.getDate();
    let mes = fecha_actual.getMonth()+1;
    let anio = fecha_actual.getFullYear();

    let data = [];

    for (let i = 0; i < tiempo; i++) {
        let diaImprimir
        let mesImprimir
        
        if(mes<12){
            dia= fecha_actual.getDate();
            mes +=1;

            if(dia==31){
                dia=1
            }
            if(dia >=29 && mes ==2){
                dia =28
            }
            
        }else{
            mes=1
            anio+=1
        }

        if(dia<10){
            diaImprimir= '0'+dia;
        }else{
            diaImprimir=dia;
        }

        if(mes<10){
            mesImprimir = '0'+mes;
        }else{
            mesImprimir=mes;
        }


        data[i]= `${diaImprimir}/${mesImprimir}/${anio}` 
       
    }
    return data;
}



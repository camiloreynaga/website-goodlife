// ****** Range Slider

// Capital range slider
const capital_slider = document.getElementById("capital_range") 
const capital_output = document.getElementById("capital");
// Time range slider
const time_slider = document.getElementById("time_range");
const time_output = document.getElementById("time");
// initial values
let capital = capital_slider.value; 
// paint range
let valorIncrementoCapital = 1000; // step
let paintValue_capital = (capital / valorIncrementoCapital); 
let paintValue_time = 65; // initial value
let color = '#39b54a';

//table

//titulo
let title_table = document.getElementById("titulo_tabla");
//cuerpo
let table_body = document.getElementById('table_body');
// % total  (rentabilidad)
let _rentabilidad_total =  document.getElementById("rentabilidad_percentage").textContent;
// ****endTable

/** Valores iniciales */

// Display the default capital_slider value
inversion_output.innerHTML = capital_output.innerHTML = formatoSoles(capital);; 

//Display default time (moths) value
time_output.innerHTML = formatoMeses(time_slider.value);

capital_slider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${paintValue_capital}%, #fff  ${paintValue_capital}%, white 100%)`
time_slider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${paintValue_time}%, #fff  ${paintValue_time}%, white 100%)`

// exec to initial load

document.onload = calcMonthPaid(time_slider.value);
generarTabla(
    table_body,
    time_slider.value, //meses
    _rentabilidad_total
    );

/** Slider Range Events */

// Update the current capital_slider value (each time you drag the capital_slider handle)
capital_slider.oninput = function() {
    let _capital =this.value;

    let valorIncremento = 1000; // step
    let paintValue = (_capital / valorIncremento); 
    let color = '#39b54a';

    this.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${paintValue}%, #fff  ${paintValue}%, white 100%)`

    inversion_output.innerHTML = capital_output.innerHTML = formatoSoles(_capital);
    
    titulo_tabla.innerHTML = tituloTabla(time_slider.value);
    calcMonthPaid(time_slider.value)
    month_paid.innerHTML = formatoSoles(interesMensual(time_slider.value,_capital,rentabilidad_percentage.textContent));
    generarTabla(
        table_body,
        time_slider.value, //meses
        _rentabilidad_total
        );
    // console.log(8);
}

// time calculation
time_slider.oninput = function(){
    let _time = this.value;
    let paintValue = timePercentage(this.value); 
    let color = '#39b54a';
    this.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${paintValue}%, #fff  ${paintValue}%, white 100%)`

    time_output.innerHTML = formatoMeses(_time);
    
    titulo_tabla.innerHTML = tituloTabla(time_slider.value);

    calcMonthPaid(time_slider.value)
    //tiempo, capital, rentabilidadTotal
    month_paid.innerHTML = formatoSoles(interesMensual(_time,capital_slider.value,rentabilidad_percentage.textContent));
    generarTabla(
        table_body,
        time_slider.value, //meses
        _rentabilidad_total
        )

}

// Calc profit - calculos de rentabilidad 

function calcMonthPaid(tiempo)
{
    
    const rentabilidad = document.getElementById("rentabilidad_percentage");
    let percentage = '12 %';
    switch (tiempo) {
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
    // month_paid_output.innerHTML = formatoSoles(pago);
    rentabilidad.innerHTML = percentage;
    
}

function interesMensual(tiempo, capital, rentabilidadTotal){
    let _porcentaje = RentabilidadMensual(rentabilidadTotal,tiempo)
    return (_porcentaje*capital)/100;
}


function generarTabla(table_body,nroMeses,_rentabilidad_total){

    // porcentaje
    let percentage = RentabilidadMensual(_rentabilidad_total,nroMeses);

    // pago mensual 
    const month_paid = document.getElementById("month_paid");
    let pago_mensual_interes = month_paid.textContent;

    // tiempo de inversion
    let fechas_pagos = FechasPago(nroMeses);

    // generando la tabla
    table_body.innerHTML="";
    for (let i = 0; i < nroMeses; i++) {
        let mes = i+1;
        let fila = document.createElement("tr");
        fila.appendChild(crearCell(mes))
        fila.appendChild(crearCell(percentage))
        fila.appendChild(crearCell(pago_mensual_interes))
        fila.appendChild(crearCell(fechas_pagos[i]))

        table_body.appendChild(fila);
    }
    // resultados 
    return table_body;
}  

function tituloTabla(nroMeses){
    return 'Por '+ formatoMeses(nroMeses) ;
}

// percentage to time range
function timePercentage(time)
    {
        let _percentage = 1;
        switch(time)
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
                _percentage=1
            break;
        }
        return _percentage;

    }


//convert to PEN
function formatoSoles(monto){
    return new Intl.NumberFormat(
         'es-PE', { 
             style: 'currency', currency: 'PEN' 
            }
        ).format(monto);
}

// foramt to months
function formatoMeses(tiempo){
    return tiempo + " meses";
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

function RentabilidadMensual(textoPorcentajeTotal,tiempo){
    textoPorcentajeTotal =  textoPorcentajeTotal.substring(0,2)
    let porcentaje = textoPorcentajeTotal/tiempo;

    return porcentaje.toFixed(3); // 3 decimales

    
}
    

function crearCell( val){
    let cell = document.createElement("td");
    let textoCelda = document.createTextNode(val)
    cell.appendChild(textoCelda)
    return cell
}
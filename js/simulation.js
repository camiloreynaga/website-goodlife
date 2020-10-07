// Capital range slider

const capital_slider = document.getElementById("capital_range");
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



// Display the default capital_slider value
inversion_output.innerHTML = capital_output.innerHTML = formatoSoles(capital);; 

//Display default time (moths) value
time_output.innerHTML = formatoMeses(time_slider.value);



capital_slider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${paintValue_capital}%, #fff  ${paintValue_capital}%, white 100%)`
time_slider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${paintValue_time}%, #fff  ${paintValue_time}%, white 100%)`

// exec to initial load
document.onload = calcMonthPaid();
generarTabla(time_slider.value);   


// Update the current capital_slider value (each time you drag the capital_slider handle)
capital_slider.oninput = function() {
    let _capital =this.value;

    let valorIncremento = 1000; // step
    let paintValue = (_capital / valorIncremento); 
    let color = '#39b54a';

    this.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${paintValue}%, #fff  ${paintValue}%, white 100%)`

    inversion_output.innerHTML = capital_output.innerHTML = formatoSoles(_capital);
    inversion_output.innerHTML = capital_output.innerHTML = formatoSoles(_capital);
    
    calcMonthPaid()
    // console.log(8);
}

// time calculation
time_slider.oninput = function(){
    let _time = this.value;
    let paintValue = timePercentage(this.value); 
    let color = '#39b54a';
    this.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${paintValue}%, #fff  ${paintValue}%, white 100%)`

    time_output.innerHTML =  formatoMeses(_time);
    calcMonthPaid()
    generarTabla(time_slider.value)
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

// Calc profit - calculos de rentabilidad 

function calcMonthPaid()
{
    const capital = document.getElementById("capital_range").value;
    const time  = document.getElementById("time_range").value;
    const month_paid = document.getElementById("month_paid");
    const rentabilidad = document.getElementById("rentabilidad_percentage");
    let r =0.02; //2%
    let pago = r * capital;
    let percentage = '12 %';
    switch (time) {
        case "6":
            percentage='12 %'
            r= 0.0200 //2.0%
            break;
        case "12":
            percentage='28 %'
            r= 0.0233 //2.3%
            break;
        case "18":
            percentage='42 %'    
            r= 0.0233 //2.3%
            break;
        case "24":
            percentage='60 %'
            r= 0.0250 //2.5%
            break;
    
        default:
            break;
    }
    pago = r * capital;
    month_paid.innerHTML = formatoSoles(pago);
    rentabilidad.innerHTML = percentage;
}

function generarTabla(nroMeses){
    let title_table = document.getElementById("titulo_tabla");
    let table_body = document.getElementById('table_body');
    table_body.innerHTML="";
    for (let i = 0; i < nroMeses; i++) {

        let mes = i+1;
        let percentage = '6%';
        let interes = 1188.30
        let fecha = '07/11/2020'

        let fila = document.createElement("tr");
        
        fila.appendChild(crearCell(mes))
        fila.appendChild(crearCell(percentage))
        fila.appendChild(crearCell(interes))
        fila.appendChild(crearCell(fecha))

        table_body.appendChild(fila);
    }
    title_table.innerHTML = 'Por '+ formatoMeses(nroMeses) ;
}    
    

function crearCell( val){
    let cell = document.createElement("td");
    let textoCelda = document.createTextNode(val)
    cell.appendChild(textoCelda)
    return cell
}
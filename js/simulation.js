
const capital_slider = document.getElementById("capital_range");
const capital_output = document.getElementById("capital");

const time_slider = document.getElementById("time_range");
const time_output = document.getElementById("time");

let capital = capital_slider.value; 

document.onload = calcMonthPaid();
 // Display the default capital_slider value
inversion_output.innerHTML = capital_output.innerHTML = formatoSoles(capital);; 
//Display defaulta time (moths) value
time_output.innerHTML = formatoMeses(time_slider.value);

// Update the current capital_slider value (each time you drag the capital_slider handle)
capital_slider.oninput = function() {
    let _capital =this.value;
    inversion_output.innerHTML = capital_output.innerHTML = formatoSoles(_capital);
    calcMonthPaid()
    // console.log(8);
}

time_slider.oninput
// time calculation
time_slider.oninput = function(){
    let _time = this.value;
    time_output.innerHTML =  formatoMeses(_time);
    calcMonthPaid()
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
    let r =0.02; 
    let pago = r * capital;
    let percentage = '12 %';
    switch (time) {
        case "6":
            percentage='12 %'
            r= 0.0200
            break;
        case "12":
            percentage='28 %'
            r= 0.0233
            break;
        case "18":
            percentage='42 %'    
            r= 0.0233
            break;
        case "24":
            percentage='60 %'
            r= 0.0250
            break;
    
        default:
            break;
    }
    pago = r * capital;
    month_paid.innerHTML = formatoSoles(pago);
    rentabilidad.innerHTML = percentage;
}
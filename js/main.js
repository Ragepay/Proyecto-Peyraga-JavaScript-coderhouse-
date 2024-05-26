document.addEventListener('DOMContentLoaded', () => {
    loadInputsFromLocalStorage();
    loadResultsFromLocalStorage();
    loadHistorialFromLocalStorage();
});

function calcularSueldo() {
    const AUMENTO = 1.00;
    let tm16m = 918760 * AUMENTO;
    let tm712m = 1050120 * AUMENTO;
    let tm1 = 1266784 * AUMENTO;
    let tm2 = 1304782 * AUMENTO;
    let tm3 = 1369919 * AUMENTO;
    let tm3a = 1438007 * AUMENTO;
    let tm3b = 1509967 * AUMENTO;
    let tl1 = 1585963 * AUMENTO;
    let tl2 = 1664749 * AUMENTO;
    let tl3 = 1748806 * AUMENTO;
    let tl3a = 1835811 * AUMENTO;
    let constante192 = 192.025294117647;
    let a = constante192;

    let categoria = document.getElementById("categoria").value;
    let base;
    let sueldoBase;
    let sueldoBruto;
    let sueldoNeto;
    let horas50;
    let horas100;
    let horas200;
    let horasNocturnas;
    let antiguedad;
    let antiguedadTotal = 0;

    switch (categoria) {
        case "T/M 0-6":
            sueldoBase = tm16m;
            base = parseFloat(tm16m);
            break;
        case "T/M 7-12":
            sueldoBase = tm712m;
            base = parseFloat(tm712m);
            break;
        case "T/M 1":
            sueldoBase = tm1;
            base = parseFloat(tm1);
            break;
        case "T/M 2":
            sueldoBase = tm2;
            base = parseFloat(tm2);
            break;
        case "T/M 3":
            sueldoBase = tm3;
            base = parseFloat(tm3);
            break;
        case "T/M 3 A":
            sueldoBase = tm3a;
            base = parseFloat(tm3a);
            break;
        case "T/M 3 B":
            sueldoBase = tm3b;
            base = parseFloat(tm3b);
            break;
        case "T/L 1":
            sueldoBase = tl1;
            base = parseFloat(tl1);
            break;
        case "T/L 2":
            sueldoBase = tl2;
            base = parseFloat(tl2);
            break;
        case "T/L 3":
            sueldoBase = tl3;
            base = parseFloat(tl3);
            break;
        case "T/L 3 A":
            sueldoBase = tl3a;
            base = parseFloat(tl3a);
            break;
        default:
            sueldoBase = parseFloat(document.getElementById("sueldoBruto").value);
            if (isNaN(sueldoBase)) {
                sueldoBase = 0;
            }
            base = 0;
    }

    saveInputsToLocalStorage({
        categoria,
        antiguedad: document.getElementById("antigüedad").value,
        horas50: document.getElementById("horas-50").value,
        horas100: document.getElementById("horas-100").value,
        horas200: document.getElementById("horas-200").value,
        horasNocturnas: document.getElementById("horas-nocturnas").value,
        productividad: document.querySelector('input[name="productividad"]:checked').value,
        presentismo: document.querySelector('input[name="presentismo"]:checked').value
    });

    let radioProductividadSi = document.getElementById("productividadSi");
    let radioPresentismoSi = document.getElementById("presentismoSi");

    if ((radioProductividadSi.checked) && (radioPresentismoSi.checked)) {
        sueldoBase *= 1.281;
    } else if ((radioProductividadSi.checked) || (radioPresentismoSi.checked)) {
        sueldoBase *= 1.1405;
    } else {
        sueldoBase = sueldoBase;
    }

    antiguedad = parseFloat(document.getElementById("antigüedad").value);
    if (isNaN(antiguedad)) {
        antiguedad = 0;
    } else if (antiguedad == 0) {
        antiguedadTotal = 0;
    } else {
        antiguedadTotal = base * (0.04 + 0.01 * (antiguedad - 1));
    }

    horas50 = parseFloat(document.getElementById("horas-50").value);
    horas100 = parseFloat(document.getElementById("horas-100").value);
    horas200 = parseFloat(document.getElementById("horas-200").value);
    horasNocturnas = parseFloat(document.getElementById("horas-nocturnas").value);

    if (isNaN(horas50)) {
        horas50 = 0;
    }
    if (isNaN(horas100)) {
        horas100 = 0;
    }
    if (isNaN(horas200)) {
        horas200 = 0;
    }
    if (isNaN(horasNocturnas)) {
        horasNocturnas = 0;
    }

    let horas50Total = horas50 * ((base / a) * (1.5) * (1.04 + 0.01 * (antiguedad - 1)));
    let horas100Total = horas100 * ((base / a) * (2) * (1.04 + 0.01 * (antiguedad - 1)));
    let horas200Total = horas200 * ((base / a) * (4) * (1.04 + 0.01 * (antiguedad - 1)));
    let horasNocturnasTotal = horasNocturnas * (base / a) * 0.36 * (1.04 + 0.01 * (antiguedad - 1));

    if (antiguedad == 0) {
        horas50Total = horas50 * (base / a) * (1.5);
        horas100Total = horas100 * (base / a) * (2);
        horas200Total = horas200 * (base / a) * (4);
        horasNocturnasTotal = horasNocturnas * (base / a) * 0.36;
    }

    sueldoBruto = sueldoBase + antiguedadTotal + horas50Total + horas100Total + horas200Total + horasNocturnasTotal;
    let sabadoM = (7 * ((base / a) * (1.5) * (1.04 + 0.01 * (antiguedad - 1)))) + (1.5 * ((base / a) * (4) * (1.04 + 0.01 * (antiguedad - 1))));
    let feriado = 8.5 * (((base / a) * (4) * (1.04 + 0.01 * (antiguedad - 1))));

    if (sueldoBruto <= 1892498.29) {
        sueldoNeto = sueldoBruto * 0.79;
    } else {
        sueldoNeto = sueldoBruto - (1892498 * 0.21);
    }

    document.getElementById("sueldoBrutoResultado").innerText = sueldoBruto.toFixed(2);
    document.getElementById("sueldoNetoResultado").innerText = sueldoNeto.toFixed(2);
    document.getElementById("sabadoM").innerText = sabadoM.toFixed(2);
    document.getElementById("feriado").innerText = feriado.toFixed(2);

    let results = {
        sueldoBruto: sueldoBruto.toFixed(2),
        sueldoNeto: sueldoNeto.toFixed(2),
        sabadoM: sabadoM.toFixed(2),
        feriado: feriado.toFixed(2)
    };

    saveResultsToLocalStorage(results);
    addToHistorial(results);
    saveHistorialToLocalStorage();
}

function saveInputsToLocalStorage(inputs) {
    localStorage.setItem('categoria', inputs.categoria);
    localStorage.setItem('antiguedad', inputs.antiguedad);
    localStorage.setItem('horas50', inputs.horas50);
    localStorage.setItem('horas100', inputs.horas100);
    localStorage.setItem('horas200', inputs.horas200);
    localStorage.setItem('horasNocturnas', inputs.horasNocturnas);
    localStorage.setItem('productividad', inputs.productividad);
    localStorage.setItem('presentismo', inputs.presentismo);
}

function loadInputsFromLocalStorage() {
    if (localStorage.getItem('categoria')) {
        document.getElementById('categoria').value = localStorage.getItem('categoria');
    }
    if (localStorage.getItem('antiguedad')) {
        document.getElementById('antigüedad').value = localStorage.getItem('antiguedad');
    }
    if (localStorage.getItem('horas50')) {
        document.getElementById('horas-50').value = localStorage.getItem('horas50');
    }
    if (localStorage.getItem('horas100')) {
        document.getElementById('horas-100').value = localStorage.getItem('horas100');
    }
    if (localStorage.getItem('horas200')) {
        document.getElementById('horas-200').value = localStorage.getItem('horas200');
    }
    if (localStorage.getItem('horasNocturnas')) {
        document.getElementById('horas-nocturnas').value = localStorage.getItem('horasNocturnas');
    }
    if (localStorage.getItem('productividad') === 'si') {
        document.getElementById('productividadSi').checked = true;
    } else {
        document.getElementById('productividadNo').checked = true;
    }
    if (localStorage.getItem('presentismo') === 'si') {
        document.getElementById('presentismoSi').checked = true;
    } else {
        document.getElementById('presentismoNo').checked = true;
    }
}

function saveResultsToLocalStorage(results) {
    localStorage.setItem('sueldoBruto', results.sueldoBruto);
    localStorage.setItem('sueldoNeto', results.sueldoNeto);
    localStorage.setItem('sabadoM', results.sabadoM);
    localStorage.setItem('feriado', results.feriado);
}

function loadResultsFromLocalStorage() {
    if (localStorage.getItem('sueldoBruto')) {
        document.getElementById('sueldoBrutoResultado').innerText = localStorage.getItem('sueldoBruto');
    }
    if (localStorage.getItem('sueldoNeto')) {
        document.getElementById('sueldoNetoResultado').innerText = localStorage.getItem('sueldoNeto');
    }
    if (localStorage.getItem('sabadoM')) {
        document.getElementById('sabadoM').innerText = localStorage.getItem('sabadoM');
    }
    if (localStorage.getItem('feriado')) {
        document.getElementById('feriado').innerText = localStorage.getItem('feriado');
    }
}

function addToHistorial(results) {
    const historial = document.getElementById('historial');
    const item = document.createElement('li');
    item.textContent = `Sueldo Bruto: ${results.sueldoBruto}, Sueldo Neto: ${results.sueldoNeto}, Sabado M: ${results.sabadoM}, Feriado: ${results.feriado}`;
    historial.appendChild(item);
}

function saveHistorialToLocalStorage() {
    const historial = document.getElementById('historial');
    const historialItems = [];
    for (let i = 0; i < historial.children.length; i++) {
        historialItems.push(historial.children[i].textContent);
    }
    localStorage.setItem('historial', JSON.stringify(historialItems));
}

function loadHistorialFromLocalStorage() {
    const historialItems = JSON.parse(localStorage.getItem('historial'));
    if (historialItems) {
        const historial = document.getElementById('historial');
        historial.innerHTML = '';
        historialItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historial.appendChild(li);
        });
    }
}

function clearHistorial() {
    localStorage.removeItem('historial');
    document.getElementById('historial').innerHTML = '';
}

function habilitarInput() {
    categoria = document.getElementById("categoria");
    datoInput = document.getElementById("sueldoBruto");

    if (categoria.value !== "") {
        datoInput.disabled = true;
    } else {
        datoInput.disabled = false;
    }
}





// Cargar datos del Local Storage al cargar la página
window.onload = function() {
    loadInputsFromLocalStorage();
    loadResultsFromLocalStorage();
    loadHistorialFromLocalStorage();
}

/*

function Comparar() {
    let precioContado = parseFloat(document.getElementById("contado").value);
    let precioCuotas = parseFloat(document.getElementById("financiado").value);
    let cantidadCuotas = parseInt(document.getElementById("cantcuotas").value);
    let tnaPlazoFijo = parseFloat(document.getElementById("TNA").value);
    let comentario = " ";


    // Calcula de la cuota.
    let cuota = precioCuotas / cantidadCuotas;

    // Calculo del interes mensual.
    let tasaMensual = tnaPlazoFijo / 12 / 100;

    let monto = precioCuotas;

    // Ciclo de la cantidad de cuotas
    for (let i = 1; i <= cantidadCuotas; i++) {
        let saldo = monto * ( 1 + tasaMensual) - cuota;
        monto = saldo;
        console.log(monto);
    }

    // Calcu
    precioCuotas -= monto;
    
    if (precioContado < precioCuotas){
        // Te conviene precio Contado.
        comentario = "Te conviene comprar al contado/efectivo.";
        
    } else{
        // Te conviene precio Financiado.
        comentario = "Te conviene comprar en cuotas sin interes.";
    }

    // Muestra los resultados
    let resultadoHTML = "<h2>Comparativa</h2>";
    resultadoHTML += "<p>Costo total Efectivo: $" + precioContado.toFixed(2) + "</p>";
    resultadoHTML += "<p>Costo total Financiado: $" + precioCuotas.toFixed(2) + "</p>";
    resultadoHTML += "<p>" + comentario + "</p>";
    
    document.getElementById("resultado").innerHTML = resultadoHTML;
    
}


function calcularPlazoFijo() {

    // Obtener los valores ingresados por el usuario.
    let capital = parseFloat(document.getElementById("inputMonto").value);
    let tasaInteres = parseFloat(document.getElementById("inputTasaInteres").value);
    let meses = parseInt(document.getElementById("inputMeses").value);
    let interesCompuesto = document.getElementById("inputInteresCompuesto").checked;
    let ganancias;
  
    // Calcular las ganancias.
    if (interesCompuesto) {
      ganancias = capital * Math.pow((tasaInteres / 365 * 30 / 100 + 1), meses) - capital;
    } else {
      ganancias = capital * (tasaInteres / 365) * (meses * 30) / 100;
    }
    let montoTotal = capital + ganancias;
  
    // Mostrar los resultados.
    document.getElementById("ganancias").textContent = " $ " + ganancias.toFixed(2);
    document.getElementById("montoTotal").textContent = " $ " + montoTotal.toFixed(2);
    console.log(ganancias +" "+ montoTotal);
}

*/
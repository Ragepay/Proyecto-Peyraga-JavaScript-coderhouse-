/* Declaracion de variables que van a ser actualizadas. */
//----------------------------------------------------------------------------------
// Aumento de    Mayo  | Julio  
const AUMENTO = 1.2248 * 1;

// Maxima retencion de las cargas sociales.
const maxCargasSociales = 2081258.63;

// calcularsueldo.com const maxCargasSociales = 2265033.81;

// Minimos no Imponibles de Impuesto a las ganancias.
const minimoNoImponible = 257586.25;
const deduccionEspecial = 1236414.00;

// Valores de deduccion de hijo, Conyuge y minino Imponible.
const conyuge = 242594.4;
const hijo = 128702.8;
let minimoImponible = minimoNoImponible + deduccionEspecial;

//  Retencion vales de comedro.
const valesComedorTotal = 22 * 827;
//----------------------------------------------------------------------------------

// Declaracion de array y obtencion de elementos guardados en localStorage.
let recibos = JSON.parse(localStorage.getItem('recibos')) || [];




function calcularSueldo() {

    //  Categorias con su respectivo aumento.
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

    // Declaracion Variables de la funcion
    let categoria = document.getElementById("categoria").value;
    let base;

    let sueldoBase;
    let sueldoBruto = 0.00;
    let sueldoNeto = 0.00;

    let horas50;
    let horas200;
    let horasNocturnas;

    let antiguedad;
    let antiguedadTotal = 0;

    let jubilacion = 0.00;
    let ley = 0.00;
    let obraSocial = 0.00;
    let sindicatoTotal = 0.00;


    //  Categoria y asignación de sueldoBase y base para otros calculos. Default para ingresar sueldo bruto de fuera de convenio.
    //---------------------------------------------------------------------------------------------------------------------------
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
            base = 0

    }
    //----------------------------------------------------------------------------------


    // Productividad y presentismo.
    //----------------------------------------------------------------------------------
    //  Productividad.
    function calcularProductividad() {
        let radioProductividadSi = document.getElementById("productividadSi");
        if (radioProductividadSi.checked) {
            return sueldoBase * 0.15
        }
        return 0
    }
    //  Presentismo.
    function calcularPresentismo() {
        let radioPresentismoSi = document.getElementById("presentismoSi");
        if (radioPresentismoSi.checked) {
            return sueldoBase * 0.15
        }
        return 0
    }
    //----------------------------------------------------------------------------------


    //  Plus Mantenimiento.
    //----------------------------------------------------------------------------------
    function calcularMantenimiento() {
        let radioMantenimientoSi = document.getElementById("mantenimientoSi");
        if (radioMantenimientoSi.checked) {
            return sueldoBase * 0.26

        }
        return 0
    }
    //----------------------------------------------------------------------------------


    //  Sindicato
    //----------------------------------------------------------------------------------
    function chequearSindicato() {
        let sindicatoSi = document.getElementById("sindicatoSi");
        if (sindicatoSi.checked) {
            return true;
        } else {
            return false
        }
    }
    //----------------------------------------------------------------------------------


    // Antiguedad
    //----------------------------------------------------------------------------------
    antiguedad = parseFloat(document.getElementById("antigüedad").value);
    if (isNaN(antiguedad)) {
        antiguedad = 0;
    } else if (antiguedad == 0) {
        antiguedadTotal = 0;
    } else {
        antiguedadTotal = (base) * (0.04 + 0.01 * (antiguedad - 1));

    }
    //----------------------------------------------------------------------------------


    // Horas Extra
    //----------------------------------------------------------------------------------
    horas50 = parseFloat(document.getElementById("horas-50").value);
    horas200 = parseFloat(document.getElementById("horas-200").value);
    horasNocturnas = parseFloat(document.getElementById("horas-nocturnas").value);

    if (isNaN(horas50)) {
        horas50 = 0;
    }
    if (isNaN(horas200)) {
        horas200 = 0;
    }
    if (isNaN(horasNocturnas)) {
        horasNocturnas = 0;
    }


    let horas50Total = horas50 * ((base / a) * (1.5) * (1.04 + 0.01 * (antiguedad - 1)));
    let horas200Total = horas200 * ((base / a) * (4) * (1.04 + 0.01 * (antiguedad - 1)));
    let horasNocturnasTotal = horasNocturnas * (base / a) * 0.36 * (1.04 + 0.01 * (antiguedad - 1));

    // Con antiguedad 0.
    if (antiguedad == 0) {
        horas50Total = horas50 * (base / a) * (1.5);
        horas200Total = horas200 * (base / a) * (4);
        horasNocturnasTotal = horasNocturnas * (base / a) * 0.36;
    }




    sueldoBruto = sueldoBase + antiguedadTotal + horas50Total + horas200Total + horasNocturnasTotal + calcularMantenimiento() + calcularProductividad() + calcularPresentismo();
    let sabadoM = (7 * ((base / a) * (1.5) * (1.04 + 0.01 * (antiguedad - 1)))) + (1.5 * ((base / a) * (4) * (1.04 + 0.01 * (antiguedad - 1))));
    let feriado = 8.5 * (((base / a) * (4) * (1.04 + 0.01 * (antiguedad - 1))));


    //  Sueldo Neto.
    //  Calculo de las "Cargas Sociales/Retenciones".


    if ((sueldoBruto <= maxCargasSociales) && (chequearSindicato() == true)) {
        jubilacion = sueldoBruto * 0.11;
        ley = sueldoBruto * 0.03;
        obraSocial = sueldoBruto * 0.03;
        sindicatoTotal = sueldoBruto * 0.04;
        sueldoNeto = sueldoBruto - jubilacion - ley - obraSocial - sindicatoTotal - valesComedorTotal;
    }

    if ((sueldoBruto <= maxCargasSociales) && (chequearSindicato() == false)) {
        jubilacion = sueldoBruto * 0.11;
        ley = sueldoBruto * 0.03;
        obraSocial = sueldoBruto * 0.03;
        sueldoNeto = sueldoBruto - jubilacion - ley - obraSocial - valesComedorTotal;
    }

    if ((sueldoBruto > maxCargasSociales) && (chequearSindicato() == true)) {
        jubilacion = maxCargasSociales * 0.11;
        ley = maxCargasSociales * 0.03;
        obraSocial = maxCargasSociales * 0.03;
        sindicatoTotal = sueldoBruto * 0.04;
        sueldoNeto = sueldoBruto - jubilacion - ley - obraSocial - sindicatoTotal - valesComedorTotal;

    }

    if ((sueldoBruto > maxCargasSociales) && (chequearSindicato == false)) {
        jubilacion = maxCargasSociales * 0.11;
        ley = maxCargasSociales * 0.03;
        obraSocial = maxCargasSociales * 0.03;
        sueldoNeto = sueldoBruto - jubilacion - ley - obraSocial - valesComedorTotal;
    }

    //  Creacion de los Objetos "reciboSueldo" por propiedad que ingrese, para poder almacenar y mostar por localstorage.


    function ReciboSueldo(id, salarioBase, presentismo, produtivdad, horasNocturnas, horas50, horas200, antiguedad, retencionValesComedor, jubilacion, ley, obraSocial, aporteSindical, sueldoBruto, sueldoNeto, sabadoM, feriado, fechaHorario) {
        this.id = id;
        this.salarioBase = salarioBase;
        this.presentismo = presentismo;
        this.productividad = produtivdad;
        this.horasNocturnas = horasNocturnas;
        this.horas50 = horas50;
        this.horas200 = horas200;
        this.antiguedad = antiguedad;
        this.retencionValesComedor = retencionValesComedor;
        this.jubilacion = jubilacion;
        this.ley = ley;
        this.obraSocial = obraSocial;
        this.aporteSindical = aporteSindical;
        this.sueldoBruto = sueldoBruto;
        this.sueldoNeto = sueldoNeto;
        this.sabadoM = sabadoM;
        this.feriado = feriado;
        this.fechaHorario = fechaHorario;
    }

    //  Creacion del Objeto literal y despues se almacena en el array de objetos.
    let id = Date.now();
    const recibo = new ReciboSueldo(id, sueldoBase, calcularPresentismo(), calcularProductividad(), horasNocturnasTotal, horas50Total, horas200Total, antiguedadTotal, valesComedorTotal, jubilacion, ley, obraSocial, sindicatoTotal, sueldoBruto, sueldoNeto, sabadoM, feriado, new Date().toLocaleString())
    console.log(recibo);
    recibos.push(recibo);

    //  Almacenamos el array de objetos en el localStorage.
    localStorage.setItem("recibos", JSON.stringify(recibos));

    // Mostrar los resultados en el formulario.
    function mostrarResultados() {
        document.getElementById("resultados").innerHTML = `
    <table class="ResultadosCalculo">
        <thead>
            <tr>
                <th colspan="2">Descripción</th>
                <th>Haberes</th>
                <th>Deducciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="2">Salario Base</td>
                <td>${recibo.salarioBase.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Presentismo</td>
                <td>${recibo.presentismo.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Productividad</td>
                <td>${recibo.productividad.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Horas Nocturnas</td>
                <td>${recibo.horasNocturnas.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Horas 50%</td>
                <td>${recibo.horas50.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Horas 200%</td>
                <td>${recibo.horas200.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Antigüedad</td>
                <td>${recibo.antiguedad.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Vales de Comedor</td>
                <td>${recibo.retencionValesComedor.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Jubilación</td>
                <td></td>
                <td>${recibo.jubilacion.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2">Ley 19032</td>
                <td></td>
                <td>${recibo.ley.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2">Obra Social</td>
                <td></td>
                <td>${recibo.obraSocial.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2">Smata</td>
                <td></td>
                <td>${recibo.aporteSindical.toFixed(2)}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td >Sueldo Bruto</td>
                <td colspan="2">${recibo.sueldoBruto.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td >Sueldo Neto</td>
                <td colspan="2">${recibo.sueldoNeto.toFixed(2)}</td>
                <td></td>
            </tr>
        </tfoot>
    </table>`;
    }
    document.getElementById("sabadoM").innerText = sabadoM.toFixed(2);
    document.getElementById("feriado").innerText = feriado.toFixed(2);

    mostrarResultados()
    mostrarHistorialRecibos();

}

// Función para mostrar el historial de recibos
function mostrarHistorialRecibos() {

    let historialHTML = '<h2>Historial de Recibos</h2>';

    if (recibos.length === 0) {
        historialHTML += '<p>No hay recibos calculados.</p>';
    } else {
        historialHTML += '<table class="ResultadosCalculo">';
        recibos.forEach(recibo => {
            historialHTML += `<thead>
                <tr>
                    <th colspan="2">Descripción</th>
                    <th>Haberes</th>
                    <th>Deducciones</th>
                </tr>
                </thead>
            <tbody>
            <tr>
                <td colspan="2">Salario Base</td>
                <td>${recibo.salarioBase.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Presentismo</td>
                <td>${recibo.presentismo.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Productividad</td>
                <td>${recibo.productividad.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Horas Nocturnas</td>
                <td>${recibo.horasNocturnas.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Horas 50%</td>
                <td>${recibo.horas50.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Horas 200%</td>
                <td>${recibo.horas200.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Antigüedad</td>
                <td>${recibo.antiguedad.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Vales de Comedor</td>
                <td>${recibo.retencionValesComedor.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">Jubilación</td>
                <td></td>
                <td>${recibo.jubilacion.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2">Ley 19032</td>
                <td></td>
                <td>${recibo.ley.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2">Obra Social</td>
                <td></td>
                <td>${recibo.obraSocial.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2">SMATA</td>
                <td></td>
                <td>${recibo.aporteSindical.toFixed(2)}</td>
            </tr>
            <tr>
                <td >Sueldo Bruto</td>
                <td colspan="2">${recibo.sueldoBruto.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td >Sueldo Neto</td>
                <td colspan="2">${recibo.sueldoNeto.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="4"><button class="eliminar-recibo" onclick="eliminarRecibo(${recibo.id})" style="text-align: center;"><img src="/img/basurero.png" alt="Eliminar" style="text-align: center;"></button></td>
            </tr>
            </tbody>
            `;
        });
        historialHTML += `
            </tbody>
            </table> 
                    <div>
                        <button class="eliminar-historial" onclick="eliminarHistorial()">Eliminar Historial</button>
                    </div>`;
    }
    document.getElementById('historial-recibos').innerHTML = historialHTML;
}


function eliminarRecibo(id) {
    // Filtrar el array recibos para excluir el recibo con el ID dado.
    recibos = recibos.filter(recibo => recibo.id !== id);
    console.log("Recibos después de eliminar:", recibos);

    // Actualizar el localStorage con el nuevo array de recibos.
    localStorage.setItem('recibos', JSON.stringify(recibos));

    // Volver a mostrar el historial actualizado.
    mostrarHistorialRecibos();
}


function eliminarHistorial() {
    let confirmacionElimianrHisotrial = confirm("¿ Desea eliminar el historial ?");
    if (confirmacionElimianrHisotrial == true) {
        localStorage.removeItem("recibos");
        alert('Historial eliminado correctamente.');
    } else {
        alert("Cancelado.");
    }
    // Volver a mostrar el historial actualizado
    mostrarHistorialRecibos();
    location.reload()
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

// Llamar a mostrarHistorialRecibos al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    mostrarHistorialRecibos();
});
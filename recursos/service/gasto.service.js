var gastoAnual = {
  2020 : 0,
  2019 : 0,
  2018 : 0,
  2017 : 0,
  2016 : 0,
  2015 : 0
};

//Añado los imports 
import { GASTOS_DB } from "../data/gasto.data.js";
import { GastoCombustible } from "../model/GastoCombustible.js";

//Guardo el gasto completo en localStorage y caulculo el total de cada año, se guarda en sessionStorage

function almacenarGastos(){
    for (const gasto of GASTOS_DB) {
        localStorage.setItem(gasto.id, JSON.stringify(gasto));

        const año = gasto.date.getFullYear();
        gastoAnual[año] += gasto.precioViaje;
    }

    for (const año in gastoAnual) {
        sessionStorage.setItem(año, gastoAnual[año].toFixed(2));
    }
}


//actualizo el total correspondiente en sessionStorage
function procesarGasto(jsonNuevoGasto){
    const registro = JSON.parse(jsonNuevoGasto);

    const gasto = new GastoCombustible(
        registro.id,
        registro.vehicleType,
        registro.date,
        registro.kilometers,
        registro.precioViaje
    );

    const año = gasto.date.getFullYear();

    const totalActual = parseFloat(sessionStorage.getItem(año)) || 0;
    const nuevoTotal = totalActual + gasto.precioViaje;

    sessionStorage.setItem(año, nuevoTotal.toFixed(2));
}


export const GastoService = {
    almacenarGastos,
    procesarGasto
};
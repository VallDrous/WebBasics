//Дані які надано у завадані
const workMassCompCoal = [52.49, 3.5, 4.99, 0.97, 2.85, 25.2, 10, 25.92];
const combMassCompFuelOil = [85.5, 11.2, 0.8, 2.5, 40.4, 2, 0.15, 333.3];
const volCompDryMassNatGas = [98.9, 0.12, 0.011, 0.01, 0.06, 0.9, 33.08, 0.723];
const nzu = 0.985;

class Pr2Calculation{
    //Обчислення емісії твердих частинок при спалюванні
    CalcTotalEmisSolidPart(qri,avin,ar,gvin){
        return (10**6/qri)*avin*(ar/(100-gvin))*(1 - nzu);
    }
    //Обчислення валового викиду при спалюванні
    CalcGrossEmission(ktv,qri,b){
        return 10**-6*ktv*qri*b;
    }
}

let calcB = document.getElementById("btn1");
let answer11 = document.getElementById("answer1.1");
let answer12 = document.getElementById("answer1.2");
let answer13 = document.getElementById("answer1.3");
let answer14 = document.getElementById("answer1.4");
let answer15 = document.getElementById("answer1.5");
let answer16 = document.getElementById("answer1.6");

//Запуск функції для обчислення потрібних значень
calcB.addEventListener("click", press);

// Функція обчислання потрібних значень та вивід при натискані на кнопку
function press(){
    clearLabel();
    let task = new Pr2Calculation();
    let cole = Number(document.getElementById("DGcole").value);
    let hightMaz = Number(document.getElementById("HightMaz").value);
    if(cole > 0 && hightMaz > 0){
        const partEmCoal = task.CalcTotalEmisSolidPart(20.47, 0.8,workMassCompCoal[5],1.5).toFixed(2);
        const emisFromCoal = task.CalcGrossEmission(task.CalcTotalEmisSolidPart(20.47, 0.8,workMassCompCoal[5],1.5),20.47,cole).toFixed(2);
        const partEmOil = task.CalcTotalEmisSolidPart(39.48, 1,combMassCompFuelOil[6],0).toFixed(2);
        const emisFromOil = task.CalcGrossEmission(task.CalcTotalEmisSolidPart(39.48, 1,combMassCompFuelOil[6],0),39.48,hightMaz).toFixed(2);
        showAnswers(partEmCoal, emisFromCoal, partEmOil, emisFromOil);
    }
}
//1.5 та 1.6 дорівнюють 0 так як сказано, що тверді частинки природного газу відсутні тобто це означає, що валовий викид твердих частинок та емісія для природного газу дорівнюють 0.
function showAnswers(partEmCoal, emisFromCoal, partEmOil, emisFromOil){
    answer11.innerHTML = "1.1 Показник емісії твердих частинок при спалюванні вугілля становитиме: " + partEmCoal + " г/Гдж";
    answer12.innerHTML = "1.2. Валовий викид при спалюванні вугілля становитиме: "+ emisFromCoal +" т";
    answer13.innerHTML = "1.3. Показник емісії твердих частинок при спалюванні мазуту становитиме: "+ partEmOil +" г/ГДж";
    answer14.innerHTML = "1.4. Валовий викид при спалюванні мазуту становитиме: "+ emisFromOil +" т";
    answer15.innerHTML = "1.5. Показник емісії твердих частинок при спалюванні природного газу становитиме: 0 г/Гдж";
    answer16.innerHTML = "1.6. Валовий викид при спалюванні природного газу становитиме: 0 т";
}
// очистка лейблів
function clearLabel(){                             
    answer11.innerHTML = "";
    answer12.innerHTML = "";
    answer13.innerHTML = "";
    answer14.innerHTML = "";
    answer15.innerHTML = "";
    answer16.innerHTML = "";
}

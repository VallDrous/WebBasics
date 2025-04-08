

class Pr5CalculationFirst{
    //Обчислення частоти відмов одноколової системи
    CalcWoc(pl, t, v, lenght, countJoin){
        return 0.01 + pl[0] * lenght + t[0] + v[0] + 0.03 * countJoin;
    }
    //Обчислення середньої тривалості відновлення
    CalcTvoc(pl, t, v, lenght, countJoin, woc){
        return (0.01*30 + pl[0]*pl[1] * lenght + t[0]*t[1] + v[0]*v[1] + 0.03*2 * countJoin)/woc;
    }
    //Обчислення коефіцієнту аварійного простою одноколової системи
    CalcKaoc(woc,tvoc){
        return woc*tvoc/8760;
    }
    //Обчислення коефіцієнту планового простою одноколової системи
    CalcKpoc(){
        return 1.2 * 43 / 8760;
    }
    //Обчислення відмов одночасно двох кіл двоколової системи
    CalcWdk(woc, kaoc, kpoc){
        return 2 * woc * (kaoc + kpoc);
    }
    //Обчислення частоти відмов двоколової системи з урахуванням секційного вимикача
    CalcWdc(wdk, v){
        return wdk + v[0];
    }
}

class Pr5CalculationSecond{
    //Обчислення математичного сподівання аварійного недовідпущення електроенергії
    CalcMwa(){
        return 0.01*45*0.001*5.12*1000*6451;
    }
    //Обчислення математичного сподівання планового недовідпущення електроенергії
    CalcMwp(){
        return 4*0.001*5.12*1000*6451;
    }
    //Обчислення метематичного сподівання збитків від переривання електропостачання
    CalcMz(mwa , zPerA, mwp, zPerP){
        return zPerA * mwa + zPerP * mwp;
    }
}
let calcB1 = document.getElementById("btn1");
let calcB2 = document.getElementById("btn2");

let answer11 = document.getElementById("answer1.1");
let answer12 = document.getElementById("answer1.2");
let answer13 = document.getElementById("answer1.3");
let answer14 = document.getElementById("answer1.4");
let answer15 = document.getElementById("answer1.5");
let answer16 = document.getElementById("answer1.6");

//Запуск функції для обчислення потрібних значень
calcB1.addEventListener("click", pressFirst);
calcB2.addEventListener("click", pressSecond);
// Функція обчислання потрібних значень та вивід при натискані на кнопку
function pressFirst(){
    clearLabel();
    let task = new Pr5CalculationFirst();
    let v = [];
    let pl = [];
    let t = [];
    let lenght = Number(document.getElementById("length").value);
    let countJoin = Number(document.getElementById("countJoin").value);
    v = v.concat(document.getElementById("dbTurnOff").value.split(";").map(Number));
    pl = pl.concat(document.getElementById("dbPL").value.split(";").map(Number));
    t = t.concat(document.getElementById("dbTransformator").value.split(";").map(Number));

    let woc = task.CalcWoc(pl, t, v, lenght, countJoin);
    let tvoc = task.CalcTvoc(pl, t, v, lenght, countJoin, woc);
    let kaoc = task.CalcKaoc(woc,tvoc);
    let kpoc = task.CalcKpoc();
    let wdk = task.CalcWdk(woc, kaoc, kpoc);
    let wdc = task.CalcWdc(wdk, v);
    
    showAnswersFirst(woc, tvoc, kaoc, kpoc, wdk, wdc);
}

function pressSecond(){
    clearLabel();
    let task = new Pr5CalculationSecond(); 
    let zpera = Number(document.getElementById("zPerA").value);
    let zperp = Number(document.getElementById("zPerP").value);

    let mwa = task.CalcMwa();
    let mwp = task.CalcMwp();
    let mz = task.CalcMz(mwa, zpera, mwp, zperp);

    showAnswersSecond(mwa, mwp, mz);
}
//Вивід результатів
function showAnswersFirst(woc, tvoc, kaoc, kpoc, wdk, wdc) {
    answer11.innerHTML = "woc = " + woc.toFixed(3) + " рік^-1";
    answer12.innerHTML = "tвос = " + tvoc.toFixed(5) + " год";
    answer13.innerHTML = "kaoc = " + kaoc.toFixed(5);
    answer14.innerHTML = "kпос = " + kpoc.toFixed(5);
    answer15.innerHTML = "wдк = " + wdk.toFixed(5) + " рік^-1";
    answer16.innerHTML = "wдс = " + wdc.toFixed(5) + " рік^-1";
}

function showAnswersSecond(mwa, mwp, mz){
    answer11.innerHTML = "M(Wнед.а) = " + mwa.toFixed(2) + " кВт*год";
    answer12.innerHTML = "M(Wнед.п) = " + mwp.toFixed(2) + " кВт*год";
    answer13.innerHTML = "M(Зпер) = " + mz.toFixed(2) + " грн";
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
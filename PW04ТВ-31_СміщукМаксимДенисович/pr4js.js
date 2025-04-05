//const { sqrt } = require("mathjs");
//константи для першого завдання
const highVoltage = 10;
//константи для другого завдання
const shortCircuitTires = 10;
//константи для третього завдання
const ukMax = 11.1;
const rSh = 10.65;
const xSn = 24.02;
const rSMin = 34.88;
const xSMin = 65.68;
const lLine = 12.37; 
const uvn = 115;
const unn = 11;
//Значення економічної густини для алюмінію
const aluminum = [1.6,1.4,1.2];
class Pr4CalculationThirst{
    //Нормальний струм
    NormallCur(sM){
        return (sM/2)/(Math.sqrt(3)*highVoltage);
    }
    //Після аварійний струи
    AfterEmergencyCur(iM){
        return 2*iM;
    }
    //Економічний переріз
    EconomCross(iM, tM){
        return iM/aluminum[this.CheckOnJek(tM)];
    }
    //s>= smin
    SSmin(iK,tF){
        return (iK*1000*Math.sqrt(tF))/92;
    }
    CheckOnJek(tM){
        if(tM > 1000 && tM <= 3000){
            return 0;
        }
        else if(tM > 3000 && tM <=5000){
            return 1;
        }
        else{
            return 2;
        }
    }
}

class Pr4CalculationSecond{
    //Опори елементів ЕПС
    CalculationXc(sK){
        return 10.5**2/sK;
    }
    CalculationXt(){
        return (10.5/100)*(10.5**2/6.3);
    }
    //сумарний опір для точки К1
    CalculationXE(xC, xT){
        return xC + xT;
    }
    //Початкове діюче значення струму трифазного КЗ
    CalcCurIpo(xE){
        return 10.5/(Math.sqrt(3)*xE);
    }
}

class Pr4CalculationThird{
    //Обчислення реактивного опору трансформатора
    CalcXt(){
        return (ukMax*115**2)/(100*6.3);
    }
    //Додавання значень для подальшого обчислення опори на шинах та опори в точці 10 
    // у  нормальному та мінімальному режимах.
    CalcSumValue(vF, vS) {
        return vF + vS;
    }

    //Обчислення повного опору
    CalcZ(r, x) {
        return Math.sqrt(r ** 2 + x ** 2);
    }
    //Обчислення струму трифазного короткого замикання
    CalcI3(u,z) {
        return (u * 1000) / (Math.sqrt(3) * z);
    }
    //Обчислення струму двофазного короткого замикання
    CalcI2(i3) {
        return i3 * Math.sqrt(3) / 2;
    }
    //Коефіцієнт приведення
    CalcKpr() {
        return (11 ** 2) / (115 ** 2);
    }
    //Множення значень для обчислення
    //активного та реактивного опору шини, а також
    //резистанси та реактанси.
    CalcMultValue(vF, vS){
        return vF * vS;
    }

}

let calcB1 = document.getElementById("btn1");
let calcB2 = document.getElementById("btn2");
let calcB3 = document.getElementById("btn3");
let answer11 = document.getElementById("answer1.1");
let answer12 = document.getElementById("answer1.2");
let answer13 = document.getElementById("answer1.3");
let answer14 = document.getElementById("answer1.4");
let answer15 = document.getElementById("answer1.5");
let answer16 = document.getElementById("answer1.6");
let answer17 = document.getElementById("answer1.7");
let answer18 = document.getElementById("answer1.8");
let answer19 = document.getElementById("answer1.9");

let answer20 = document.getElementById("answer2.0");
let answer21 = document.getElementById("answer2.1");
let answer22 = document.getElementById("answer2.2");


//Запуск функції для обчислення потрібних значень
calcB1.addEventListener("click", pressFirst);
calcB2.addEventListener("click", pressSecond);
calcB3.addEventListener("click", pressThird);
// Функція обчислання потрібних значень та вивід при натискані на кнопку
function pressFirst(){
    clearLabel();
    let task = new Pr4CalculationThirst();
    let iK = Number(document.getElementById("Ik").value);
    let tF = Number(document.getElementById("Tf").value);
    let sM = Number(document.getElementById("Sm").value);
    let tM = Number(document.getElementById("Tm").value);
    let im = task.NormallCur(sM,highVoltage);
    let impa = task.AfterEmergencyCur(im);
    let sek = task.EconomCross(im,tM);
    let sSmin = task.SSmin(iK,tF); 
    showAnswersFirst(im, impa, sek, sSmin);
}

function pressSecond(){
    clearLabel();
    let task = new Pr4CalculationSecond();
    let pKz = Number(document.getElementById("PKZ").value);
    let xC = task.CalculationXc(pKz);
    let xT = task.CalculationXt();
    let xE = task.CalculationXE(xC,xT);
    let ip0 = task.CalcCurIpo(xE);
    showAnswersSecond(xC, xT, xE, ip0);
}

function pressThird(){
    clearLabel();
    let task = new Pr4CalculationThird();
    let xT = task.CalcXt();
    let xSh = task.CalcSumValue(xSn, xT);
    let zSh = task.CalcZ(rSh, xSh);
    let xShMin = task.CalcSumValue(xSMin, xT);
    let zShmin = task.CalcZ(rSMin, xShMin);

    let i3sh = task.CalcI3(uvn,zSh); 
    let i2sh = task.CalcI2(i3sh);
    let i3shmin = task.CalcI3(uvn,zShmin);
    let i2shmin = task.CalcI2(i3shmin);

    let kpr = task.CalcKpr();
    let rshn = task.CalcMultValue(rSh, kpr);
    let xshn = task.CalcMultValue(xSh, kpr);
    let zshn = task.CalcZ(rshn, xshn);
    let rshnmin = task.CalcMultValue(rSMin, kpr);
    let xshnmin = task.CalcMultValue(xShMin, kpr);
    let zshnmin = task.CalcZ(rshnmin, xshnmin);

    let i3shn = task.CalcI3(unn,zshn); 
    let i2shn = task.CalcI2(i3shn);
    let i3shnmin = task.CalcI3(unn,zshnmin);
    let i2shnmin = task.CalcI2(i3shnmin);

    let rl = task.CalcMultValue(lLine,0.64);
    let xl = task.CalcMultValue(lLine,0.363);
    let ren = task.CalcSumValue(rl,rshn);
    let xen = task.CalcSumValue(xl,xshn);
    let zen = task.CalcZ(ren,xen);
    let renmin = task.CalcSumValue(rl,rshnmin);
    let xenmin = task.CalcSumValue(xl,xshnmin);
    let zenmin = task.CalcZ(renmin,xenmin);

    let i3ln = task.CalcI3(unn,zen);
    let i2ln = task.CalcI2(i3ln);
    let i3lnmin = task.CalcI3(unn,zenmin);
    let i2lnmin =  task.CalcI2(i3lnmin);
    showAnswersThird(xT, xSh, zSh, xShMin, zShmin,i3sh,i2sh,i3shmin,i2shmin,kpr,rshn,xshn,zshn,rshnmin,xshnmin,zshnmin,i3shn,i2shn,i3shnmin,i2shnmin,rl,xl,ren,xen,zen,renmin,xenmin,zenmin,i3ln,i2ln,i3lnmin,i2lnmin);
}
//Вивід результатів
function showAnswersFirst(im, impa, sek, sSmin){
    answer11.innerHTML = "Ім = " + im.toFixed(2) + " А";
    answer12.innerHTML = "Ім.па = " + impa.toFixed(2) + " А";
    answer13.innerHTML = "sек = " + sek.toFixed(2) + " мм²";
    answer14.innerHTML = "s > smin = " + sSmin.toFixed(2) + " мм²";
}

function showAnswersSecond(xC, xT, xE, ip0){
    answer11.innerHTML = "Хс = " + xC.toFixed(2) + " Ом";
    answer12.innerHTML = "Хт = " + xT.toFixed(2) + " Ом";
    answer13.innerHTML = "Хе = " + xE.toFixed(2) + " Ом";
    answer14.innerHTML = "Іп₀ = " + ip0.toFixed(2) + " кА";
}

function showAnswersThird(xT,xSh,zSh,xShMin,zShmin,i3sh,i2sh,i3shmin,i2shmin,kpr,rshn,xshn,zshn,rshnmin,xshnmin,zshnmin,i3shn,i2shn,i3shnmin,i2shnmin,rl,xl,ren,xen,zen,renmin,xenmin,zenmin,i3ln,i2ln,i3lnmin,i2lnmin){
   answer11.innerHTML = "Xт = " + xT.toFixed(2) + " Ом";
   answer12.innerHTML = "Xш = " + xSh.toFixed(2) + " Ом, Zш = " + zSh.toFixed(2) + " Ом, Xш.min = " + xShMin.toFixed(2) + " Ом, Zш.min = " + zShmin.toFixed(2) + " Ом";
   answer13.innerHTML = "І3ш = " + i3sh.toFixed(2) + " А, І2ш = " + i2sh.toFixed(2) + " А, І3ш.min = " + i3shmin.toFixed(2) + " А, І2ш.min = " + i2shmin.toFixed(2) + " А";
   answer14.innerHTML = "kпр = " + kpr.toFixed(3);
   answer15.innerHTML = "Rшн = " + rshn.toFixed(2) + " Ом, Xшн = " + xshn.toFixed(2) + " Ом, Zшн = " + zshn.toFixed(2) + " Ом";
   answer16.innerHTML = "Rшн.min = " + rshnmin.toFixed(2) + " Ом, Xшн.min = " + xshnmin.toFixed(2) + " Ом, Zшн.min = " + zshnmin.toFixed(2) + " Ом";
   answer17.innerHTML = "І3шн = " + i3shn.toFixed(2) + " А, І2шн = " + i2shn.toFixed(2) + " А, І3шн.min = " + i3shnmin.toFixed(2) + " А, І2шн.min = " + i2shnmin.toFixed(2) + " А";
   answer18.innerHTML = "Іл = " + rl.toFixed(2) + " км, Rл = " + xl.toFixed(2) + " Ом";
   answer19.innerHTML = "RЕн = " + ren.toFixed(2) + " Ом, XЕн = " + xen.toFixed(2) + " Ом, ZЕн = " + zen.toFixed(2) + " Ом";
   answer20.innerHTML = "RЕн.min = " + renmin.toFixed(2) + " Ом, XЕн.min = " + xenmin.toFixed(2) + " Ом, ZЕн.min = " + zenmin.toFixed(2) + " Ом";
   answer21.innerHTML = "І3лн = " + i3ln.toFixed(2) + " А, І2лн = " + i2ln.toFixed(2) + " А, І3лн.min = " + i3lnmin.toFixed(2) + " А, І2лн.min = " + i2lnmin.toFixed(2) + " А";
}
// очистка лейблів
function clearLabel(){                             
    answer11.innerHTML = "";
    answer12.innerHTML = "";
    answer13.innerHTML = "";
    answer14.innerHTML = "";
    answer15.innerHTML = "";
    answer16.innerHTML = "";
    answer17.innerHTML = "";
    answer18.innerHTML = "";
    answer19.innerHTML = "";
    answer20.innerHTML = "";
    answer21.innerHTML = "";
}
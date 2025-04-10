
const kpForKontrolEx = 1.25;


//Значення таблиці які повторюються в кожному значені заголовку стовпця

const coefKorKorisnoiDii = 0.92;

const coefPotuzhnostiCos = 0.9;

const napruhaU = 0.38;
//Словники які зберігають значення дані з таблиці
const kilkistEP = {
    "Шліфувальний верстат (1–4)": 4,
    "Свердлильний верстат (5–6)": 2,
    "Фугувальний верстат (9–12)": 4,
    "Циркулярна пила (13)": 1,
    "Прес (16)": 1,
    "Полірувальний верстат (24)": 1,
    "Фрезерний верстат (26–27)": 2,
    "Вентилятор (36)": 1
};

let potuzhnistP = {
    "Шліфувальний верстат (1–4)": 20,
    "Свердлильний верстат (5–6)": 14,
    "Фугувальний верстат (9–12)": 42,
    "Циркулярна пила (13)": 36,
    "Прес (16)": 20,
    "Полірувальний верстат (24)": 40,
    "Фрезерний верстат (26–27)": 32,
    "Вентилятор (36)": 20
};

let coefVykorystannya = {
    "Шліфувальний верстат (1–4)": 0.15,
    "Свердлильний верстат (5–6)": 0.12,
    "Фугувальний верстат (9–12)": 0.15,
    "Циркулярна пила (13)": 0.3,
    "Прес (16)": 0.5,
    "Полірувальний верстат (24)": 0.2,
    "Фрезерний верстат (26–27)": 0.2,
    "Вентилятор (36)": 0.65
};

let coefReaktivnogoNavantazh = {
    "Шліфувальний верстат (1–4)": 1.33,
    "Свердлильний верстат (5–6)": 1,
    "Фугувальний верстат (9–12)": 1.33,
    "Циркулярна пила (13)": 1.52,
    "Прес (16)": 0.75,
    "Полірувальний верстат (24)": 1,
    "Фрезерний верстат (26–27)": 1,
    "Вентилятор (36)": 0.75
};

const weldingTransformer = {
    "Кількість ЕП, n, шт": 2,
    "Номінальна потужність ЕП Pн, кВт": 100,
    "Коефіцієнт використання Kв": 0.2,
    "Коефіцієнт реактивної потужності tg": 3
};


const dryingCabinet = {
    "Кількість ЕП, n, шт": 2,
    "Номінальна потужність ЕП Pн, кВт": 120,
    "Коефіцієнт використання Kв": 0.8
};

const totalWorkshopLoad = [81, 2330, 752, 657, 96388];

class Pr6Calculation{
    //Обчислення добутку nРн, nРнКВ, nРнКВtg та nР^2н
    CalcMult(firstDict, secondDict, thirdDict, thorthDict){
        let dict = {};
        if(arguments.length === 2){
            for(let key in firstDict){
                dict[key] = firstDict[key] * secondDict[key];
            }
        }
        else if(arguments.length === 3){
            for(let key in firstDict){
                dict[key] = (firstDict[key] * secondDict[key] * thirdDict[key]).toFixed(2);
            }
        }
        else if(arguments.length === 4){
            for(let key in firstDict){
                dict[key] = (firstDict[key] * secondDict[key] * thirdDict[key] * thorthDict[key]).toFixed(3);
            }
        }
        return dict; 
    }
    //Обчислення розрахункового струму ЕП
    CalcEP1(firstDict, secondDict){
        let dict = {};
            for(let key in firstDict){
                dict[key] = (firstDict[key] * secondDict[key]/(Math.sqrt(3)*coefKorKorisnoiDii * coefPotuzhnostiCos * napruhaU)).toFixed(1);
            }
        return dict;
    }
    //Обчислення групового коефіцієнту використання
    CalcGroupCoef(npnkv, npn){
        let firstNum = 0;
        let secondNum = 0;
        for(let key in npnkv){
            firstNum += npnkv[key];
            secondNum += npn[key];
        }
        return firstNum/secondNum;
    }
    //Обчислення ефективної кількісті ЕП
    CalcEfectCountEP(npn, np2n){
        let firstNum = 0;
        let secondNum = 0;
        for(let key in npn){
            firstNum += npn[key];
            secondNum += np2n[key];
        }
        console.log((firstNum**2/secondNum));
        if(firstNum**2/secondNum < (firstNum**2/secondNum).toFixed(0) + 0.5){
            return Number((firstNum**2/secondNum).toFixed(0)) + 1;
        }
        else{
            return Number((firstNum**2/secondNum).toFixed(0));
        }
    }
    //Обчислення розрахункового активного навантаження
    CalcPp(npnkv, kp){
        let firstNum = 0;
        for(let key in npnkv){
            firstNum += npnkv[key];
        }
        return Number((kp*firstNum).toFixed(2)); 
    }
    //Обчислення розрахункове реактивне навантаження
    CalcQp(npnkvtg){
        let firstNum = 0;
        for(let key in npnkvtg){
            firstNum += npnkvtg[key];
        }
        return Number((firstNum).toFixed(3));
    }
    //Обчислення повної потужність
    CalcSp(pp,qp){
        return Number((Math.sqrt(pp**2+qp**2)).toFixed(4));
    }
    //Обчислення розрахункового групового струму ШР:
    CalcIp(pp){
        return Number((pp/napruhaU).toFixed(2));
    }
    //Обчислення коефіцієнту використання цеху в цілому
    CalcGroupCoefGen(n1, n2){
        return Number((n1/n2).toFixed(2));
    }
    //Обчислення ефективної кількісті ЕП цеху в цілому
    CalcEfectCountEPGen(n1, n2){
        return Number((n1**2/n2).toFixed(0))
    }
    //Обчислення розрахункового активного та реактивного навантаження на шинах 0,38 кВ ТП
    CalcPpOrQpGen(n1){
        return Number((0.7*n1).toFixed(2));
    }
}

let calcB = document.getElementById("btn1");
let answer11 = document.getElementById("answer1.1");
let answer12 = document.getElementById("answer1.2");
let answer13 = document.getElementById("answer1.3");
let answer14 = document.getElementById("answer1.4");
let answer15 = document.getElementById("answer1.5");
let answer16 = document.getElementById("answer1.6");
let answer17 = document.getElementById("answer1.7");
let answer18 = document.getElementById("answer1.8");
let answer19 = document.getElementById("answer1.9");
let answer110 = document.getElementById("answer1.10");
let answer111 = document.getElementById("answer1.11");
let answer112 = document.getElementById("answer1.12");
let answer113 = document.getElementById("answer1.13");
let answer114 = document.getElementById("answer1.14");
let answernpn = document.getElementById("answernpn");
let answernpnkv = document.getElementById("answernpnkv");
let answernpnkvtg = document.getElementById("answernpnkvtg");
let answernp2n = document.getElementById("answernp2n");
let answerip = document.getElementById("answerip");
let answerWT = document.getElementById("answerWT");
let answerDC = document.getElementById("answerDC");
//Запуск функції для обчислення потрібних значень
calcB.addEventListener("click", press);

//Функція для переводу значень строкових до чисел
function StringToNum(dict){
    for(let key in dict){
        dict[key] = Number(dict[key]);
    }
    return dict;
}
// Функція обчислання потрібних значень та вивід при натискані на кнопку
function press(){
    clearLabel();
    let task = new Pr6Calculation();
    potuzhnistP["Шліфувальний верстат (1–4)"] = Number(document.getElementById("NomPow").value);
    coefVykorystannya["Полірувальний верстат (24)"] = Number(document.getElementById("KoefUse").value);
    coefReaktivnogoNavantazh["Циркулярна пила (13)"] = Number(document.getElementById("tg").value);
    console.log(coefReaktivnogoNavantazh["Циркулярна пила (13)"]);
    let npn = task.CalcMult(kilkistEP, potuzhnistP);
    npn = StringToNum(npn);
    let npnkv = task.CalcMult(kilkistEP, potuzhnistP, coefVykorystannya);
    npnkv = StringToNum(npnkv);
    let npnkvtg = task.CalcMult(kilkistEP, potuzhnistP, coefVykorystannya, coefReaktivnogoNavantazh);
    npnkvtg = StringToNum(npnkvtg);
    let np2n = task.CalcMult(kilkistEP, potuzhnistP, potuzhnistP);
    np2n = StringToNum(np2n);
    let ep1 = task.CalcEP1(kilkistEP, potuzhnistP);
    ep1 = StringToNum(ep1);


    let groupCoef = task.CalcGroupCoef(npnkv, npn);
    let efectCountEP = task.CalcEfectCountEP(npn, np2n);
    let pp = task.CalcPp(npnkv, kpForKontrolEx);
    let qp = task.CalcQp(npnkvtg);
    let sp = task.CalcSp(pp,qp);
    let ip = task.CalcIp(pp);


    let groupCoefGen = task.CalcGroupCoefGen(totalWorkshopLoad[2], totalWorkshopLoad[1]);
    let efectCountEPGen = task.CalcEfectCountEPGen(totalWorkshopLoad[1], totalWorkshopLoad[4]);
    let ppGen = task.CalcPpOrQpGen(totalWorkshopLoad[2]);
    let qpGen = task.CalcPpOrQpGen(totalWorkshopLoad[3]);
    let spGen = task.CalcSp(ppGen,qpGen);
    let ipGen = task.CalcIp(ppGen);

    let npnWT = weldingTransformer["Кількість ЕП, n, шт"] * weldingTransformer["Номінальна потужність ЕП Pн, кВт"];
    let npnkvWT = weldingTransformer["Кількість ЕП, n, шт"] * weldingTransformer["Номінальна потужність ЕП Pн, кВт"] * weldingTransformer["Коефіцієнт використання Kв"];
    let npnkvtgWT = weldingTransformer["Кількість ЕП, n, шт"] * weldingTransformer["Номінальна потужність ЕП Pн, кВт"] * weldingTransformer["Коефіцієнт використання Kв"] * weldingTransformer["Коефіцієнт реактивної потужності tg"];
    let np2nWT = weldingTransformer["Кількість ЕП, n, шт"] * weldingTransformer["Номінальна потужність ЕП Pн, кВт"]**2;
    let epWT = (weldingTransformer["Кількість ЕП, n, шт"] * weldingTransformer["Номінальна потужність ЕП Pн, кВт"]) / (Math.sqrt(3)*coefKorKorisnoiDii*coefPotuzhnostiCos*napruhaU);

    let npnDC = dryingCabinet["Кількість ЕП, n, шт"] * dryingCabinet["Номінальна потужність ЕП Pн, кВт"];
    let npnkvDC = dryingCabinet["Кількість ЕП, n, шт"] * dryingCabinet["Номінальна потужність ЕП Pн, кВт"] * dryingCabinet["Коефіцієнт використання Kв"];
    let epDC = (dryingCabinet["Кількість ЕП, n, шт"] * dryingCabinet["Номінальна потужність ЕП Pн, кВт"]) / (Math.sqrt(3)*coefKorKorisnoiDii*coefPotuzhnostiCos*napruhaU);
    let np2nDC = dryingCabinet["Кількість ЕП, n, шт"] * dryingCabinet["Номінальна потужність ЕП Pн, кВт"]**2;

    showAnswers(npn, npnkv, npnkvtg, np2n, ep1, groupCoef, efectCountEP, pp, qp, sp, ip, groupCoefGen, efectCountEPGen, ppGen, qpGen, spGen, ipGen, npnWT, npnkvWT, npnkvtgWT, np2nWT, epWT, npnDC, npnkvDC, np2nDC, epDC);
}
//Вивід результатів
function showAnswers(npn, npnkv, npnkvtg, np2n, ep1, groupCoef, efectCountEP, pp, qp, sp, ip, groupCoefGen, efectCountEPGen, ppGen, qpGen, spGen, ipGen, npnWT, npnkvWT, npnkvtgWT, np2nWT, epWT, npnDC, npnkvDC, np2nDC, epDC){
    answer11.innerHTML = "Груповий коефіцієнт використання для ШР1=ШР2=ШР3: " + groupCoef.toFixed(4);
    answer12.innerHTML = "Ефективна кількість ЕП для ШР1=ШР2=ШР3: " + efectCountEP;
    answer13.innerHTML = "Розрахунковий коефіцієнт активної потужності для ШР1=ШР2=ШР3: " + kpForKontrolEx;
    answer14.innerHTML = "Розрахункове активне навантаження для ШР1=ШР2=ШР3: " + pp + " кВт";
    answer15.innerHTML = "Розрахункове реактивне навантаження для ШР1=ШР2=ШР3: " + qp + " квар";
    answer16.innerHTML = "Повна потужність для ШР1=ШР2=ШР3: " + sp + " кВ*А";
    answer17.innerHTML = "Розрахунковий груповий струм для ШР1=ШР2=ШР3: " + ip + " А";
    answer18.innerHTML = "Коефіцієнти використання цеху в цілому: " + groupCoefGen;
    answer19.innerHTML = "Ефективна кількість ЕП цеху в цілому: " + efectCountEPGen;
    answer110.innerHTML = "Розрахунковий коефіцієнт активної потужності цеху в цілому: 0.7";
    answer111.innerHTML = "Розрахункове активне навантаження на шинах 0,38 кВ ТП: " + ppGen + " кВт";
    answer112.innerHTML = "Розрахункове реактивне навантаження на шинах 0,38 кВ ТП: " + qpGen + " квар";
    answer113.innerHTML = "Повна потужність на шинах 0,38 кВ ТП: " + spGen + " кВ*А";
    answer114.innerHTML = "Розрахунковий груповий струм на шинах 0,38 кВ ТП: " + ipGen + " А";

    answernpn.innerHTML = getTextFromDict(npn);
    answernpnkv.innerHTML = getTextFromDict(npnkv);
    answernpnkvtg.innerHTML = getTextFromDict(npnkvtg);
    answernp2n.innerHTML = getTextFromDict(np2n);
    answerip.innerHTML = getTextFromDict(ep1);

    answerWT.innerHTML = "npnWT = " + npnWT.toFixed(0) + ", npnkvWT = " + npnkvWT.toFixed(0) + ", npnkvtgWT = " + npnkvtgWT.toFixed(0) + ", np2nWT = " + np2nWT.toFixed(0) + ", epWT = " + epWT.toFixed(1);

    answerDC.innerHTML = "npnDC = " + npnDC.toFixed(0) + ", npnkvDC = " + npnkvDC.toFixed(0) + ", np2nWT = " + np2nDC.toFixed(0) + ", epDC = " + epDC.toFixed(1);
}
//Фукнція для перетворення словника у рядок
function getTextFromDict(dict){
    return Object.entries(dict).map(([key, value]) => `${key}: ${value}`).join(", ");
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
    answer110.innerHTML = "";
    answer111.innerHTML = "";
    answer112.innerHTML = "";
    answer113.innerHTML = "";
    answer114.innerHTML = "";

    answernpn.innerHTML = "";
    answernpnkv.innerHTML = "";
    answernpnkvtg.innerHTML = "";
    answernp2n.innerHTML = "";
    answerip.innerHTML = "";

    answerWT.innerHTML = "";
    answerDC.innerHTML = "";
}
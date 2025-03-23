//Похибка прогнозу
const deltaPPercent = 0.05;

class Pr3Calculation{
    //Припустима похибка у МВт
    deltaP(pC){
        return deltaPPercent * pC;
    }
    //Функція Лапласа через помилкову функцію
    normalCdf(z) {
        return (1.0 + this.erf(z / Math.sqrt(2))) / 2.0;
    }
    //Помилкова функція
    erf(x) {
        const t = 1 / (1 + 0.5 * Math.abs(x));
        const tau = t * Math.exp(-x * x - 1.26551223 +
            t * (1.00002368 + t * (0.37409196 + t * (0.09678418 +
            t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 +
            t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    
        return x >= 0 ? 1 - tau : tau - 1;
    }
    //обчислення частки енергії
    IntegralLaplasDeltaW(pC,sigma){
        return this.normalCdf(this.deltaP(pC)/sigma) - this.normalCdf(-this.deltaP(pC)/sigma);
    }
    //Обчислення W
    CalculateW(pC, deltaW){
        return pC * 24 * deltaW;
    }
    //Обчислення заробітку та штрафів
    CalculateProfil(w, b){
        return w*b;
    }
}

let calcB = document.getElementById("btn1");
let answer11 = document.getElementById("answer1.1");
let answer12 = document.getElementById("answer1.2");
let answer13 = document.getElementById("answer1.3");
let answer14 = document.getElementById("answer1.4");
let answer15 = document.getElementById("answer1.5");
let answer16 = document.getElementById("answer1.6");

let answer21 = document.getElementById("answer2.1");
let answer22 = document.getElementById("answer2.2");
let answer23 = document.getElementById("answer2.3");
let answer24 = document.getElementById("answer2.4");
let answer25 = document.getElementById("answer2.5");
let answer26 = document.getElementById("answer2.6");


//Запуск функції для обчислення потрібних значень
calcB.addEventListener("click", press);

// Функція обчислання потрібних значень та вивід при натискані на кнопку
function press(){
    clearLabel();
    let task = new Pr3Calculation();
    let pC = Number(document.getElementById("Pc").value);
    let sigma1 = Number(document.getElementById("SigmaOne").value);
    let sigma2 = Number(document.getElementById("SigmaTwo").value);
    let electCost = Number(document.getElementById("ElectricityCost").value);
    if(sigma1 != 0 && sigma2 != 0 && sigma1 >= sigma2){
        let deltaW1 = task.IntegralLaplasDeltaW(pC,sigma1).toFixed(2);
        let w1 = task.CalculateW(pC, deltaW1).toFixed(2);
        let p1 = task.CalculateProfil(w1, electCost).toFixed(2);
        let w2 = task.CalculateW(pC, 1 - deltaW1).toFixed(2);
        let f1 = task.CalculateProfil(w2, electCost).toFixed(2);

        let deltaW2 = task.IntegralLaplasDeltaW(pC,sigma2).toFixed(2);
        let w3 = task.CalculateW(pC, deltaW2).toFixed(2);
        let p2 = task.CalculateProfil(w3, electCost).toFixed(2);
        let w4 = task.CalculateW(pC, 1 - deltaW2).toFixed(2);
        let f2 = task.CalculateProfil(w4, electCost).toFixed(2);
        showAnswers(deltaW1, w1, p1, w2, f1, deltaW2, w3, p2, w4, f2, sigma1, sigma2);
    }
    
}
//Вивід результатів
function showAnswers(deltaW1, w1, p1, w2, f1, deltaW2, w3, p2, w4, f2, sigma1, sigma2){
    answer11.innerHTML = "1.1 частка енергії: " + deltaW1*100 + "% ";
    answer12.innerHTML = "1.2. Отже за "+ deltaW1*100 +"% електроенергії: W1 = "+ w1 +" МВт*год";
    answer13.innerHTML = "1.3. Сонячна електростанція отримає прибуток : П1 = "+ p1 +" тис. грн";
    answer14.innerHTML = "1.4. Отже за "+ ((1-deltaW1)*100).toFixed(0) +"% електроенергії: W2 = "+ w2 +" МВт*год";
    answer15.innerHTML = "1.5. Виплачує штраф: Ш1 = " + f1 + "тис. грн";
    answer16.innerHTML = "1.6. Загальний прибуток: П = " + (p1 - f1).toFixed(2) + "тис. грн при середньому квадратичному відхиленні " + sigma1 + "МВт";


    answer21.innerHTML = "2.1 частка енергії: " + deltaW2*100 + "% ";
    answer22.innerHTML = "2.2. Отже за "+ deltaW2*100 +"% електроенергії: W3 = "+ w3 +" МВт*год";
    answer23.innerHTML = "2.3. Сонячна електростанція отримає прибуток : П2 = "+ p2 +" тис. грн";
    answer24.innerHTML = "2.4. Отже за "+ ((1-deltaW2)*100).toFixed(0) +"% електроенергії: W4 = "+ w4 +" МВт*год";
    answer25.innerHTML = "2.5. Виплачує штраф: Ш2 = " + f2  + "тис. грн";
    answer26.innerHTML = "2.6. Загальний прибуток: П = " + (p2 - f2).toFixed(2) + "тис. грн при зменшеному середньому квадратичному відхиленні " + sigma2 + "МВт";
}
// очистка лейблів
function clearLabel(){                             
    answer11.innerHTML = "";
    answer12.innerHTML = "";
    answer13.innerHTML = "";
    answer14.innerHTML = "";
    answer15.innerHTML = "";
    answer16.innerHTML = "";

    answer21.innerHTML = "";
    answer22.innerHTML = "";
    answer23.innerHTML = "";
    answer24.innerHTML = "";
    answer25.innerHTML = "";
    answer26.innerHTML = "";
}
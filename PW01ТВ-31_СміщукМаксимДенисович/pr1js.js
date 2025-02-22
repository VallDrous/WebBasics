class Pr1calculation{
        constructor(){
                this.hp = Number(document.getElementById("inputHp").value);
                this.cp = Number(document.getElementById("inputC").value);
                this.sp = Number(document.getElementById("inputSp").value);
                this.np = Number(document.getElementById("inputNp").value);
                this.op = Number(document.getElementById("inputOp").value);
                this.wp = Number(document.getElementById("inputW").value);
                this.ap = Number(document.getElementById("inputAp").value);
        }
        //метод який повертає елементарний склад для перевірки
        calcElementaryСomp(){
                return this.hp + this.cp + this.sp + this.np + this.op + this.wp + this.ap;
        }
        //Обчислення коефіцієнту переходу від робочої до сухої маси
        calcKpc(){
                return 100/(100-this.wp);
        }
        //Обчислення коефіцієнту переходу від робочої до горючої маси
        calcKpg(){
                return 100/(100-this.wp-this.ap);
        }
        //Обчисення складу сухої маси палива
        calcXc(){
                let kpc = this.calcKpc(); 
                let hc = this.hp * kpc;
                let cc = this.cp * kpc;
                let sc = this.sp * kpc;
                let nc = this.np * kpc;
                let oc = this.op * kpc;
                let ac = this.ap * kpc;
                return [kpc,hc,cc,sc,nc,oc,ac];
        }
        //Обчисення складу горючої маси палива
        calcXg(){
                let kpg = this.calcKpg(); 
                let hg = this.hp * kpg;
                let cg = this.cp * kpg;
                let sg = this.sp * kpg;
                let ng = this.np * kpg;
                let og = this.op * kpg;
                return [kpg,hg,cg,sg,ng,og]
        }
        //Обчисення нижчої теплоти згоряння для робочої маси за заданим складом компонентів палива
        calcQph(){
                return (339*this.cp + 1030*this.hp - 108.8*(this.op-this.sp) - 25*this.wp)/1000;
        }
        //Обчисення нижчої теплоти згоряння для сухої маси за заданим складом компонентів палива
        calcQch(){
                return (this.calcQph() + 0.025 * this.wp)*this.calcKpc();
        }
        //Обчисення нижчої теплоти згоряння для горючої маси за заданим складом компонентів палива
        calcQgh(){
                return (this.calcQph() + 0.025 * this.wp)*this.calcKpg();
        }
        //Отримання початкових даних
        getInitialValues(){
                return [this.hp, this.cp, this.sp, this.np, this.op, this.wp, this.ap];
        }
        
}
//загальнодоступні змінні елементів
let button = document.getElementById("btn1");
let answer1 = document.getElementById("answer1");
let answer11 = document.getElementById("answer1.1");
let answer12 = document.getElementById("answer1.2");
let answer13 = document.getElementById("answer1.3");
let answer14 = document.getElementById("answer1.4");
let answer15 = document.getElementById("answer1.5");
let answer16 = document.getElementById("answer1.6");
let answer17 = document.getElementById("answer1.7");
//подія для  запуску функції при натискані на кнопку
button.addEventListener("click", function () {
        //очистка лейблів
        clearLabel();
        let calcPr1 = new Pr1calculation();
        //перевірка на те чи сума введених елементів дорівнює 100
        if(calcPr1.calcElementaryСomp() == 100){
                writeToLabel(calcPr1.getInitialValues(),  calcPr1.calcXc(), calcPr1.calcXg(), calcPr1.calcQph(), calcPr1.calcQch(), calcPr1.calcQgh());
        }
        else{
                answer1.innerHTML = "Елементарий склад не дорівнює 100%";
        }
    });
//Виведення результатів
function writeToLabel(infInitial, infC, infG, qph, qch, qgh){
        answer1.innerHTML = "1. Для палива з компонентним складом: Hp=" 
        + infInitial[0].toFixed(2) + "%, Cp=" + infInitial[1].toFixed(2) + "%, Sp=" + infInitial[2].toFixed(2) + "%, Np=" + 
        infInitial[3].toFixed(2) + "%, Op=" + infInitial[4].toFixed(2) + "%, WPp=" + infInitial[5].toFixed(2) + "%, Ap=" + infInitial[6].toFixed(2) + "%";
        answer11.innerHTML = "Коефіцієнт переходу від робочої до сухої маси становить: " + infC[0].toFixed(2);
        answer12.innerHTML = "Коефіцієнт переходу від робочої до горючої маси становить: " + infG[0].toFixed(2);
        answer13.innerHTML =  "Склад сухої маси палива становитиме: Hc=" 
        + infC[1].toFixed(2) + "%, Cc=" + infC[2].toFixed(2) + "%, Sc=" + infC[3].toFixed(2) + "%, Nc=" + 
        infC[4].toFixed(2) + "%, Oc=" + infC[5].toFixed(2) + "%, Ac=" + infC[6].toFixed(2) + "%"; 
        answer14.innerHTML = "Склад горючої маси палива становитиме: Hg=" 
        + infG[1].toFixed(2) + "%, Cg=" + infG[2].toFixed(2) + "%, Sg=" + infG[3].toFixed(2) + "%, Ng=" + 
        infG[4].toFixed(2) + "%, Og=" + infG[5].toFixed(2) +"%";
        answer15.innerHTML = "Нижча теплота згоряння для робочої маси за заданим складом компонентів палива становить: " + qph.toFixed(4) + "МДж/кг";
        answer16.innerHTML = "Нижча теплота згоряння для сухої маси за заданим складом компонентів палива становить: " + qch.toFixed(2) + "МДж/кг";
        answer17.innerHTML = "Нижча теплота згоряння для горючої маси за заданим складом компонентів палива становить: " + qgh.toFixed(2) + " МДж/кг.";
}
//очистка лейблів
function clearLabel(){
        answer1.innerHTML = "";                              
        answer11.innerHTML = "";
        answer12.innerHTML = "";
        answer13.innerHTML = "";
        answer14.innerHTML = "";
        answer15.innerHTML = "";
        answer16.innerHTML = "";
        answer17.innerHTML = "";
}
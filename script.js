let inputs = document.querySelectorAll('input[name="inputValue"]');
let buttons = document.querySelectorAll('.tip-btns button');

class TipCalculator{

    constructor(inputs,buttons){
        this.inputs = inputs;
        this.buttons = buttons;
        this.buttonTip = 0.001;
        this.customInput = document.querySelector('input[name="customInput"]');
        this.customInputPrice = 0.001;
        this.billInput = inputs[0];
        this.billInputNumber = 1;
        this.peopleInput = inputs[1];
        this.peopleInputNumber = 1;
        this.tipPerPerson = document.querySelector('span[name="tipPerson"]')
        this.totalPerPerson = document.querySelector('span[name="tipTotal"]')
        this.resetBtn =  document.getElementById('resetBtn');

        this.generateErrors();
        this.useTip();
        this.resetValues();
    }

    generateErrors(){
        this.inputs.forEach(input => {
            input.addEventListener("input", () => {
                let mainDiv = input.parentElement.parentElement;
                let errorsObject = mainDiv.querySelector('ul');
                if(input.value.length < 1){
                    this.resetBtn.classList.add('disabled')
                    this.resetBtn.disabled = true;

                    let li = document.createElement('li');
                    li.innerText = "Can't be empty!"

                    input.style.outline = '2px solid rgb(246, 85, 85)'

                    errorsObject.appendChild(li);
                } else{
                    this.resetBtn.disabled = false;
                    this.resetBtn.classList.remove('disabled')
                    input.style.outline = ''
                    let errorItem = errorsObject.querySelector('li');
                    if(errorItem){
                        errorItem.remove();
                    }
                }
            })
        })
    }

    useTip(){
        this.billInput.addEventListener("input", () => {
            this.billInputNumber = parseFloat(this.billInput.value);

            this.calculateTip(this.billInputNumber,this.peopleInputNumber,this.buttonTip)
        })

        this.peopleInput.addEventListener("input", () => {
            this.peopleInputNumber = parseFloat(this.peopleInput.value);

            this.calculateTip(this.billInputNumber,this.peopleInputNumber,this.buttonTip)
        })

        buttons.forEach( button => {
            button.addEventListener("click", () => {
                this.buttonTip = parseFloat(button.value);

                this.calculateTip(this.billInputNumber,this.peopleInputNumber,this.buttonTip)
            })
        })

        this.customInput.addEventListener("blur", () => {
            this.customInputPrice = parseFloat(this.customInput.value);

            this.calculateTip(this.billInputNumber,this.peopleInputNumber,this.customInputPrice)
        })
    }

    calculateTip(billPrice, peopleNumber, tipPercentage){
        let tip = billPrice * ( tipPercentage / 100);

        let totalPricePerPerson =  (billPrice + tip) / peopleNumber;
        let tipPerson = tip / peopleNumber;

        this.tipPerPerson.innerText = `${tipPerson.toFixed(2)}`;
        this.totalPerPerson.innerText = `${totalPricePerPerson.toFixed(2)}`;
    }

    resetValues(){
        this.resetBtn.addEventListener('click', () => {
            this.billInput.value = '';
            this.peopleInput.value = '';
            this.customInput.value = '';
            this.tipPerPerson.innerText = '0.00';
            this.totalPerPerson.innerText = '0.00';
        })
    }

}

const tipCalculator = new TipCalculator(inputs,buttons)

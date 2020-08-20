//Insurance constructor
function Insurance(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type;
}
Insurance.prototype.valueInsurance = function (information){
    /*
        1 = americano 1.15
        2 = asiatico = 1.05
        3 = europeo = 1.35
    */
    let amount;
    const base = 2000; //base value

    switch(this.brand){
        case '1':
            amount = base * 1.15;
            break;
        case '2':
            amount = base * 1.05;
            break;
        case '3':
            amount = base * 1.35;
            break; 
    }

    //read year
    const offset = new Date().getFullYear() - this.year;
    //Each year of difference we have to reduce 3% the insurance's value
    amount -= ((offset * 3) * amount) /100;
    /* 
        If the insurace is basic it multiplies for 30% more
        If its complete, it multiplies for 50% more
    */
    if(this.type === 'basico'){
        amount *= 1.30;
    }else {
        amount *= 1.50;
    }

    return amount;
}

//everything that is showed. 
function Interface() {}
// msg shown in HTML
Interface.prototype.showMessage = function(message, type){
    const div = document.createElement('div');

    if(type === 'error'){ //error class is defined in custom.css 
        div.classList.add('mensaje', 'error');
    }else {
        div.classList.add('mensaje', 'correcto');
    }
    div.innerHTML = `${message}`;
    form.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(()=> document.querySelector('.mensaje').remove(), 1500);
}

Interface.prototype.showResult = function (insurance, totalAmount){
    const result = document.getElementById('resultado');
    let brand;
    switch(insurance.brand){
        case '1':
            brand = "Americano";
            break;
        case '2':
            brand = "Asiatico";
            break;
        case '3':
            brand = "Europeo";
            break;
    }
    //create div
    const div = document.createElement('div');
    //add info 
    div.innerHTML = ` 
        <p class='header'>Tu resumen:</p>
        <p>Marca: ${brand}</p>
        <p>Año: ${insurance.year}</p>
        <p>Tipo: ${insurance.type}</p>
        <p>Total: $ ${totalAmount}</p>
    `;

    const spinner = document.querySelector("#cargando img");
    spinner.style.display = 'block';

    setTimeout(function(){
        spinner.style.display = 'none';
        result.appendChild(div);
    }, 1500);
}


//Event Listener
const form = document.getElementById('cotizar-seguro');

form.addEventListener('submit', function (e){
    e.preventDefault();

    //read the selected brand from <select>
    const brand = document.getElementById('marca');
    const selectedBrand = brand.options[brand.selectedIndex].value;


    //read the selected year from the <select>
    const year = document.getElementById('anio');
    const selectedYear = year.options[year.selectedIndex].value;

    //read value of the radio selector
    const type = document.querySelector('input[name="tipo"]:checked').value;

    //Create an interface instance
    const interface = new Interface();
    
    //Check that fields are not in blank
    if(selectedBrand === "" || selectedYear === "" || type === ""){
        interface.showMessage("Faltan datos, revisar el formulario y probar de nuevo", "error");

    }else{
        //clean previous results
        const results = document.querySelector('#resultado div');
        if(results != null){
            results.remove();
        }

        //instantiate insurance and show interface
        const insurance = new Insurance(selectedBrand, selectedYear, type);
        //value insurance
        const amount = insurance.valueInsurance(insurance);

        //show result
        interface.showResult(insurance, amount);
        interface.showMessage('Cotizando...', 'correcto');
    }

})


const max = new Date().getFullYear(),
      min = max - 20;


const selectYears = document.getElementById('anio');

for(let i = max; i >= min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectYears.appendChild(option);
}
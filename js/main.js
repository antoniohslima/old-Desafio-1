const data = {
    "insurances": [{
        "id": 3322,
        "name": "Amil"
    }, {
        "id": 3293,
        "name": "Bradesco"
    }, {
        "id": 99231,
        "name": "Hapvida"
    }, {
        "id": 1322,
        "name": "CASSI"
    }, {
        "id": 23111,
        "name": "Sulamérica"
    }],
    "guides": [{
        "number": "3210998321",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 9321123,
            "name": "Augusto Ferreira",
            "thumb_url": "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    }, {
        "number": "287312832",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro",
            "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2021-04-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José",
            "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2021-04-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos",
            "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2021-04-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposo"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2021-04-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grante pra colocar text ellipsis testando nome com paciente grande"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 221
    }]
}

function selectorInsurance() {
    const selector = document.querySelector('.form-select');

    let selectorItem = '<option class="selector-item" id="insurance-default" value="">Todos</option>'

    data.insurances.forEach(element => {
        selectorItem += `<option class="selector-item" id="${element.id}" value="${element.id}">${element.name}</option>`
    });

    selector.innerHTML = selectorItem;

}

const table = document.querySelector('.information-table');

function addToTable(array) {

    let readableDate;

    let readablePrice;

    let tableItens = ''
    array.forEach(element => {
        let isDeleted = ''

        if (element.health_insurance.is_deleted) isDeleted = 'class="deleted-Insurance" title="Convênio Apagado"'

        readablePrice = element.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        readableDate = new Date(element.start_date)

        tableItens += `
        <tr>
            <td>${readableDate.toLocaleDateString('pt-br')}</td>
            <td>${element.number}</td>
            <td class="patient-name"> <img src="${element.patient.thumb_url || 'https://i.pinimg.com/474x/8f/1b/09/8f1b09269d8df868039a5f9db169a772.jpg'}" class="profile-pic"/> ${element.patient.name}</td>
            <td ${isDeleted}> ${element.health_insurance.name}</td>
            <td>${readablePrice}</td>
        </tr>`

    });

    table.innerHTML = tableItens;
}

function renderTableWFilters() {
    const insuranceSelected = ~~document.getElementById('selected').value;

    const personFinder = document.getElementById('person-Finder').value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    
    if (!personFinder && !insuranceSelected) {
        return init()
    }
    
    const filteredTable = data.guides.filter(element => {
        
        const formatedPatient = element.patient.name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let isValid = true

        if (personFinder && !element.number.includes(personFinder) && !formatedPatient.includes(personFinder)) {
            isValid = false;
        } 

        if (insuranceSelected && element.health_insurance.id !== insuranceSelected) {
            isValid = false;
        }

        return isValid

    });

    if (filteredTable.length === 0) {
        return table.innerHTML = `<tr class="error-text"><td colspan="5" > Nenhuma guia encontrada
        </td></tr>`
    }

    addToTable(filteredTable);
}

const init = () => {
    selectorInsurance();
    addToTable(data.guides);
}
init()
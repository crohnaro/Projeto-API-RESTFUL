const API_URL = 'http://localhost:8080/api/products'

const productsList = document.querySelector ('#products-list');
const form = document.querySelector ('#form');

function obterLista() {
    fetch(API_URL).then(response =>{
        response.json().then(data =>{
            const productsHTML = data.map(product => `
            <li>
                ${product.name} - ${product.brand} - ${product.price}
            </li>    
            `).join('')
            
            productsList.innerHTML = productsHTML;
        })
    })
}

obterLista()

//Cadastrar produto
form.onsubmit = function(e) {
    e.preventDefault ();

    const name = document.forms['form'].name.value
    const brand = document.forms['form'].brand.value
    const price = document.forms['form'].price.value

    fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            brand,
            price,
        })
    }).then(response => {
        response.json().then(data => {
            console.log(data)
            if (data.message === 'success') {
                form.reset()
                obterLista()
                alert('Cadastro realizado com sucesso')
            } else {
                alert('Ocorreu um erro')
            }
        })
    })
}
const API_URL = 'http://localhost:8080/api/products'

const productsList = document.querySelector ('#products-list');
const form = document.querySelector ('#form');

function obterLista() {
    fetch(API_URL).then(response =>{
        response.json().then(data =>{
            const productsHTML = data.map(product => `
            <li>
                ${product.name} - ${product.brand} - ${product.price}
                <a href="#" class="botao-excluir" data-id="${product._id}">[excluir]</a> 
            </li>    
            `).join('')
            
            productsList.innerHTML = productsHTML;
            
            const botoesExcluir = document.querySelectorAll('.botao-excluir')
            botoesExcluir.forEach (botao => {
                botao.onclick = function(e){
                    e.preventDefault()

                    const id = this.dataset.id
                    
                    fetch(`${API_URL}/${id}`, {
                        method: 'DELETE',
                    }).then(response => {
                        response.json().then(data => {
                            if (data.message === 'success') {
                                obterLista()
                                alert ('Produto excluido')
                            } else {
                                alert ('Ocorreu um erro')
                            }
                        })
                    })
                }
            })
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
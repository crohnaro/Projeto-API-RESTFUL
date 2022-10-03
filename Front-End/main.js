const productsList = document.querySelector ('#products-list');

fetch('http://localhost:8080/api/products').then(response =>{
    response.json().then(data =>{
        const productsHTML = data.map(product => `
        <li>
            ${product.name} - ${product.brand} - ${product.price}
        </li>    
        `).join('')
        
        productsList.innerHTML = productsHTML;
    })
})
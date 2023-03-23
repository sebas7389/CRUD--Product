let Products = [
    {
        name: 'PS5',
        description: 'La consola más potente de Sony al día de la fecha',
        price: 290000,
        stock: true,
        image: 'https://as.com/meristation/imagenes/2020/11/06/reportajes/1604654372_894608_1604656126_noticia_normal.jpg',
        games: ['God of War Origin']
    },
    {
        name: 'PS4',
        description: 'La consola anterior de Sony',
        price: 140000,
        stock: true,
        image: 'https://live.mrf.io/statics/i/ps/www.muycomputer.com/wp-content/uploads/2019/07/PS4-PS5.jpg'
    },
    {
        name: 'PS3',
        description: 'La consola anterior de Sony',
        price: 70000,
        stock: false,
        image: 'https://live.mrf.io/statics/i/ps/www.muycomputer.com/wp-content/uploads/2019/07/PS4-PS5.jpg',
        jostick: true,
        games: ['Uncharted 3']
    },

    {
        name: 'PS2',
        description: 'La consola anterior de Sony',
        price: 30000,
        stock: false,
    },
    {
        name: 'XBOX Series X',
        description: 'La consola más potente de Microsoft al día de la fecha',
        price: 279000,
        stock: true,
        image: 'https://www.atajo.com.ar/images/0000000RRT-0000234357RRT-00002-Consola-Xbox-Series-X-01.jpg',
        games: ['Halo Infinite'],
        jostick: true,

    },
    {
        name: 'XBOX One',
        description: 'La consola anterior de Microsoft',
        price: 115000,
        stock: false,
        image: 'https://i.blogs.es/a7dc9c/fc7174d71089999f6a7e15c1d16/1366_2000.png'
    },
    {
        name: 'XBOX 360',
        description: 'La consola de Microsoft que compite con la PS3',
        price: 60000,
        stock: true,
        image: 'https://http2.mlstatic.com/D_NQ_NP_686099-MLA32731207921_112019-O.webp',
    },
];



const ProductForm = document.getElementById('add-product');

ProductForm.addEventListener('click',() => {
    console.dir(ProductForm.dataset)
})

const tableBody = document.querySelector('#table-body');
var editButtons;


// Libreria sweetALert
// swal ({
//     title:'Bievenido a sweetAlert',
//     text: 'Este modal o dialogo es provisto por la libreria sweetAlert',
//     icon:'info',
//     timer:3000 });

//1- Obtener el body de la tabla para poder modificarlo desde JS


//2- Definir una función para iterar el array
function renderizarTabla() {
    tableBody.innerHTML = '';
    //3- Iterar el array para acceder a cada producto
    Products.forEach((producto, index) => {
        // let imageSrc = '/assets/images/no-product.png';

        // if(producto.image) {
        //     imageSrc = producto.image;
        // }

        let imageSrc = producto.image ? producto.image : '/assets/images/no-product.png';
        //4- Introducir dentro del tbody una fila por producto con sus respectivas celdas
        const tableRow = `<tr class="product">
                            <td class="product__img-cell"><img class="product__img" src="${imageSrc}" alt="${producto.name}"></td>
                            <td class="product__name">${producto.name}</td>
                            <td class="product__desc">${producto.description}</td>
                            <td class="product__price">$ ${producto.price}</td>
                            <td class="product__info">

                            <span class = "product__info-icon ${ producto.stock ? '' :'disabled'}">
                            
                            🎁
                            </span>

                            <span class = "product__info-icon ${producto.jostick ? '' :'disabled'}">
                            
                            🎮
                            </span>
                            </td>
                             
                            <td class="product__actions">
                                 <button class="product__action-btn" onclick="deleteProduct(${index})">
                                    <i class="fa-solid fa-trash"></i>
                                 </button>

                                <button class="product__action-btn btn-edit" onclick="editProduct(${index})">
                                <i class="fa-solid fa-pencil"></i>
                                </button>

                                <button class="product__action-btn btn-favorite">
                                <i class="fa-solid fa-star"></i>
                            </button>

                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;
        const editButtons = document.querySelectorAll('.btn-edit');

        console.log(editButtons)
    });

}

renderizarTabla();

function addProduct(evt) {
    evt.preventDefault();
    console.dir(evt.target);
    const elements = evt.target.elements;

    // console.log(elements.stock.checked)
    // console.dir(elements.name);
    // console.dir(elements.price);
    
    const newProduct = {
        name: elements.name.value,
        description: elements.description.value,
        price: elements.price.valueAsNumber,
        image: elements.image.value,
        stock: elements.stock.checked,
        joystick: elements.joystick.checked,
        games: elements.games.value,
        category: 'Limpieza'
    };

    fetch('http://localhost:3200/product', {
        method:'POST',
        body:newProduct
    }). then(resp => resp.json())
    .then(data => console.log(data))

    const newFormData = new FormData(evt.target);
    const newProductFormData = Object.fromEntries(newFormData);
    newProductFormData.stock = newProductFormData.stock === "on" ? true : false;
    newProductFormData.joystick = newProductFormData.joystick === "on" ? true : false;
    newProductFormData.price = +newProductFormData.price





    console.log(newProductFormData);

    Products.push(newProductFormData);

    // console.log(Products)

    renderizarTabla();

    evt.target.reset()
    elements.name.focus();


}
function deleteProduct(indice) {
    Products.splice(indice, 1);

    renderizarTabla();
}

function editProduct(idx) {
    let product = products[idx];
    console.log('indice', idx);
    console.log('product:', product);

}


// product
//     name
//     description
//     price
//     imagen
//     stock?
//     jostick?
//     games?

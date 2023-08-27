const navbar = [
    { name: 'Home', id: 'home', href: '#home' },
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Our Products', id: 'product', href: '#product', isAnchor: true },
    { name: 'Contact Us', id: 'contact', href: '#contact' },
];

const productData = [
    { id: 'p1', name: 'FLORIDA JACKET', category: 'Suffered alteration in some forme,byinjected humor, or randomised', price: 20, imageSrc: 'https://github.com/lakshmanreddy000/shopping-website-assignment/blob/main/product1.png?raw=true' },
    { id: 'p2', name: 'FLORIDA JACKET', category: 'Suffered alteration in some forme,byinjected humor, or randomised', price: 25, imageSrc: 'https://github.com/lakshmanreddy000/shopping-website-assignment/blob/main/product2.png?raw=true' },
    { id: 'p3', name: 'FLORIDA JACKET', category: 'Suffered alteration in some forme,byinjected humor, or randomised', price: 18, imageSrc: 'https://github.com/lakshmanreddy000/shopping-website-assignment/blob/main/product3.png?raw=true' },
    { id: 'p4', name: 'FLORIDA JACKET', category: 'Suffered alteration in some forme,byinjected humor, or randomised', price: 30, imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZKY_LRCMGha02XvJFGGjtuHTtz0bGRBy5M3qprLYpKH_gii0H' },
];

function createNavbar() {
    const navbarList = document.getElementById('navbar-list');
    navbar.forEach(item => {
        const li = document.createElement('li');
       
        const link = document.createElement('a');
        link.textContent = item.name;
        link.setAttribute('href', item.href);
        
        if (item.isAnchor) {
            link.setAttribute('data-scroll', true);
        }
        
        li.appendChild(link);

        navbarList.appendChild(li);
    });
}

 function createProductList(products) {
    const productListContainer = document.getElementById('product-list-container');
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';


    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        const productImage = document.createElement('img');
        productImage.src = product.imageSrc; 
        productImage.alt = product.name;     
      
        productImage.style.width = '300px'; 
        productImage.style.height = '300px'; 

        productDiv.appendChild(productImage);

        const productName = document.createElement('h2');
        productName.textContent = product.name;
        
        const productCategory = document.createElement('p');
        productCategory.textContent = `Category: ${product.category}`;
        
        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = `Price: $${product.price}`;
        
        productDiv.appendChild(productName);
        productDiv.appendChild(productCategory);
        productDiv.appendChild(productPrice);
        
        productList.appendChild(productDiv);
    });
    productListContainer.appendChild(productList); 
}


document.addEventListener('DOMContentLoaded', () => {
    createNavbar();
    
    const productSection = document.getElementById('product');
    const productLink = document.querySelector('.navbar-list li a[data-scroll]');
    productLink.addEventListener('click', (event) => {
        event.preventDefault();
        productSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    createProductList(productData);

    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === 'all') {
            createProductList(productData);
        } else {
            const filteredProducts = productData.filter(product => product.category === selectedCategory);
            createProductList(filteredProducts);
        }
    });
    
    const sections = document.querySelectorAll('section');
    const navbarLinks = document.querySelectorAll('.navbar-list li a[data-scroll]');

    sections.forEach(section => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    navbarLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${targetId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-50px 0px -50px 0px' });

        observer.observe(section);
    });
});

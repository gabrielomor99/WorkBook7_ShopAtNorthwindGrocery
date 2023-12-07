window.onload = () => {
    let searchTypeEl = document.getElementById("searchType");
    let selectCategoryEl = document.getElementById("category");
    let productsListEl = document.getElementById("productsList");

    // Fetch categories and populate the dropdown
    fetch("http://localhost:8081/api/categories")
        .then(categoriesResponse => categoriesResponse.json())
        .then(categories => {
            searchTypeEl.onchange = () => {
                selectCategoryEl.innerHTML = ""; 
                productsListEl.innerHTML = ""; 

                if (searchTypeEl.value === "category") {
                    for (let category of categories) {
                        let optionEl = new Option(category.name, category.categoryId);
                        selectCategoryEl.appendChild(optionEl);
                    }
                    document.getElementById("categoryDropdown").style.display = "block";
                } else if (searchTypeEl.value === "all") {
                    // Display all products
                    fetch("http://localhost:8081/api/products")
                        .then(response => response.json())
                        .then((products) => {
                            for (let product of products) {
                                displayProduct(product);
                            }
                        })
                        .catch(error => console.error('Error fetching products:', error));

                    document.getElementById("categoryDropdown").style.display = "none";
                } else {
                    document.getElementById("categoryDropdown").style.display = "none";
                }
            };

            // Fetch products
            fetch("http://localhost:8081/api/products")
                .then(productsResponse => productsResponse.json())
                .then((products) => {
                    console.log(products)
                    selectCategoryEl.onchange = () => {
                        productsListEl.innerHTML = "";

                        if (searchTypeEl.value === "category") {
                            for (let category of categories) {
                                displayCategory(category);
                            }
                        }
                    };
                })
                
        })
        

    function displayProduct(product) {
        let productInfo = document.createElement("div");
        productInfo.innerHTML = `<p>Product ID: ${product.productId}</p>
                                <p>Name: ${product.productName}</p>
                                <p>Price: ${product.unitPrice}</p>
                                <a href="details.html"target="blank">See Details</a><hr>`;
        productsListEl.appendChild(productInfo);
    }

    function displayCategory(category) {
        let categoryInfo = document.createElement("div");
        categoryInfo.innerHTML = `<p>Name: ${category.name}</p>
                                <p>Description: ${category.description}</p><hr>`;
        productsListEl.appendChild(categoryInfo);
    }
};

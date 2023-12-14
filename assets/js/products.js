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
                                let productInfo = document.createElement("div");
                                productInfo.innerHTML = `<p>Product ID: ${product.productId}</p>
                                                        <p>Name: ${product.productName}</p>
                                                        <p>Price: ${product.unitPrice}</p>
                                                        <a href="/details.html?">See Details</a><hr>`;
                                productsListEl.appendChild(productInfo);
                            }
                        })
                        .catch((err)=>{
                            console.error('Error fetching products:', err)
                        });
                        
                        document.getElementById("categoryDropdown").style.display = "none";
                   
                } else {
                    document.getElementById("categoryDropdown").style.display = "none";
                }
            };

            selectCategoryEl.onchange = () => {
                productsListEl.innerHTML = "";

             let   selectedCategory = selectCategoryEl.value;

                // Fetch products for the selected category
                fetch(`http://localhost:8081/api/products?categoryId=${selectedCategory}`)
                    .then(response => response.json())
                    .then((products) => {
                        for (let product of products) {
                            let categoryInfo = document.createElement("div");
                            categoryInfo.innerHTML =  `${product.productName}`
                            productsListEl.appendChild(categoryInfo);
                        }
                    })
                    .catch ((err)=>{
                        console.error('Error fetching products for the category:', err)
                    })
            };
        });
};


window.onload = async () => {
    let searchTypeEl = document.getElementById("searchType");
    let selectCategoryEl = document.getElementById("category");
    let productsListEl = document.getElementById("productsList");

    try {
        // Fetch categories and populate the dropdown
        let categoriesResponse = await fetch("http://localhost:8081/api/categories");
        let categories = await categoriesResponse.json();

        searchTypeEl.onchange = () => {
            selectCategoryEl.innerHTML = ""; // Clear previous options
            productsListEl.innerHTML = ""; // Clear previous products

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
                    .then(products => {
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


        let productsResponse = await fetch("http://localhost:8081/api/products");
        let products = await productsResponse.json();

        selectCategoryEl.onchange = () => {
            productsListEl.innerHTML = "";

            if (searchTypeEl.value === "category") {

                let selectedCategory = selectCategoryEl.value;
                for (let category of categories) {
                    displayCategory(category);
                }
            }
        };
    } catch (error) {
        console.error("An error occurred:", error);
    }

    function displayProduct(product) {
        let productInfo = document.createElement("div");
        productInfo.innerHTML = `<p>Product ID: ${product.productId}</p>
                                <p>Name: ${product.productName}</p>
                                <p>Price: ${product.unitPrice}</p><hr>`;
        productsListEl.appendChild(productInfo);
    }
    function displayCategory(category) {
        let categoryInfo = document.createElement("div");
        categoryInfo.innerHTML = `<p>Name: ${category.name}</p>
                                <p>Description: ${category.description}</p><hr>`;
        productsListEl.appendChild(categoryInfo);
    }

};

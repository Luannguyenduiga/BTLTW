
// Controller hiện hình ảnh lên 
async function renderPic() {
    const grid = document.getElementById('productGrid');
    const grid1 = document.getElementById('productGrid1');
    const grid2 = document.getElementById('productGrid2');
    const grid3 = document.getElementById('productGrid3');
    try {
        const response = await fetch('http://localhost:3000/products'); // gọi API để lấy dữ liệu sản phẩm
        const products = await response.json(); // chuyển đổi dữ liệu JSON thành đối tượng JavaScript

        grid.innerHTML = products.map(product => `
      <div class="product-card">
      <img src="http://localhost:3000${product.image_url}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p class="price">${Number(product.price).toLocaleString()}₫</p>
    </div>
    `).join('');

        grid1.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}" alt="Product Image">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
      </div>
    `).join('');
    

     grid2.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}" alt="Product Image">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
      </div>
    `).join('');

    
// Controller hiện hình ảnh lên 
async function renderPic() {
    const grid = document.getElementById('productGrid');
    const grid1 = document.getElementById('productGrid1');
    const grid2 = document.getElementById('productGrid3');
    try {
        const response = await fetch('http://localhost:3000/products'); // gọi API để lấy dữ liệu sản phẩm
        const products = await response.json(); // chuyển đổi dữ liệu JSON thành đối tượng JavaScript

        grid.innerHTML = products.map(product => `
      <div class="product-card">
      <img src="http://localhost:3000${product.image_url}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p class="price">${Number(product.price).toLocaleString()}₫</p>
    </div>
    `).join('');

        grid1.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}" alt="Product Image">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
      </div>
    `).join('');
    

     grid3.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}" alt="Product Image">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
      </div>
    `).join('');

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Gọi hàm để hiển thị sản phẩm 
renderPic();


    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Gọi hàm để hiển thị sản phẩm 
renderPic();

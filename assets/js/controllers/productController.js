async function renderPic() {
  const grid = document.getElementById('productGrid');
  const grid1 = document.getElementById('productGrid1');
  const grid2 = document.getElementById('productGrid2');
  const grid3 = document.getElementById('productGrid3');

  try {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();

    // Danh sách linh kiện
    grid.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
      </div>
    `).join('');

    //SẢN PHẨM BÁN CHẠY (3 sản phẩm)
    // slice(0,3) để lấy 3 sản phẩm đầu tiên từ mảng products và hiển thị chúng trong grid1. Mỗi sản phẩm được hiển thị dưới dạng một thẻ div với lớp product-card, chứa hình ảnh, tên và giá của sản phẩm.
    grid1.innerHTML = products.slice(0,3).map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
      </div>
    `).join('');

    grid2.innerHTML = products.slice(0,3).map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
      </div>
    `).join('');

    
    //Grid khác
    grid3.innerHTML = products.slice(0,6).map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Gọi hàm để hiển thị sản phẩm khi trang được tải
renderPic();
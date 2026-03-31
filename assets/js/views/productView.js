async function renderPic() {
  const grid = document.getElementById('linhkienGridPr');
  const grid1 = document.getElementById('laptopGridPr');
  const grid2 = document.getElementById('linhkienGrid');
  const grid3 = document.getElementById('laptopAigrid');
  const grid4 = document.getElementById('laptopGamingGrid');
  const grid5 = document.getElementById('laptopVPgrid');

  try {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();

    const dienthoai = products.filter(p => p.category_id == 1);
    const laptop = products.filter(p => p.category_id == 2);
    const linhkien = products.filter(p => p.category_id == 3);

    //SẢN PHẨM BÁN CHẠY (4 sản phẩm)
    // slice(0,4) để lấy 4 sản phẩm đầu tiên từ mảng products và hiển thị chúng trong grid1. Mỗi sản phẩm được hiển thị dưới dạng một thẻ div với lớp product-card, chứa hình ảnh, tên và giá của sản phẩm.
    grid.innerHTML = products.slice(0, 3).map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
        <button class="btn-buy">
                Thêm vào giỏ hàng
            </button>
      </div>
    `).join('');

    grid1.innerHTML = products.slice(0, 3).map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
        <button class="btn-buy">
                Thêm vào giỏ hàng
            </button>
      </div>
    `).join('');


    //Grid khác

    // Danh sách linh kiện
    grid2.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
        <button class="btn-buy">
                Thêm vào giỏ hàng
            </button>
      </div>
    `).join('');

    grid3.innerHTML = products  .map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
        <button class="btn-buy">
                Thêm vào giỏ hàng
            </button>
      </div>
    `).join('');

    grid4.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
        <button class="btn-buy">
                Thêm vào giỏ hàng
            </button>
      </div>
    `).join('');

    grid5.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="http://localhost:3000${product.image_url}">
        <h4>${product.name}</h4>
        <p class="price">${Number(product.price).toLocaleString()}₫</p>
        <button class="btn-buy">
                Thêm vào giỏ hàng
            </button>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error fetching products:', error);
  }


}

// Gọi hàm để hiển thị sản phẩm khi trang được tải
renderPic();
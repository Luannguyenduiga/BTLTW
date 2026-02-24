const products = [
    {
        id: 1,
        name: "Ram PC Kingston Fury Beast 8GB DDR4 3200Mhz",
        price: "1,490,000đ",
        img: "https://bizweb.dktcdn.net/thumb/1024x1024/100/492/434/products/screenshot-2025-06-29-171407.png?v=1751192072450"
    },
    {
        id: 2,
        name: "Ram DDR4 Kingston 16GB 3200Mhz Fury Beast",
        price: "2,590,000đ",
        img: "https://bizweb.dktcdn.net/thumb/grande/100/329/122/products/ram-pc-kingston-fury-beast-rgb-32gb-3200mhz-ddr4-2x16gb-kf432c16bb2ak2-3d2fcc62-a31b-46ac-bf32-5ba46671c5a0.jpg?v=1705286572920"
    },
    {
        id: 3,
        name: "Ram DDR3 8GB 1600Mhz AOSENKE Tản Nhiệt",
        price: "489,000đ",
        img: "https://product.hstatic.net/200000420363/product/r3-8g-1600-ask-tn_b50d15779a0144fab8257ba0cb8ae969_1024x1024.jpg"
    },
    {
        id: 4,
        name: "Ram KingSpec 16GB | 1x16GB DDR4 3200Mhz",
        price: "2,190,000đ",
        img: "https://product.hstatic.net/200000420363/product/tai_xuong__2__bc3603c7ec8b4120b4d79f9c27072074_1024x1024.png"
    },
    {
        id: 5,
        name: "Ram 4 16G Bus 3200 Corsair Vengeance Lpx Black",
        price: "2,590,000đ",
        img: "https://product.hstatic.net/200000420363/product/1_534066e9ade44339b05335e8751982af_master.jpg"
    },
    {
        id: 6,
        name: "CPU Intel Core i9 14900K Chính hãng | Up to 6.0GHz 24 cores 32 threads",
        price: "13,590,000₫",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvzZT10veFfXuGbHvf2LfZLjTohsbDGQNBdA&s"
    },
    {
        id: 7,
        name: "CPU Intel Core i7 13700K Chính hãng | Up to 5.4GHz 16 cores 24 threads",
        price: "8,990,000₫",
        img:"https://product.hstatic.net/200000420363/product/_new_-anh-sp-web_9039565aaf554ead8bad2b7bf47d060c_master.jpg"
    },
    {
        id: 8,
        name: "CPU Intel Core i5 13400F Chính hãng | Up to 4.6GHz 10 cores 16 threads",
        price: "4,290,000₫",
        img:"https://donghypc.vn/upload/cpu/2ac3cefcb9de50d6b348ef333bbc8644.jpg"
    }
];

const products1 = [
    {
        id: 1,
        name: "Laptop Msi Modern 15 F13MG-667VN_16G (i5-1334U/ 16GB/ 512GB/ Win 11 Home SL)",
        price: "14.790.000₫",
        img: "https://lh3.googleusercontent.com/4omLcE0NC6pRtrkROefiqFbl92Rs7lbioRrZacUgN8JnRt0qbJ3u2M71Ogg8I21WS-RZbYpw4sIkv-veCP30tu16Hb1kh7twBg=w1000-rw"
    },
    {
        id: 2,
        name: "Laptop Asus TUF Gaming F16 FX608JHR-RV037W (i7-14650HX/ GeForce RTX™ 5050/ 16GB/ 1TB/ Win 11 Home)",
        price: "34.790.000₫",
        img: "https://lh3.googleusercontent.com/lSoDhban5kO8li0sStP982SU2NboJMHn8lykGgnKUGglkjKXaDQwu2m5ljq0s0IhDZvySWl4rjxUZ5mZOFlj5sQS8DcJ42MJ=w1000-rw"
    },
    {
        id: 3,
        name: "Laptop Dell Inspiron 15 3520 N3I5102W (i5-1235U/ 8GB/ 512GB/ Win 11 Home SL)",
        price: "15.990.000₫",
        img: "https://lh3.googleusercontent.com/ihFhZs8kgjDphkVN8S80VU6jwuIQ_wi60zBhJL-4AYspXE1vJgrJTGFVyqoNufiBR_kqz0fX2VNkgNPvgv-6W6NMD9ArqdFZRw=w500-rw"  
    },
    {
        id: 4,
        name: "Laptop Acer Aspire 3 A315-58-589K (i5-1235U/ 8GB/ 512GB/ Win 11 Home SL)",
        price: "12.990.000₫",
        img: "https://lh3.googleusercontent.com/ViHOEAA2x3Q0In7EFPDPstVbuJuZ0uR5mFU-ZcOSU-D3bpseQW0iaanRT2LMAMZQ7VsAq8cJQblk17L-_URey1JGGIjcukB6eQ=w500-rw"
    }
];

function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="price">${product.price}</p>
        </div>
    `).join('');

    const grid1 = document.getElementById('productGrid1');
    grid1.innerHTML = products.slice(0, 3).map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="price">${product.price}</p>
        </div>
    `).join('');

    const grid2 = document.getElementById('productGrid2');
    grid2.innerHTML = products1.slice(0, 3).map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="price">${product.price}</p>
        </div>
    `).join('');

    const grid3 = document.getElementById('productGrid3');
    grid3.innerHTML = products1.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="price">${product.price}</p>
        </div>
    `).join('');
}

// Khởi chạy khi trang load
document.addEventListener('DOMContentLoaded', renderProducts);
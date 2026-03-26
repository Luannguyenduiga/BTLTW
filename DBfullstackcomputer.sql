CREATE DATABASE FULLSTACKCOMP
GO
USE FULLSTACKCOMP
GO

--1. Users có role cho staff admin user
CREATE TABLE NGUOIDUNG (
    user_id INT PRIMARY KEY IDENTITY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'staff', 'user')),
    status VARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- 2. Nhóm Sản phẩm (Catalog)
CREATE TABLE DANHMUC (
    category_id INT PRIMARY KEY IDENTITY,
    name NVARCHAR(100) NOT NULL,
    slug VARCHAR(100),
    description NVARCHAR(255)
);
GO

--3. Hãng
CREATE TABLE HANG (
    brand_id INT PRIMARY KEY IDENTITY,
    name NVARCHAR(100) NOT NULL,
    logo VARCHAR(255)
);
GO

--4. Sản phẩm 
CREATE TABLE SANPHAM (
    product_id INT PRIMARY KEY IDENTITY,
    name NVARCHAR(200) NOT NULL,
    price DECIMAL(12,0),
    discount_price DECIMAL(12,0),
    category_id INT,
    brand_id INT,
    description NVARCHAR(MAX),
    status VARCHAR(20) DEFAULT 'active',

    FOREIGN KEY (category_id) REFERENCES DANHMUC(category_id),
    FOREIGN KEY (brand_id) REFERENCES HANG(brand_id)
);
GO

-- Bảng hình ảnh sản phẩm (1 sản phẩm có nhiều ảnh)
CREATE TABLE HINHANH_SP (
    image_id INT PRIMARY KEY IDENTITY,
    product_id INT,
    image_url VARCHAR(255),
    is_main BIT DEFAULT 0,

    FOREIGN KEY (product_id) REFERENCES SANPHAM(product_id)
);
GO

INSERT INTO NGUOIDUNG (username, password, email, role, status)
VALUES 
('admin_thanh', 'hashed_pass_123', 'admin@store.com', 'admin', 'active'),
('nv_hoang', 'hashed_pass_456', 'hoang.staff@store.com', 'staff', 'active'),
('khachhang01', 'hashed_pass_789', 'customer@gmail.com', 'user', 'active');

SELECT 
    p.product_id,
    p.name,
    p.price,
    h.image_url
FROM SANPHAM p
JOIN HINHANH_SP h 
    ON p.product_id = h.product_id
WHERE h.is_main = 1
  AND p.status= 'active';

-- Ten + duong dan anh san pham--
  SELECT 
    p.product_id,
    p.name,
    p.price,
    h.image_url
FROM SANPHAM p
JOIN HINHANH_SP h 
    ON p.product_id = h.product_id;

INSERT INTO DANHMUC (name)
VALUES 
('Điện Thoại'),
('Laptop'),
('Linh Kiện');

INSERT INTO HANG(name)
VALUES 
('Intel'),
('Crossair'),
('Gigabyte'),
('Furry'),
('Acer'),
('HP'),
('Asus'),
('MSI'),
('Apple'),
('Oppo'),
('SamSung'),
('ROG');

	select * from HINHANH_SP
DBCC CHECKIDENT ('SANPHAM', RESEED, 0)
select * from HINHANH_SP
select * from SANPHAM
delete from 
SANPHAM
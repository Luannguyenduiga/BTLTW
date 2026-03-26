import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { connectDB, sql } from './configDB.js';


const fastify = Fastify({ logger: true });
const pump = promisify(pipeline);

await fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});
// Register Multipart (Quan trọng: bodyLimit để tránh lỗi file quá nặng)
await fastify.register(fastifyMultipart, {
  attachFieldsToBody: false // Để mình tự xử lý bằng req.parts() cho chuẩn stream
});

// Thiết lập thư mục ảnh
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGE_ROOT = path.join(__dirname, '../images'); // Sửa lại cho đúng cấu trúc folder của ông
if (!fs.existsSync(IMAGE_ROOT)) fs.mkdirSync(IMAGE_ROOT, { recursive: true });

// Đăng kí static để phục vụ ảnh (Quan trọng: prefix phải trùng với đường dẫn trong DB trả về)
fastify.register(fastifyStatic, {
  root: IMAGE_ROOT,
  prefix: '/images/',
  list: false // Không cho phép liệt kê thư mục để tránh lỗi 404 khi vào /images/
});

// get products
fastify.get('/products', async (req, reply) => {
  try {
    const result = await sql.query`
      SELECT 
        p.product_id,
        p.name,
        p.price,
        -- Nối chuỗi để tạo URL hoàn chỉnh: /images/linhkien/tên-file.jpg
        CASE 
          WHEN h.image_url IS NOT NULL THEN CONCAT('/images/', h.image_url)
          ELSE '/images/default-placeholder.png' 
        END AS image_url
      FROM SANPHAM p
      LEFT JOIN HINHANH_SP h 
        ON p.product_id = h.product_id AND h.is_main = 1
      WHERE p.status='active'
      ORDER BY p.product_id DESC
    `;

    // Gửi danh sách đã có đường dẫn ảnh sạch đẹp về frontend
    reply.send(result.recordset);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Lỗi lấy dữ liệu hiển thị' });
  }
});

// post products
fastify.post('/products', async (req, reply) => {
  try {
    console.log("Nhận yêu cầu post từ FE");
    if (!req.isMultipart()) {
        const data = req.body;
        console.log("Dữ liệu JSON nhận được:", data);
        // Insert SQL cho JSON ở đây
        return { success: true, mode: 'json' };
    }

    const parts = req.parts();
    let fieldData = {};
    let filePart = null;

    for await (const part of parts) {
      if (part.file) {
        filePart = part;
      } else {
        fieldData[part.fieldname] = part.value;
      }
    }

    console.log("Lấy fieldData-", fieldData);

    // ÉP KIỂU SỐ (SQL Server rất khắt khe chỗ này)
    const name = fieldData.name;
    const price = parseInt(fieldData.price);
    const category_id = parseInt(fieldData.category_id);
    const brand_id = parseInt(fieldData.brand_id);
    const description = fieldData.description || '';

    if (!name || isNaN(price)) {
        return reply.code(400).send({ error: "Tên hoặc Giá không hợp lệ" });
    }

    console.log("Insert field vào DB");
    const result = await sql.query`
      INSERT INTO SANPHAM (name, price, category_id, brand_id, description, status)
      OUTPUT INSERTED.product_id
      VALUES (${name}, ${price}, ${category_id}, ${brand_id}, ${description}, 'active')
    `;
    const productId = result.recordset[0].product_id;
    console.log("Insert thành công, ID:", productId);

    if (filePart && filePart.filename) {
      console.log("Xử lý file upload picture");
      const folderName = 'linhkien';
      const fileName = `${Date.now()}-${filePart.filename}`;
      const dbPath = `${folderName}/${fileName}`;
      const filePath = path.join(IMAGE_ROOT, folderName, fileName);

      // Đảm bảo folder tồn tại
      if (!fs.existsSync(path.join(IMAGE_ROOT, folderName))) {
          fs.mkdirSync(path.join(IMAGE_ROOT, folderName), { recursive: true });
      }

      await pump(filePart.file, fs.createWriteStream(filePath));
      
      await sql.query`
        INSERT INTO HINHANH_SP (product_id, image_url, is_main)
        VALUES (${productId}, ${dbPath}, 1)
      `;
      console.log("Lưu ảnh thành công vào DB:", dbPath);
    }

    reply.send({ success: true, productId });

  } catch (err) {
    // ĐÂY LÀ CHỖ IN LỖI CHI TIẾT RA TERMINAL CHO ÔNG
    console.error("Thông báo lỗi:", err.message);
    console.error("Vị trí lỗi:", err.stack);
    
    reply.code(500).send({ 
        error: 'Lỗi Server', 
        message: err.message,
        tip: "Kiểm tra Terminal để xem chi tiết" 
    });
  }
});

// Mở port
const start = async () => {
  try {
    await connectDB();
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log("Server chạy tại http://localhost:3000");
  } catch (err) {
    process.exit(1);
  }
};
start();
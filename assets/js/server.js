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
  attachFieldsToBody: false, // Để mình tự xử lý bằng req.parts() cho chuẩn stream
  limits: {
    fieldNameSize: 100,      // Max tên field (100 bytes)
    fieldSize: 1000000,      // Max dữ liệu của các ô text (1MB)
    fileSize: 10 * 1024 * 1024, // CHO PHÉP FILE LÊN ĐẾN 10MB 
    files: 1                 // Chỉ cho phép upload 1 file mỗi lần
  }
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
    console.log("B1: Nhận Request (Đang đợi gom dữ liệu)");

    // 1. Kiểm tra xem có phải Multipart không
    if (!req.isMultipart()) {
      return reply.code(400).send({ error: "Dữ liệu không đúng định dạng Form" });
    }

    // 2. Gom toàn bộ File và các Field chữ (name, price...) vào biến 'data'
    // req.file() sẽ đợi cho đến khi nhận đủ 110KB hoặc hơn
    const data = await req.file(); 
    if (!data) return reply.code(400).send({ error: "Không tìm thấy file ảnh" });

    // 3. Bóc tách dữ liệu từ data.fields (Lưu ý: phải có .value)
    const name = data.fields.name?.value;
    const price = parseInt(data.fields.price?.value);
    const category_id = parseInt(data.fields.category_id?.value);
    const brand_id = parseInt(data.fields.brand_id?.value);
    const description = data.fields.description?.value || '';

    console.log(" B2: Dữ liệu nhận được", { name, price });
    if (!name || isNaN(price)) {
      return reply.code(400).send({ error: "Tên hoặc Giá không hợp lệ" });
    }

    // 4. Insert SP vào Database
    const result = await sql.query`
      INSERT INTO SANPHAM (name, price, category_id, brand_id, description, status)
      OUTPUT INSERTED.product_id
      VALUES (${name}, ${price}, ${category_id}, ${brand_id}, ${description}, 'active')
    `;
    const productId = result.recordset[0].product_id;

    // 5. Lưu file ảnh (110KB hay bao nhiêu cũng cân hết)
    const folderName = 'linhkien';
    const fileName = `${Date.now()}-${data.filename.replace(/\s+/g, '-')}`;
    const dbPath = `${folderName}/${fileName}`;
    const targetDir = path.join(IMAGE_ROOT, folderName);

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    // Ghi file bằng pump (Đảm bảo ghi xong xuôi mới chạy tiếp)
    await pump(data.file, fs.createWriteStream(path.join(targetDir, fileName)));

    // 6. Lưu vào DB hình ảnh
    await sql.query`
      INSERT INTO HINHANH_SP (product_id, image_url, is_main)
      VALUES (${productId}, ${dbPath}, 1)
    `;

    console.log("Trả kết quả về cho FE");
    
    // 7. TRẢ VỀ (Quan trọng: Phải trả về thì FE mới hết PENDING)
    return reply.send({ success: true, productId });

  } catch (err) {
    console.error("Lỗi nghẽn", err.message);
    // Nếu lỗi cũng phải trả về để FE không bị PENDING
    return reply.code(500).send({ error: 'Lỗi server', message: err.message });
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
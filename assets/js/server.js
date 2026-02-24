import Fastify from 'fastify';
import cors from '@fastify/cors';
import {connectDB, sql} from './configDB.js';

const fastify = Fastify({ logger: true });
await fastify.register(cors, { origin: true });

// connect DB
await connectDB();

// test route
fastify.get('/hinhanh', async (req, reply) => {
  try {
    const pool = await connectDB(); // Đảm bảo đã kết nối trước khi truy vấn
    const result = await pool.request().query('SELECT * FROM HINHANH_SP');
    reply.send(result.recordset);
  } catch (err) {
    reply.status(500).send(err);
  }
});

fastify.get('/', async (req, reply) => {
  return { status: 'OK', message: 'Fullstack Computer API running' };
});

// start server
fastify.listen({ port: 3000 }, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1); // tự thoát nếu có lỗi khi khởi động server
  }
  console.log('Server running at http://localhost:3000');
});
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 1. 메인 화면 (분실물 목록 조회)
app.get('/', async (req, res) => {
  const [items] = await pool.query(
    "SELECT id, item_name, lost_location, DATE_FORMAT(lost_time, '%Y-%m-%d %H:%i') AS lost_time, contact_phone FROM lost_items ORDER BY id DESC"
  );
  res.render('index', { items });
});

// 2. 분실물 등록
app.post('/items', async (req, res) => {
  const { item_name, lost_location, lost_time, contact_phone } = req.body;
  await pool.query(
    'INSERT INTO lost_items (item_name, lost_location, lost_time, contact_phone) VALUES (?, ?, ?, ?)',
    [item_name, lost_location, lost_time, contact_phone]
  );
  res.redirect('/');
});

// 3. 분실물 삭제
app.post('/items/:id/delete', async (req, res) => {
  await pool.query('DELETE FROM lost_items WHERE id = ?', [req.params.id]);
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('서버 실행 중: http://localhost:3000');
});
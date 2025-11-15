import { sql } from '@vercel/postgres';
import * as fs from 'fs';
import * as path from 'path';

async function seed() {
  try {
    console.log('🌱 开始数据填充...');

    // 读取seed文件
    const seedPath = path.join(process.cwd(), 'db', 'seed.sql');
    const seedData = fs.readFileSync(seedPath, 'utf-8');

    // 执行seed
    console.log('📝 插入示例数据...');
    await sql.query(seedData);

    console.log('✅ 数据填充完成！');
  } catch (error) {
    console.error('❌ 填充失败:', error);
    process.exit(1);
  }
}

seed();


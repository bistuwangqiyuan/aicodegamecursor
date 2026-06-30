import * as fs from 'fs';
import * as path from 'path';
import { runSqlScript } from './db-client.mjs';

async function seed() {
  try {
    console.log('🌱 开始数据填充...');

    const seedPath = path.join(process.cwd(), 'db', 'seed.sql');
    const seedData = fs.readFileSync(seedPath, 'utf-8');

    console.log('📝 插入示例数据...');
    await runSqlScript(seedData);

    console.log('✅ 数据填充完成！');
  } catch (error) {
    console.error('❌ 填充失败:', error);
    process.exit(1);
  }
}

seed();

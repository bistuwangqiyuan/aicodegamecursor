import * as fs from 'fs';
import * as path from 'path';
import { runSqlScript } from './db-client.mjs';

async function migrate() {
  try {
    console.log('🚀 开始数据库迁移...');

    const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    console.log('📝 创建表结构...');
    await runSqlScript(schema);

    console.log('✅ 数据库迁移完成！');
  } catch (error) {
    console.error('❌ 迁移失败:', error);
    process.exit(1);
  }
}

migrate();

/**
 * 工具函数单元测试
 */

import { describe, it, expect } from 'vitest';
import { formatNumber, formatDate, cn, generateId } from '@/lib/utils';

describe('Utils Functions', () => {
  describe('formatNumber', () => {
    it('应该正确格式化数字', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(123)).toBe('123');
    });
  });

  describe('formatDate', () => {
    it('应该正确格式化日期', () => {
      const date = new Date('2025-10-14T10:00:00');
      const formatted = formatDate(date, 'date');
      expect(formatted).toContain('2025');
      expect(formatted).toContain('10');
      expect(formatted).toContain('14');
    });
  });

  describe('cn', () => {
    it('应该正确合并类名', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
      expect(cn('class1', undefined, 'class2')).toBe('class1 class2');
    });
  });

  describe('generateId', () => {
    it('应该生成唯一ID', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(id1.length).toBeGreaterThan(0);
    });

    it('应该支持前缀', () => {
      const id = generateId('test');
      expect(id).toContain('test_');
    });
  });
});


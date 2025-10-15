/**
 * 站点配置测试
 */

import { describe, it, expect } from 'vitest';
import { siteConfig } from '@/config/site';

describe('Site Configuration', () => {
  it('应该包含必要的配置项', () => {
    expect(siteConfig.name).toBe('GameCode Lab');
    expect(siteConfig.description).toBeTruthy();
    expect(siteConfig.url).toBeTruthy();
  });

  it('应该有正确的游客试用配置', () => {
    expect(siteConfig.guestTrial.durationDays).toBe(30);
    expect(siteConfig.guestTrial.warningDays).toBe(7);
    expect(siteConfig.guestTrial.gracePeriodDays).toBe(7);
  });

  it('应该有正确的游戏化配置', () => {
    expect(siteConfig.gamification.maxLevel).toBe(10);
    expect(siteConfig.gamification.levelUpXp.length).toBe(10);
    expect(siteConfig.gamification.levelUpXp[0]).toBe(0);
    expect(siteConfig.gamification.levelUpXp[9]).toBe(5000);
  });

  it('应该配置多个AI服务', () => {
    expect(siteConfig.ai.providers.length).toBeGreaterThan(0);
    expect(siteConfig.ai.providers[0].name).toBe('DeepSeek');
  });
});


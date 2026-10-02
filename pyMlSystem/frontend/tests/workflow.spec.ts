import { test, expect } from '@playwright/test';

test('engineer can triage, inspect evidence, and persist feedback', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('API ready', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Use demo incident' }).click();
  await page.getByRole('button', { name: 'Triage incident →' }).click();
  await expect(page.getByRole('heading', { name: 'Checkout pods restarting after deployment' })).toBeVisible();
  await expect(page.getByText('Platform Engineering', { exact: true }).first()).toBeVisible();
  await expect(page.locator('summary').filter({ hasText: 'Kubernetes pod restart investigation' })).toBeVisible();
  await page.getByLabel('Review notes').fill('Browser test: useful diagnostic steps.');
  await page.getByRole('button', { name: 'Helpful ✓' }).click();
  await expect(page.getByRole('status')).toContainText('Review saved');
  await page.reload();
  await page.getByRole('button', { name: 'Checkout pods restarting after deployment', exact: true }).first().click();
  await expect(page.getByLabel('Review notes')).toHaveValue('Browser test: useful diagnostic steps.');
  await page.getByRole('button', { name: /Runbook library/ }).click();
  await expect(page.getByRole('heading', { name: 'Database connection saturation' })).toBeVisible();
});

test('mobile layout stays within the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Triage incident →' })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});

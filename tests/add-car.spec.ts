import { test, expect } from '@playwright/test';

test('guest adds Audi TT with mileage 12000', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /guest log in/i }).click();
  await expect(page).toHaveURL(/panel\/garage/);

  await page.getByRole('button', { name: 'Add car' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'Add a car' })).toBeVisible();

  await dialog.getByLabel('Brand').selectOption('Audi');
  await dialog.getByLabel('Model').selectOption('TT');
  await dialog.getByLabel('Mileage').fill('12000');
  await dialog.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('Car added')).toBeVisible();
  await expect(page.getByText('Audi TT')).toBeVisible();
  await expect(page.locator('input[name="miles"]')).toHaveValue('12000');
});

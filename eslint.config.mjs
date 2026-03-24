import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      'playwright': playwright,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // Дозволяє бачити "забуті await"
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // --- ПРАВИЛА ЧИСТОТИ ТА ПРАВИЛЬНОСТІ КОДУ ---
      '@typescript-eslint/no-floating-promises': 'error', // ЗАБОРОНЯЄ забувати await (критично!)
      '@typescript-eslint/await-thenable': 'error',       // ЗАБОРОНЯЄ зайві await
      'no-unused-vars': 'off',                            // Вимикаємо базовий, щоб працював TS-варіант
      '@typescript-eslint/no-unused-vars': ['warn'],      // Свариться на змінні, які ти створила і не використала
      'no-console': 'warn',                               // Нагадує видалити console.log перед пушем

      // --- ПРАВИЛА PLAYWRIGHT (BEST PRACTICES) ---
      ...playwright.configs['recommended'].rules,
      'playwright/no-page-pause': 'error',          // Забороняє page.pause()
      'playwright/no-focused-test': 'error',       // Забороняє test.only
      'playwright/no-skipped-test': 'warn',        // Попереджає про test.skip
      'playwright/no-wait-for-timeout': 'error',   // Забороняє фіксовані очікування (типу sleep 5s)
      'playwright/expect-expect': 'error',         // Свариться, якщо в тесті немає жодного expect (тест нічого не перевіряє)
      'playwright/valid-expect': 'error',          // Перевіряє, чи правильно ти написала await expect(...)
    },
  }
);
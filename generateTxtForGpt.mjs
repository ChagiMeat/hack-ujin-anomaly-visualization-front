import fs from 'fs';
import path from 'path';

// Исключаемые директории и файлы
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', 'coverage', '.idea'];
const EXCLUDE_FILES = ['.env', '.DS_Store', 'package-lock.json', 'yarn.lock', 'README.md'];

// Функция для проверки, нужно ли исключить файл или директорию
function shouldExclude(filePath) {
  const baseName = path.basename(filePath);
  return EXCLUDE_DIRS.includes(baseName) || EXCLUDE_FILES.includes(baseName);
}

// Рекурсивная функция для обхода директорий
function collectFiles(dir, prefix = '') {
  let result = '';
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);

    // Пропускаем исключаемые файлы/директории
    if (shouldExclude(fullPath)) continue;

    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // Если это директория, добавляем заголовок и рекурсивно обходим её
      result += `${prefix}${item}/\n`;
      result += collectFiles(fullPath, `${prefix}  `);
    } else if (stats.isFile()) {
      // Если это файл, читаем его содержимое
      result += `${prefix}${item}\n`;
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        result += `${content}\n\n`;
      } catch (err) {
        result += `  [Ошибка чтения файла: ${err.message}]\n\n`;
      }
    }
  }

  return result;
}

// Главная функция
function main() {
  const projectRoot = process.cwd(); // Корневая директория проекта
  const outputFilePath = path.join(projectRoot, 'project-collected.txt'); // Выходной файл

  console.log('Сборка файлов проекта...');
  const collectedData = collectFiles(projectRoot);

  // Записываем результат в файл
  fs.writeFileSync(outputFilePath, collectedData, 'utf8');
  console.log(`Проект успешно собран в файл: ${outputFilePath}`);
}

main();
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define las rutas del archivo fuente y destino
const sourcePath = path.join(__dirname, '404.html');
const destinationPath = path.join(__dirname, 'dist', '404.html');

// Asegúrate de que la carpeta destino exista
fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

// Copia el archivo
fs.copyFileSync(sourcePath, destinationPath);

console.log('404.html copiado a la carpeta de dist');

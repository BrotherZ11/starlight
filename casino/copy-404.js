import fs from 'fs';
import path from 'path';

// Define las rutas del archivo fuente y destino
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const sourcePath = path.join(__dirname, '404.html');
const destinationPath = path.join(__dirname, 'dist', '404.html');

// Asegúrate de que la carpeta destino exista
fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

// Copia el archivo
fs.copyFileSync(sourcePath, destinationPath);

console.log('404.html copiado a la carpeta de dist');

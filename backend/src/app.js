// app.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 8081;

const db = mysql.createConnection({
  host: '34.38.1.96',
  user: 'root',
  password: '',
  database: 'casino'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  console.log(req.body)
    const values =[
      req.body.email, 
      req.body.password,
      req.body.name,
      req.body.lastname,
      req.body.dni,
      req.body.country,
      req.body.date
    ]
  db.query('INSERT INTO user (`email`, `password`, `name`, `lastname`, `dni`, `country`, `date`) VALUES (?)', [values], (err, result) => {
    if (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).send('Error al registrar usuario');
      }
      else {
        console.log('Usuario registrado con éxito');
        res.status(200).send('Usuario registrado con éxito');
      }
  });
});

app.post('/login', (req, res) => {
  console.log(req.body)
  db.query('SELECT * FROM user WHERE email = ? AND password = ?', [req.body.email, req.body.password], (err, result) => {
    if (err) {
      res.status(500).send('Error al iniciar sesión');
    } else {
      if (result.length > 0) {
        const userId = result[0].id;
        res.status(200).json({ userId: userId });
      } else {
        res.status(401).send('Credenciales inválidas');
      }
    }
  });
});

// Ruta para verificar si el correo electrónico ya se ha utilizado
app.post("/checkEmail", async (req, res) => {;
  try {
    // Consulta SQL para verificar si el correo electrónico ya está en uso
    db.query('SELECT * FROM user WHERE email = ?', [req.body.email], (err, result) => {
      if (err) {
        console.error("Error checking email:", err);
        res.status(500).json({ error: "Error checking email" });
      } else {
        // Si hay un resultado, significa que el correo electrónico ya está en uso
        if (result.length > 0) {
          res.json({ exists: true });
        } else {
          res.json({ exists: false });
        }
      }
    });
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Error checking email" });
  }
});

app.get('/wallet/:userId',(req, res) => {
  // Obtengo el ID
  const userId = req.params.userId; 
  // Consulta SQL para obtener la cantidad del monedero del usuario
  db.query('SELECT money FROM user WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error al obtener la cantidad del monedero:', err);
      res.status(500).json({ error: 'Error al obtener la cantidad del monedero' });
    } else {
      // Verificar si se encontró un usuario con el ID proporcionado
      if (result.length > 0) {
        // Enviar la cantidad del monedero como respuesta
        res.json({ amount: result[0].money });
      } else {
        // Si no se encontró un usuario con el ID proporcionado, devolver un error
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    }
  });
});

app.post("/wallet/add", (req, res) => {
  const userId = req.body.userId;
  const amountToAdd = req.body.amountToAdd;

  // Actualizar la cantidad en el monedero del usuario en la base de datos
  db.query(
    "UPDATE user SET money = money + ? WHERE id = ?",
    [amountToAdd, userId],
    (err, result) => {
      if (err) {
        console.error("Error adding money to wallet:", err);
        res.status(500).json({ error: "Error adding money to wallet" });
      } else {
        res.status(200).json({ success: true });
      }
    }
  );
});


app.post('/walletUpdate', (req, res) => {
  console.log('wallet Update')
  console.log(req.body.money)
  console.log(req.body.id)

  db.query('UPDATE user SET money = ? WHERE id = ?', [req.body.money, req.body.id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el dinero:', err);
      res.status( 500).send('Error al actualizar el dinero');
    }
    else {
      console.log('Dinero actualizado con éxito');
      res.status(200).send('Dinero actualizado con éxito');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});

import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/jwt', (req, res) => {
  const { whatsapp } = req.body;

  if (!whatsapp) {
    return res.status(400).json({ error: 'Número do WhatsApp é obrigatório.' });
  }

  const token = jwt.sign(
    {
      sub: whatsapp,
      role: 'authenticated',
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

app.listen(process.env.PORT, () => {
  console.log(`JWT API rodando em http://localhost:${process.env.PORT}`);
});

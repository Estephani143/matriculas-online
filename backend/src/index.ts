import express from 'express';
import cors from 'cors';
import path from 'path';             
import { cursos } from './data/cursos';
import type { Aluno } from './types/Aluno';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/cursos', (req, res) => {
  res.json(cursos);
});

app.post('/matricula', (req, res) => {
  const { nome, email, cursoId } = req.body as Aluno;

  if (!nome || !email || !cursoId) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  console.log('Matrícula recebida:', { nome, email, cursoId });

  res.status(201).json({ mensagem: 'Matrícula realizada com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

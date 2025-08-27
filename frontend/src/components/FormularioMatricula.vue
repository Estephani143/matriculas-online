<template>
  <div class="formulario">
    <h2>Formulário de Matrícula</h2>

    <form @submit.prevent="enviarMatricula">
      <div>
        <label for="nome">Nome completo:</label>
        <input type="text" id="nome" v-model="nome" required />
      </div>

      <div>
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div>
        <label for="curso">Curso:</label>
        <select v-model="cursoId" required>
          <option value="" disabled selected>Selecione um curso</option>
          <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
            {{ curso.nome }}
          </option>
        </select>
      </div>

      <button type="submit">Matricular</button>
    </form>

    <p v-if="mensagem" :class="{ sucesso: sucesso, erro: !sucesso }">
      {{ mensagem }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const nome = ref('')
const email = ref('')
const cursoId = ref('')
const cursos = ref([])
const mensagem = ref('')
const sucesso = ref(false)

const carregarCursos = async () => {
  try {
    const res = await fetch('http://localhost:3000/cursos')
    cursos.value = await res.json()
  } catch (err) {
    mensagem.value = 'Erro ao carregar os cursos.'
    sucesso.value = false
  }
}

const enviarMatricula = async () => {
  mensagem.value = ''
  try {
    const res = await fetch('http://localhost:3000/matricula', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nome.value, email: email.value, cursoId: cursoId.value })
    })

    const data = await res.json()

    if (!res.ok) {
      mensagem.value = data.erro || 'Erro ao enviar matrícula.'
      sucesso.value = false
    } else {
      mensagem.value = data.mensagem
      sucesso.value = true
      nome.value = ''
      email.value = ''
      cursoId.value = ''
    }
  } catch (err) {
    mensagem.value = 'Erro ao conectar com o servidor.'
    sucesso.value = false
  }
}

onMounted(() => {
  carregarCursos()
})
</script>

<style scoped>
.formulario {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}

form div {
  margin-bottom: 1rem;
}

input, select {
  width: 100%;
  padding: 8px;
}

button {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #66b1ff;
}

.sucesso {
  color: green;
}

.erro {
  color: red;
}
</style>

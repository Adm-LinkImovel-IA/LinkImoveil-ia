// auth.js - Lógica de Autenticação Separada
const SUPABASE_URL = 'https://xmjxfcwnytguwntvloja.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtanhmY3dueXRndXdudHZsb2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMzA4MDEsImV4cCI6MjA4NTgwNjgwMX0.HSJbuCrnL7D3AlEpqlxq28yowHmUlqZyQSOCJRrmgOM';

// Inicialização
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const btnAuth = document.getElementById('btn-auth');
const toggleAuth = document.getElementById('toggle-auth');
let isLoginMode = true;

// Alternar entre Login e Cadastro
if (toggleAuth) {
    toggleAuth.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        authTitle.innerText = isLoginMode ? 'Acesse sua conta' : 'Crie sua conta';
        btnAuth.innerText = isLoginMode ? 'Entrar' : 'Cadastrar';
        toggleAuth.innerText = isLoginMode ? 'Criar conta grátis' : 'Voltar para o Login';
    });
}

// Lógica de Envio
if (authForm) {
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        btnAuth.disabled = true;
        btnAuth.innerText = 'Processando...';

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        try {
            if (isLoginMode) {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                window.location.href = 'perfil.html';
            } else {
                const { data, error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                alert('Verifique seu e-mail!');
            }
        } catch (err) {
            alert("Erro: " + err.message);
        } finally {
            btnAuth.disabled = false;
            btnAuth.innerText = isLoginMode ? 'Entrar' : 'Cadastrar';
        }
    });
}
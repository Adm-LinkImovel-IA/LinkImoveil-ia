// auth.js - Sistema de Autenticação LinkImóvel IA
(function() {
    // 1. CONFIGURAÇÃO (INSIRA SEUS DADOS AQUI)
    const SUPABASE_URL = 'https://xmjxfcwnytguwntvloja.supabase.co'; 
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtanhmY3dueXRndXdudHZsb2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMzA4MDEsImV4cCI6MjA4NTgwNjgwMX0.HSJbuCrnL7D3AlEpqlxq28yowHmUlqZyQSOCJRrmgOM'; 

    // 2. INICIALIZAÇÃO
    const { createClient } = window.supabase;
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // 3. ELEMENTOS DA INTERFACE
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const btnAuth = document.getElementById('btn-auth');
    const toggleAuth = document.getElementById('toggle-auth');
    const toggleText = document.getElementById('toggle-text');
    const authAlert = document.getElementById('auth-alert');
    let isLoginMode = true;

    // 4. VERIFICAR SESSÃO AO CARREGAR
    async function checkSession() {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) window.location.href = 'perfil.html';
    }
    checkSession();

    // 5. FUNÇÃO DE ERRO
    function showError(message) {
        authAlert.innerText = message;
        authAlert.style.display = 'block';
        setTimeout(() => { authAlert.style.display = 'none'; }, 5000);
    }

    // 6. ALTERNAR TELAS
    if (toggleAuth) {
        toggleAuth.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            authTitle.innerText = isLoginMode ? 'Acesse sua conta' : 'Crie sua conta de Corretor';
            btnAuth.innerText = isLoginMode ? 'Entrar no Sistema' : 'Finalizar Cadastro';
            toggleText.innerText = isLoginMode ? 'Ainda não tem acesso?' : 'Já possui uma conta?';
            toggleAuth.innerText = isLoginMode ? 'Solicitar Cadastro Grátis' : 'Voltar para o Login';
            authAlert.style.display = 'none';
        });
    }

    // 7. EVENTO DE SUBMISSÃO
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            btnAuth.disabled = true;
            btnAuth.innerText = 'Verificando...';

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            try {
                if (isLoginMode) {
                    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    window.location.href = 'perfil.html';
                } else {
                    const { data, error } = await supabase.auth.signUp({
                        email, 
                        password,
                        options: { data: { plano: 'FREE', role: 'USER' } }
                    });
                    if (error) throw error;
                    alert("Cadastro realizado! Verifique seu e-mail.");
                }
            } catch (err) {
                console.error("Erro:", err.message);
                alert("Erro: " + err.message);
                showError(err.message);
            } finally {
                btnAuth.disabled = false;
                btnAuth.innerText = isLoginMode ? 'Entrar no Sistema' : 'Finalizar Cadastro';
            }
        });
    }
})();

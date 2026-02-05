// auth.js - Versão Funcional 2026
(function() {
    // 1. CONFIGURAÇÃO (Coloque seus dados aqui)
    const SUPABASE_URL = 'SUA_URL_AQUI';
    const SUPABASE_KEY = 'SUA_KEY_AQUI';

    // 2. INICIALIZAÇÃO (Evitando conflito de nomes)
    if (!window.supabase) {
        console.error("Erro: Biblioteca do Supabase não carregada via CDN.");
        return;
    }
    
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // 3. MAPEAMENTO DE ELEMENTOS
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const btnAuth = document.getElementById('btn-auth');
    const toggleAuth = document.getElementById('toggle-auth');
    let isLoginMode = true;

    // 4. ALTERNAR TELAS
    if (toggleAuth) {
        toggleAuth.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            authTitle.innerText = isLoginMode ? 'Acesse sua conta' : 'Crie sua conta';
            btnAuth.innerText = isLoginMode ? 'Entrar' : 'Cadastrar';
            toggleAuth.innerText = isLoginMode ? 'Criar conta grátis' : 'Voltar para o Login';
        });
    }

    // 5. ENVIO DO FORMULÁRIO
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            btnAuth.disabled = true;
            btnAuth.innerText = 'Processando...';

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            try {
                if (isLoginMode) {
                    // LOGIN
                    const { data, error } = await supabaseClient.auth.signInWithPassword({
                        email: email,
                        password: password
                    });
                    if (error) throw error;
                    
                    alert("Sucesso! Entrando...");
                    window.location.href = 'perfil.html';
                } else {
                    // CADASTRO
                    const { data, error } = await supabaseClient.auth.signUp({
                        email: email,
                        password: password
                    });
                    if (error) throw error;
                    alert("Cadastro realizado! Verifique seu e-mail ou tente logar.");
                }
            } catch (err) {
                console.error("Erro detalhado:", err);
                alert("Erro: " + err.message);
            } finally {
                btnAuth.disabled = false;
                btnAuth.innerText = isLoginMode ? 'Entrar' : 'Cadastrar';
            }
        });
    }
})();

async function visualizarUsuario() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const token = localStorage.getItem('token');

    try {
        if (token && userId) {
            const response = await fetch(`http://localhost:8000/api/user/visualizar/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const usuario = data.user;

                document.getElementById('nome').textContent = usuario.name || 'Nome não disponível';
                document.getElementById('email').textContent = usuario.email || 'Email não disponível';
                
                const dataCriacao = new Date(usuario.created_at);
                const dataFormatada = dataCriacao.toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
                document.getElementById('dataCriacao').textContent = dataFormatada || 'Data inválida';
            } else {
                throw new Error('Erro ao buscar os dados do usuário');
            }
        } else {
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('mensagemErro').textContent = 'Erro ao carregar as informações do usuário.';
        document.getElementById('mensagemErro').classList.remove('d-none');
    }
}

document.addEventListener('DOMContentLoaded', visualizarUsuario);

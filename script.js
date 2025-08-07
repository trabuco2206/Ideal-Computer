
document.addEventListener('DOMContentLoaded', () => {
    // Esconde os botões "Avançar" por padrão
    const nextButtons = document.querySelectorAll('.next-step');
    nextButtons.forEach(btn => btn.style.display = 'none');

    // Lógica para o botão de início
    document.getElementById('start-btn').addEventListener('click', () => {
        switchScreen('intro', 'passo-1');
    });

    // Lógica para o botão de recomeçar
    document.querySelector('#resultado .btn.secondary').addEventListener('click', () => {
        switchScreen('resultado', 'intro');
        // Limpa as seleções e esconde os botões "Avançar" ao recomeçar
        document.querySelectorAll('.option-card').forEach(btn => btn.classList.remove('selected'));
        nextButtons.forEach(btn => btn.style.display = 'none');
    });

    // Lógica para lidar com os cliques nos cards de opção
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            const parentScreen = card.closest('.screen');
            const nextButton = parentScreen.querySelector('.next-step');

            // 1. Limpa qualquer seleção anterior na tela atual
            parentScreen.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));

            // 2. Marca o card clicado como selecionado
            card.classList.add('selected');

            // 3. Exibe o botão "Avançar" se ele existir na tela
            if (nextButton) {
                nextButton.style.display = 'block';
            }
        });
    });

    // Lógica para o botão "Avançar"
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentScreen = btn.closest('.screen');
            const selectedOption = currentScreen.querySelector('.option-card.selected');

            if (!selectedOption) {
                alert('Por favor, selecione uma opção.');
                return;
            }

            // Lógica de navegação dinâmica baseada na escolha
            let nextStepId = '';
            if (currentScreen.id === 'passo-1') {
                nextStepId = selectedOption.dataset.step;
            } else {
                // Após o segundo passo, o sistema leva para a tela de resultados
                nextStepId = 'resultado';
                mostrarResultado();
            }

            switchScreen(currentScreen.id, nextStepId);

            // Esconde o botão "Avançar" na próxima tela, se existir
            const nextScreen = document.getElementById(nextStepId);
            if (nextScreen) {
                const nextScreenNextButton = nextScreen.querySelector('.next-step');
                if (nextScreenNextButton) {
                    nextScreenNextButton.style.display = 'none';
                }
            }
        });
    });

    /**
     * Função para trocar a tela visível do aplicativo.
     * @param {string} fromId ID da tela atual.
     * @param {string} toId ID da próxima tela.
     */
    function switchScreen(fromId, toId) {
        document.getElementById(fromId).classList.remove('active');
        document.getElementById(toId).classList.add('active');
    }

    /**
     * Função que simula a montagem do PC e exibe os resultados.
     */
    function mostrarResultado() {
        const componentesContainer = document.getElementById('componentes-container');
        componentesContainer.innerHTML = '';

        // Simulação de dados para a montagem do PC
        const montagem = {
            'processador': { nome: 'AMD Ryzen 7 5700X', preco: 1500, motivo: 'Ótimo para jogos e multitarefas.' },
            'placa-de-video': { nome: 'NVIDIA GeForce RTX 4070', preco: 4500, motivo: 'Excelente desempenho em 4K e Ray Tracing para jogos como GTA V e Cyberpunk.' },
            'placa-mae': { nome: 'ASUS TUF GAMING B550-PLUS', preco: 900, motivo: 'Placa-mãe robusta e compatível.' },
            'memoria-ram': { nome: 'Corsair Vengeance RGB Pro 32GB', preco: 600, motivo: '32GB para garantir desempenho em jogos e renderização.' },
            'ssd': { nome: 'Samsung 980 Pro 1TB NVMe', preco: 700, motivo: 'Velocidade de carregamento incrível para jogos e sistema.' }
        };

        let precoTotal = 0;

        // Gera os cards de componentes
        for (const key in montagem) {
            const item = montagem[key];
            const itemHTML = `
                <div class="component-card-result">
                    <h4>${key.replace('-', ' ').toUpperCase()}</h4>
                    <p>${item.nome}</p>
                    <p class="motivo">${item.motivo}</p>
                    <span class="price">R$ ${item.preco.toFixed(2)}</span>
                </div>
            `;
            componentesContainer.innerHTML += itemHTML;
            precoTotal += item.preco;
        }

        document.getElementById('total-price').textContent = `R$ ${precoTotal.toFixed(2)}`;
    }
});

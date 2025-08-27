document.addEventListener('DOMContentLoaded', () => {

    // --- BANCO DE DADOS SIMULADO DE COMPONENTES ---
    // Cada componente tem um nível: 1 (Básico), 2 (Intermediário), 3 (Avançado)
    const componentesDB = {
        processador: [
            { nome: 'Intel Core i3-12100F', preco: 550, nivel: 1, motivo: 'Excelente custo-benefício para tarefas básicas e estudos.' },
            { nome: 'AMD Ryzen 5 5600', preco: 850, nivel: 2, motivo: 'Ótimo para jogos em Full HD e multitarefas.' },
            { nome: 'AMD Ryzen 7 7800X3D', preco: 2800, nivel: 3, motivo: 'Performance de ponta para jogos e alta produtividade.' }
        ],
        placaDeVideo: [
            { nome: 'Gráficos Integrados do Processador', preco: 0, nivel: 1, motivo: 'Suficiente para navegação, vídeos e pacote Office.' },
            { nome: 'NVIDIA GeForce RTX 3060 12GB', preco: 1900, nivel: 2, motivo: 'Performance sólida para jogos competitivos e trabalhos gráficos.' },
            { nome: 'NVIDIA GeForce RTX 4070 Super', preco: 4500, nivel: 3, motivo: 'Alto desempenho para jogos AAA em QHD/4K e renderização rápida.' }
        ],
        memoriaRam: [
            { nome: '8GB DDR4 3200MHz (1x8GB)', preco: 150, nivel: 1, motivo: 'Mínimo para um sistema fluido em tarefas cotidianas.' },
            { nome: '16GB DDR4 3200MHz (2x8GB)', preco: 300, nivel: 2, motivo: 'Padrão ideal para jogos e a maioria dos trabalhos.' },
            { nome: '32GB DDR5 5600MHz (2x16GB)', preco: 800, nivel: 3, motivo: 'Garante performance máxima em renderização, edição de vídeo e jogos pesados.' }
        ],
        armazenamento: [
            { nome: 'SSD 480GB SATA', preco: 200, nivel: 1, motivo: 'Velocidade e espaço essencial para o sistema e programas.' },
            { nome: 'SSD 1TB NVMe M.2', preco: 450, nivel: 2, motivo: 'Carregamento ultrarrápido para jogos e arquivos grandes.' },
            { nome: 'SSD 2TB NVMe Gen4', preco: 900, nivel: 3, motivo: 'Espaço de sobra com velocidade extrema para projetos profissionais.' }
        ],
        placaMae: [
            { nome: 'H610M (LGA 1700)', preco: 450, nivel: 1, motivo: 'Placa-mãe de entrada compatível e confiável.' },
            { nome: 'B550M (AM4)', preco: 700, nivel: 2, motivo: 'Placa-mãe robusta com bons recursos para upgrades.' },
            { nome: 'B650M (AM5)', preco: 1300, nivel: 3, motivo: 'Plataforma moderna com suporte a tecnologias de ponta.' }
        ],
        fonte: [
            { nome: 'Fonte 450W 80 Plus Bronze', preco: 250, nivel: 1, motivo: 'Energia segura e eficiente para configurações básicas.' },
            { nome: 'Fonte 650W 80 Plus Bronze', preco: 400, nivel: 2, motivo: 'Potência de sobra para placas de vídeo intermediárias.' },
            { nome: 'Fonte 750W 80 Plus Gold', preco: 650, nivel: 3, motivo: 'Alta eficiência e estabilidade para sistemas de alto desempenho.' }
        ]
    };

    // --- LÓGICA PRINCIPAL ---

    const nextButtons = document.querySelectorAll('.next-step');
    nextButtons.forEach(btn => btn.style.display = 'none');

    document.getElementById('start-btn').addEventListener('click', () => {
        switchScreen('intro', 'passo-1');
    });

    document.querySelector('#resultado .btn.secondary').addEventListener('click', () => {
        switchScreen('resultado', 'intro');
        document.querySelectorAll('.option-card').forEach(btn => btn.classList.remove('selected'));
        nextButtons.forEach(btn => btn.style.display = 'none');
        document.getElementById('componentes-container').innerHTML = '';
        document.getElementById('total-price').textContent = 'R$ 0,00';
    });

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            const parentScreen = card.closest('.screen');
            const nextButton = parentScreen.querySelector('.next-step');
            parentScreen.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            if (nextButton) {
                nextButton.style.display = 'inline-block';
            }
        });
    });

    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentScreen = btn.closest('.screen');
            const selectedOption = currentScreen.querySelector('.option-card.selected');

            if (!selectedOption) {
                alert('Por favor, selecione uma opção.');
                return;
            }

            let nextStepId = selectedOption.dataset.step;

            // Se a opção não tem um segundo passo (como Estudar), vai direto para o resultado
            if (currentScreen.id === 'passo-1' && (nextStepId === 'passo-2-estudos' || nextStepId === 'passo-2-criacao')) {
                mostrarResultado();
                switchScreen(currentScreen.id, 'resultado');
            } else if (currentScreen.id.startsWith('passo-2')) {
                // Se já estamos no segundo passo, o próximo é sempre o resultado
                mostrarResultado();
                switchScreen(currentScreen.id, 'resultado');
            } else {
                // Caso contrário, avança para o próximo passo de perguntas
                switchScreen(currentScreen.id, nextStepId);
                const nextScreen = document.getElementById(nextStepId);
                if (nextScreen) {
                    const nextScreenNextButton = nextScreen.querySelector('.next-step');
                    if (nextScreenNextButton) {
                        nextScreenNextButton.style.display = 'none';
                    }
                }
            }
        });
    });

    function switchScreen(fromId, toId) {
        document.getElementById(fromId)?.classList.remove('active');
        document.getElementById(toId)?.classList.add('active');
    }

    /**
     * Determina os níveis de performance necessários com base nas escolhas do usuário.
     * @returns {object} Um objeto com os níveis para cada tipo de componente.
     */
    function determinarNiveis() {
        const uso = document.querySelector('#passo-1 .option-card.selected')?.dataset.step;
        const detalheJogo = document.querySelector('#passo-2-jogos .option-card.selected')?.dataset.game;
        const detalheTrabalho = document.querySelector('#passo-2-trabalho .option-card.selected')?.dataset.work;

        let niveis = { cpu: 1, gpu: 1, ram: 1, ssd: 1, mae: 1, fonte: 1 }; // Configuração padrão/mínima

        switch (uso) {
            case 'passo-2-estudos':
                // Níveis padrão já são suficientes
                break;
            case 'passo-2-trabalho':
                switch (detalheTrabalho) {
                    case 'office':
                        niveis = { cpu: 1, gpu: 1, ram: 1, ssd: 1, mae: 1, fonte: 1 };
                        break;
                    case 'programacao':
                        niveis = { cpu: 2, gpu: 1, ram: 2, ssd: 2, mae: 2, fonte: 1 };
                        break;
                    case 'design':
                        niveis = { cpu: 2, gpu: 2, ram: 2, ssd: 2, mae: 2, fonte: 2 };
                        break;
                    case 'render':
                        niveis = { cpu: 3, gpu: 3, ram: 3, ssd: 3, mae: 3, fonte: 3 };
                        break;
                }
                break;
            case 'passo-2-criacao':
                niveis = { cpu: 3, gpu: 3, ram: 3, ssd: 2, mae: 3, fonte: 3 };
                break;
            case 'passo-2-jogos':
                switch (detalheJogo) {
                    case 'valorant':
                    case 'cs2':
                        niveis = { cpu: 2, gpu: 2, ram: 2, ssd: 2, mae: 2, fonte: 2 };
                        break;
                    case 'gtav':
                        niveis = { cpu: 2, gpu: 2, ram: 2, ssd: 2, mae: 2, fonte: 2 };
                        break;
                    case 'cyberpunk':
                        niveis = { cpu: 3, gpu: 3, ram: 3, ssd: 3, mae: 3, fonte: 3 };
                        break;
                }
                break;
        }
        return niveis;
    }

    /**
     * Monta o PC com base nos níveis de performance e exibe na tela de resultado.
     */
    function mostrarResultado() {
        const componentesContainer = document.getElementById('componentes-container');
        componentesContainer.innerHTML = '';

        const niveis = determinarNiveis();

        // Seleciona os componentes do "banco de dados" com base nos níveis
        const montagem = {
            'Processador': componentesDB.processador.find(c => c.nivel === niveis.cpu),
            'Placa de Vídeo': componentesDB.placaDeVideo.find(c => c.nivel === niveis.gpu),
            'Placa-Mãe': componentesDB.placaMae.find(c => c.nivel === niveis.mae),
            'Memória RAM': componentesDB.memoriaRam.find(c => c.nivel === niveis.ram),
            'Armazenamento': componentesDB.armazenamento.find(c => c.nivel === niveis.ssd),
            'Fonte': componentesDB.fonte.find(c => c.nivel === niveis.fonte)
        };

        let precoTotal = 0;

        for (const nomeComponente in montagem) {
            const item = montagem[nomeComponente];
            if (!item) continue; // Pula se algum componente não for encontrado

            const itemHTML = `
                <div class="component-card-result">
                    <h4>${nomeComponente.toUpperCase()}</h4>
                    <p>${item.nome}</p>
                    <p class="motivo">${item.motivo}</p>
                    <span class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                </div>
            `;
            componentesContainer.innerHTML += itemHTML;
            precoTotal += item.preco;
        }

        document.getElementById('total-price').textContent = `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
    }
});
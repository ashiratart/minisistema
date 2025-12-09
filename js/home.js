// ============================================
// VALIDAÇÃO DE ACESSO E CONFIGURAÇÃO INICIAL
// ============================================

window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - Iniciando validação...');
    
    // Primeiro, mostrar o conteúdo (mas escondido suavemente)
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Depois validar o hash
    validateAccessHash();
    
    // Configurar estilos iniciais
    setupInitialStyles();
});

// ============================================
// VALIDAÇÃO DO HASH DE ACESSO
// ============================================

function validateAccessHash() {
    const hash = window.location.hash.substring(1); // Remove o "#"
    
    console.log('Hash recebido:', hash); // Para debug
    
    // Verificar se existe hash e se tem 5 caracteres
    if (!hash || hash.length !== 5) {
        console.log('Hash inválido ou não existe');
        showAccessMessage('⛔ ACESSO NÃO AUTORIZADO', '#ff4444', 'Acesso direto não permitido. Redirecionando para o login...');
        redirectToLogin(2000);
        return;
    }
    
    // Verificar se o hash contém apenas caracteres permitidos
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*_-';
    let isValid = true;
    
    for (let i = 0; i < hash.length; i++) {
        if (!validChars.includes(hash[i])) {
            isValid = false;
            console.log('Caractere inválido encontrado:', hash[i]);
            break;
        }
    }
    
    if (!isValid) {
        console.log('Hash contém caracteres inválidos');
        showAccessMessage('🔒 HASH INVÁLIDO', '#ff9800', 'Token de acesso inválido. Redirecionando...');
        redirectToLogin(2000);
        return;
    }
    
    // Hash válido - carregar a página
    console.log('Hash válido! Acesso permitido.');
    loadPageContent();
}

// ============================================
// FUNÇÕES DE INTERFACE
// ============================================

function showAccessMessage(title, color, message) {
    console.log('Mostrando mensagem de acesso:', title);
    
    // Primeiro garantir que o conteúdo esteja visível
    document.body.style.opacity = '1';
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.id = 'access-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
    `;
    
    const titleEl = document.createElement('h1');
    titleEl.textContent = title;
    titleEl.style.cssText = `
        color: ${color};
        margin-bottom: 20px;
        font-size: 2rem;
    `;
    
    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        color: #ccc;
        font-size: 1.2rem;
        margin-bottom: 30px;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 5px solid #333;
        border-top: 5px solid ${color};
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    // Adicionar animação de spinner
    if (!document.getElementById('spin-animation')) {
        const style = document.createElement('style');
        style.id = 'spin-animation';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    overlay.appendChild(titleEl);
    overlay.appendChild(messageEl);
    overlay.appendChild(spinner);
    document.body.appendChild(overlay);
}

function redirectToLogin(delay) {
    setTimeout(() => {
        window.location.href = '../index.html';
    }, delay);
}

// ============================================
// CARREGAMENTO DA PÁGINA
// ============================================

function loadPageContent() {
    console.log('Carregando conteúdo da página...');
    
    // Remover qualquer overlay de bloqueio se existir
    const overlays = document.querySelectorAll('div[style*="position: fixed"]');
    overlays.forEach(overlay => {
        if (overlay.id === 'access-overlay') {
            overlay.remove();
        }
    });
    
    // Mostrar o conteúdo principal gradativamente
    setTimeout(() => {
        document.body.style.opacity = '1';
        console.log('Conteúdo da página agora visível');
    }, 300);
    
    // Carregar dados da página
    updateDate();
    setupEventListeners();
    
    // Carregar dados do usuário (simulado)
    loadUserData();
}

function setupInitialStyles() {
    console.log('Configurando estilos iniciais...');
    
    // Adicionar estilos dinâmicos
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
        .announcement-item, 
        .subject-card {
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .announcement-item:hover, 
        .subject-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .add-btn {
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .add-btn:hover {
            transform: scale(1.05);
        }
        .logout-btn {
            cursor: pointer;
            transition: background 0.2s ease;
        }
        .logout-btn:hover {
            background: #d32f2f !important;
        }
        
        /* Garantir que o conteúdo esteja visível após validação */
        body.validated {
            opacity: 1 !important;
        }
    `;
    
    // Não adicionar se já existe
    if (!document.getElementById('dynamic-styles')) {
        document.head.appendChild(style);
    }
}

// ============================================
// DADOS DO USUÁRIO E MATÉRIAS
// ============================================

// Simulação de dados do usuário
const userData = {
    id: 20231234,
    nome: "João Silva",
    turma: 8,
    ano: 2025
};

// Dados das matérias com identificadores do banco
const materias = {
    matematica: {
        id: "mat_tu*8_2025-12345",
        nome: "Matemática",
        professor: "Prof. Carlos Almeida",
        icone: "fas fa-calculator",
        horario: "Segunda e Quarta, 10h-12h",
        progresso: 75,
        cor: "math"
    },
    ciencias: {
        id: "cie_tu*8_2025-12346",
        nome: "Ciências",
        professor: "Prof. Ana Santos",
        icone: "fas fa-flask",
        horario: "Terça e Quinta, 8h-10h",
        progresso: 60,
        cor: "science"
    },
    historia: {
        id: "his_tu*8_2025-12347",
        nome: "História",
        professor: "Prof. Roberto Lima",
        icone: "fas fa-landmark",
        horario: "Quarta e Sexta, 14h-16h",
        progresso: 45,
        cor: "history"
    },
    portugues: {
        id: "por_tu*8_2025-12348",
        nome: "Língua Portuguesa",
        professor: "Prof. Maria Fernandes",
        icone: "fas fa-book",
        horario: "Segunda e Quinta, 13h-15h",
        progresso: 85,
        cor: "language"
    }
};

function loadUserData() {
    console.log('Carregando dados do usuário...');
    
    // Atualizar nome do usuário
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = userData.nome;
        console.log('Nome do usuário atualizado:', userData.nome);
    }
    
    // Atualizar avatar com iniciais
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        const initials = userData.nome.split(' ').map(n => n[0]).join('').toUpperCase();
        userAvatar.textContent = initials;
    }
    
    // Atualizar turma nas matérias
    document.querySelectorAll('.board-header .date').forEach((el, index) => {
        if (index === 1) { // Apenas no segundo board-header (Matérias)
            el.textContent = `${userData.turma}º Ano - ${userData.ano}`;
        }
    });
}

// ============================================
// MANIPULAÇÃO DE DATA
// ============================================

function updateDate() {
    console.log('Atualizando data...');
    
    const dateElements = document.querySelectorAll('.date');
    if (dateElements.length > 0) {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long',
            year: 'numeric'
        };
        const formattedDate = today.toLocaleDateString('pt-BR', options);
        
        // Formatar primeira letra como maiúscula
        const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        
        // Atualizar apenas o primeiro elemento (Quadro de Avisos)
        dateElements[0].textContent = capitalizedDate;
        
        console.log('Data atualizada:', capitalizedDate);
    }
}

// ============================================
// CONFIGURAÇÃO DE EVENT LISTENERS
// ============================================

function setupEventListeners() {
    console.log('Configurando event listeners...');
    
    setupLogoutButton();
    setupAddButtons();
    setupAnnouncementClicks();
    setupSubjectClicks();
    setupFooterLinks();
    
    console.log('Event listeners configurados com sucesso');
}

function setupLogoutButton() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (confirm('Deseja realmente sair do sistema?')) {
                // Adicionar efeito de saída
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SAINDO...';
                this.disabled = true;
                
                setTimeout(() => {
                    alert('Você foi desconectado. Redirecionando para o login...');
                    window.location.href = '../index.html';
                }, 1000);
            }
        });
        console.log('Botão de logout configurado');
    }
}

function setupAddButtons() {
    const addButtons = document.querySelectorAll('.add-btn');
    console.log('Encontrados', addButtons.length, 'botões de adicionar');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const section = this.closest('section');
            
            if (section.classList.contains('announcement-board')) {
                console.log('Clicou em Novo Aviso');
                showAddAnnouncementModal();
            } else {
                console.log('Clicou em Adicionar Matéria');
                showAddSubjectModal();
            }
        });
    });
}

function setupAnnouncementClicks() {
    const announcementItems = document.querySelectorAll('.announcement-item');
    console.log('Encontrados', announcementItems.length, 'itens de aviso');
    
    announcementItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const title = this.querySelector('.announcement-title')?.textContent || 'Aviso';
            const content = this.querySelector('.announcement-text')?.textContent || 'Sem conteúdo';
            const date = this.querySelector('.announcement-meta div:first-child')?.textContent || '';
            const priority = this.querySelector('.announcement-priority')?.textContent || '';
            
            console.log('Clicou no aviso:', title);
            showAnnouncementDetailModal(title, content, date, priority);
        });
    });
}

function setupSubjectClicks() {
    // Mapear os cards de matéria com seus identificadores
    const subjectCards = document.querySelectorAll('.subject-card');
    const materiasArray = Object.values(materias);
    
    console.log('Encontrados', subjectCards.length, 'cards de matéria');
    
    subjectCards.forEach((card, index) => {
        if (index < materiasArray.length) {
            const materia = materiasArray[index];
            
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Clicou na matéria:', materia.nome);
                console.log('ID da matéria:', materia.id);
                console.log('ID do aluno:', userData.id);
                
                // Redirecionar para a página da matéria com ID do aluno
                redirectToSubjectPage(materia.id, userData.id);
            });
            
            // Adicionar tooltip com o identificador
            card.title = `Clique para acessar ${materia.nome}`;
            card.dataset.materiaId = materia.id;
        }
    });
}

function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('footer a');
    console.log('Encontrados', footerLinks.length, 'links no rodapé');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#') {
                alert('Link em desenvolvimento. Em breve disponível.');
            } else {
                window.open(href, '_blank');
            }
        });
    });
}

// ============================================
// REDIRECIONAMENTO PARA MATÉRIAS
// ============================================

function redirectToSubjectPage(materiaId, alunoId) {
    console.log('Iniciando redirecionamento para matéria...');
    
    // Construir a URL com os parâmetros
    const url = `dic.html?materia=${encodeURIComponent(materiaId)}&aluno=${alunoId}`;
    console.log('URL de destino:', url);
    
    // Adicionar efeito de loading
    showLoadingMessage(`Redirecionando para a matéria...`);
    
    // Redirecionar após breve delay
    setTimeout(() => {
        console.log('Redirecionando para:', url);
        window.location.href = url;
    }, 800);
}

function showLoadingMessage(message) {
    console.log('Mostrando mensagem de loading:', message);
    
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9998;
        font-family: Arial, sans-serif;
        text-align: center;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 60px;
        height: 60px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    `;
    
    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        color: white;
        font-size: 1.1rem;
        max-width: 80%;
    `;
    
    overlay.appendChild(spinner);
    overlay.appendChild(messageEl);
    document.body.appendChild(overlay);
    
    // Remover após o redirecionamento
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 800);
}

// ============================================
// MODAIS E DIÁLOGOS
// ============================================

function showAddAnnouncementModal() {
    console.log('Abrindo modal de novo aviso');
    
    const modalHtml = `
        <div class="modal-overlay" id="announcementModal">
            <div class="modal-content">
                <h3><i class="fas fa-bullhorn"></i> Novo Aviso</h3>
                
                <div class="form-group">
                    <label for="announcementTitle">Título:</label>
                    <input type="text" id="announcementTitle" placeholder="Digite o título do aviso" maxlength="100">
                </div>
                
                <div class="form-group">
                    <label for="announcementContent">Conteúdo:</label>
                    <textarea id="announcementContent" placeholder="Digite o conteúdo do aviso..." rows="5" maxlength="500"></textarea>
                    <div class="char-count"><span id="charCount">0</span>/500 caracteres</div>
                </div>
                
                <div class="form-group">
                    <label for="announcementPriority">Prioridade:</label>
                    <select id="announcementPriority">
                        <option value="low">Baixa Prioridade</option>
                        <option value="medium">Média Prioridade</option>
                        <option value="high">Alta Prioridade</option>
                    </select>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-cancel">Cancelar</button>
                    <button class="btn-confirm">Publicar Aviso</button>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
    
    // Estilos do modal
    const styleId = 'modal-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .modal-content {
                background: white;
                padding: 25px;
                border-radius: 12px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .modal-content h3 {
                margin-bottom: 20px;
                color: #333;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #555;
            }
            .form-group input,
            .form-group textarea,
            .form-group select {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
                transition: border 0.3s;
                box-sizing: border-box;
            }
            .form-group input:focus,
            .form-group textarea:focus,
            .form-group select:focus {
                border-color: #3498db;
                outline: none;
            }
            .char-count {
                text-align: right;
                font-size: 12px;
                color: #777;
                margin-top: 5px;
            }
            .modal-actions {
                display: flex;
                justify-content: flex-end;
                gap: 15px;
                margin-top: 25px;
            }
            .modal-actions button {
                padding: 12px 25px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.2s;
            }
            .btn-cancel {
                background: #f1f1f1;
                color: #333;
            }
            .btn-cancel:hover {
                background: #e0e0e0;
            }
            .btn-confirm {
                background: #2ecc71;
                color: white;
            }
            .btn-confirm:hover {
                background: #27ae60;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Contador de caracteres
    const textarea = modalContainer.querySelector('#announcementContent');
    const charCount = modalContainer.querySelector('#charCount');
    
    textarea.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });
    
    // Event listeners do modal
    modalContainer.querySelector('.btn-cancel').addEventListener('click', function() {
        document.body.removeChild(modalContainer);
    });
    
    modalContainer.querySelector('.btn-confirm').addEventListener('click', function() {
        const title = document.getElementById('announcementTitle').value.trim();
        const content = document.getElementById('announcementContent').value.trim();
        const priority = document.getElementById('announcementPriority').value;
        
        if (!title || !content) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Simular publicação
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PUBLICANDO...';
        this.disabled = true;
        
        setTimeout(() => {
            alert('Aviso publicado com sucesso!');
            document.body.removeChild(modalContainer);
        }, 1500);
    });
    
    // Fechar modal ao clicar fora
    modalContainer.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            document.body.removeChild(modalContainer);
        }
    });
}

function showAddSubjectModal() {
    alert('Funcionalidade para adicionar nova matéria será implementada aqui.\nEntre em contato com a secretaria da escola.');
}

function showAnnouncementDetailModal(title, content, date, priority) {
    console.log('Mostrando detalhes do aviso:', title);
    
    const priorityColors = {
        'Alta Prioridade': '#ff4444',
        'Média Prioridade': '#ff9800',
        'Baixa Prioridade': '#4CAF50'
    };
    
    const modalHtml = `
        <div class="modal-overlay">
            <div class="modal-content" style="max-width: 600px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h3 style="margin: 0;">${title}</h3>
                    <span style="background: ${priorityColors[priority] || '#777'}; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px;">
                        ${priority}
                    </span>
                </div>
                
                <div style="color: #666; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                    <i class="far fa-calendar"></i> ${date}
                </div>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    ${content}
                </div>
                
                <div style="text-align: right;">
                    <button class="btn-cancel">Fechar</button>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
    
    // Adicionar estilo para o botão cancelar
    setTimeout(() => {
        const btn = modalContainer.querySelector('.btn-cancel');
        if (btn) {
            btn.style.cssText = `
                padding: 10px 20px;
                background: #3498db;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
            `;
        }
    }, 10);
    
    // Fechar modal
    modalContainer.querySelector('.btn-cancel').addEventListener('click', function() {
        document.body.removeChild(modalContainer);
    });
    
    // Fechar ao clicar fora
    modalContainer.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            document.body.removeChild(modalContainer);
        }
    });
}

// ============================================
// ATUALIZAÇÃO AUTOMÁTICA DE DATA
// ============================================

// Atualizar a data a cada hora
setInterval(updateDate, 3600000);

// ============================================
// DEBUG E LOGS
// ============================================

// Função para verificar se tudo está carregando corretamente
function checkPageLoad() {
    console.log('=== VERIFICAÇÃO DE CARREGAMENTO ===');
    console.log('Body opacity:', document.body.style.opacity);
    console.log('Hash na URL:', window.location.hash);
    console.log('Elementos de data encontrados:', document.querySelectorAll('.date').length);
    console.log('Cards de matéria encontrados:', document.querySelectorAll('.subject-card').length);
    console.log('Itens de aviso encontrados:', document.querySelectorAll('.announcement-item').length);
    console.log('=== FIM DA VERIFICAÇÃO ===');
}

// Executar verificação após um tempo
setTimeout(checkPageLoad, 1000);
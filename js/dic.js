     // Navegação entre as tabs de conteúdo
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover classe active de todas as tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Adicionar classe active na tab clicada
                button.classList.add('active');
                
                // Mostrar o conteúdo correspondente
                const tabId = button.getAttribute('data-tab');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
        
        // Simular ações de botões
        document.querySelectorAll('.add-btn').forEach(button => {
            button.addEventListener('click', function() {
                const section = this.closest('section');
                
                if (section.classList.contains('content-board')) {
                    alert('Funcionalidade para adicionar novo conteúdo será implementada aqui.');
                } else if (section.classList.contains('notices-board')) {
                    alert('Funcionalidade para adicionar novo aviso será implementada aqui.');
                } else if (section.classList.contains('exams-board')) {
                    alert('Funcionalidade para adicionar nova prova será implementada aqui.');
                }
            });
        });
        
        // Ações nos conteúdos
        document.querySelectorAll('.action-btn.download').forEach(button => {
            button.addEventListener('click', function() {
                const contentItem = this.closest('.content-item');
                const contentTitle = contentItem.querySelector('.content-title').textContent;
                alert(`Iniciando download: "${contentTitle}"`);
            });
        });
        
        document.querySelectorAll('.action-btn.play').forEach(button => {
            button.addEventListener('click', function() {
                const contentItem = this.closest('.content-item');
                const contentTitle = contentItem.querySelector('.content-title').textContent;
                alert(`Reproduzindo vídeo: "${contentTitle}"`);
            });
        });
        
        document.querySelectorAll('.action-btn:not(.download):not(.play)').forEach(button => {
            button.addEventListener('click', function() {
                const contentItem = this.closest('.content-item');
                const contentTitle = contentItem.querySelector('.content-title').textContent;
                alert(`Visualizando: "${contentTitle}"`);
            });
        });
        
        // Links das provas
        document.querySelectorAll('.exam-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const examItem = this.closest('.exam-item');
                const examTitle = examItem.querySelector('.exam-title').textContent;
                alert(`Abrindo detalhes da prova: "${examTitle}"`);
            });
        });
        
        // Atualizar data da próxima prova
        const today = new Date();
        const upcomingExams = document.querySelectorAll('.exam-item.upcoming');
        
        if (upcomingExams.length > 0) {
            const nextExamDate = upcomingExams[0].querySelector('.exam-date');
            // Simular data futura
            const futureDate = new Date(today);
            futureDate.setDate(futureDate.getDate() + 7);
            const formattedDate = futureDate.toLocaleDateString('pt-BR');
            nextExamDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${formattedDate}`;
        }
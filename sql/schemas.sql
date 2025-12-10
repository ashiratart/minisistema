-- 認証システムとアクセスレベルを含むユーザーテーブル
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL, -- パスワードのハッシュを保存
    nivel_acesso TINYINT NOT NULL DEFAULT 4, 
    matricula VARCHAR(20) UNIQUE, -- 学生と教員用
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,
    ultimo_login DATETIME,
    
    -- ユーザータイプ別の特定フィールド
    telefone VARCHAR(20),
    data_nascimento DATE,
    
    -- キーとインデックス
    INDEX idx_email (email),
    INDEX idx_nivel (nivel_acesso),
    INDEX idx_matricula (matricula)
);

-- 科目一覧表
CREATE TABLE disciplinas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    carga_horaria INT NOT NULL, 
    semestre TINYINT, 
    ano YEAR NOT NULL,
    ativa BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
   
    professor_id INT,
    
    -- 外部キー
    FOREIGN KEY (professor_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    
    -- インデックス
    INDEX idx_codigo (codigo),
    INDEX idx_ano_semestre (ano, semestre)
);

-- 登録テーブル（学生と科目の関係）
CREATE TABLE matriculas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    data_matricula DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativo', 'concluido', 'trancado', 'reprovado') DEFAULT 'ativo',
    nota_final DECIMAL(4,2), 
    frequencia DECIMAL(5,2), 
    
    -- 外部キー
    FOREIGN KEY (aluno_id) REFERENCES usuarios(id),
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    
    -- 制約
    UNIQUE KEY uk_aluno_disciplina (aluno_id, disciplina_id),
    
    -- インデックス
    INDEX idx_aluno (aluno_id),
    INDEX idx_disciplina (disciplina_id),
    INDEX idx_status (status)
);

-- 試験テーブル
CREATE TABLE provas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    disciplina_id INT NOT NULL,
    professor_id INT NOT NULL, -- 試験を作成した人
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo ENUM('prova', 'trabalho', 'simulado', 'outro') DEFAULT 'prova',
    valor DECIMAL(5,2) NOT NULL, -- 試験の価値（例：10.00点）
    data_prova DATE NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    local VARCHAR(100),
    instrucoes TEXT,
    
    -- 外部キー
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    FOREIGN KEY (professor_id) REFERENCES usuarios(id),
    
    -- インデックス
    INDEX idx_disciplina_data (disciplina_id, data_prova),
    INDEX idx_professor (professor_id)
);

-- 試験結果テーブル
CREATE TABLE notas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prova_id INT NOT NULL,
    aluno_id INT NOT NULL,
    nota DECIMAL(5,2), 
    data_lancamento DATETIME DEFAULT CURRENT_TIMESTAMP,
    lancado_por INT, -- 誰が成績を入力したか
    observacoes TEXT,
    
    -- 外部キー
    FOREIGN KEY (prova_id) REFERENCES provas(id) ON DELETE CASCADE,
    FOREIGN KEY (aluno_id) REFERENCES usuarios(id),
    FOREIGN KEY (lancado_por) REFERENCES usuarios(id),
    
    -- 制約
    UNIQUE KEY uk_prova_aluno (prova_id, aluno_id),
    
    -- インデックス
    INDEX idx_prova (prova_id),
    INDEX idx_aluno (aluno_id)
);

-- 出席テーブル
CREATE TABLE frequencias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    disciplina_id INT NOT NULL,
    aluno_id INT NOT NULL,
    data_aula DATE NOT NULL,
    presente BOOLEAN DEFAULT TRUE,
    justificativa TEXT,
    
    -- 外部キー
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    FOREIGN KEY (aluno_id) REFERENCES usuarios(id),
    
    -- 制約
    UNIQUE KEY uk_disciplina_aluno_data (disciplina_id, aluno_id, data_aula),
    
    -- インデックス
    INDEX idx_aluno_disciplina (aluno_id, disciplina_id),
    INDEX idx_data (data_aula)
);

-- ログ/監査テーブル（オプションだが推奨）
CREATE TABLE logs_acesso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    acao VARCHAR(50) NOT NULL,
    descricao TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    data_log DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_usuario_data (usuario_id, data_log)
);

CREATE TABLE recuperacao_senha (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    expira_em DATETIME NOT NULL,
    utilizado BOOLEAN DEFAULT FALSE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    INDEX idx_token (token)
);
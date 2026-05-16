window.ModuloGerador = {
    gerar: function(num) {
        return `// IA Code #${num} [Módulo 0 - Express API]\nconst express = require('express');\nconst app = express();\nconst PORT = ${3000 + num};\n\napp.get('/status', (req, res) => {\n    res.json({ online: true, worker: ${num} });\n});\n\napp.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));`;
    }
};

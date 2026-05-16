window.ModuloGerador = {
    gerar: function(num) {
        return `// IA Code #${num} [Módulo 4 - File Validation]\nconst fs = require('fs');\n\nfunction validarArquivo_${num}(caminho) {\n    if (!fs.existsSync(caminho)) return false;\n    const conteudo = fs.readFileSync(caminho, 'utf-8');\n    const regexID = /ID_CODE_${num}/g;\n    return regexID.test(conteudo);\n}`;
    }
};

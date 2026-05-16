window.ModuloGerador = {
    gerar: function(num) {
        return `// IA Code #${num} [Módulo 5 - JWT Auth]\nconst jwt = require('jsonwebtoken');\n\nfunction gerarToken_${num}(usuario) {\n    const payload = { id: usuario.id, permissao: "user_${num}" };\n    const secretKey = process.env.JWT_SECRET || 'chave_secreta_${num}';\n    return jwt.sign(payload, secretKey, { expiresIn: '1h' });\n}`;
    }
};

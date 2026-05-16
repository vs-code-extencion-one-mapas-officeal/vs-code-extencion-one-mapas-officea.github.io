window.ModuloGerador = {
    gerar: function(num) {
        return `// IA Code #${num} [Módulo 8 - SQL Query Builder]\nfunction construirQuery_${num}(tabela, idUsuario) {\n    return {\n        text: \`SELECT * FROM \${tabela} WHERE user_id = $1 AND code_version = $2\`, \n        values: [idUsuario, ${num}]\n    };\n}`;
    }
};

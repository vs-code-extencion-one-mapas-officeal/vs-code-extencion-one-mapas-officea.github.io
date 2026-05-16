window.ModuloGerador = {
    gerar: function(num) {
        return `// IA Code #${num} [Módulo 9 - Date Utils]\nfunction formatarDataRegistro_${num}() {\n    const data = new Date();\n    return {\n        ISO: data.toISOString(),\n        local: data.toLocaleString('pt-BR'),\n        timestamp_ia: data.getTime() + ${num}\n    };\n}`;
    }
};

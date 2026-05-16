window.ModuloGerador = {
    gerar: function(num) {
        return `// IA Code #${num} [Módulo 6 - Fetch API Async]\nasync function requisitarDados_${num}() {\n    try {\n        const res = await fetch('https://api.onemapas.com/v2/codes/${num}');\n        if (!res.ok) throw new Error('Falha no status HTTP');\n        return await res.json();\n    } catch (err) {\n        console.error('Erro no fetch #${num}:', err.message);\n    }\n}`;
    }
};

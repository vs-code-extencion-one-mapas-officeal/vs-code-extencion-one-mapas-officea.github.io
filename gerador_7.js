window.ModuloGerador = {
    gerar: function(num) {
        return `// IA Code #${num} [Módulo 7 - Array Map/Filter]\nconst limparColecao_${num} = (listaDeObjetos) => {\n    return listaDeObjetos\n        .filter(obj => obj.ativo === true)\n        .map(obj => ({ id: obj.id, chaveSegura: obj.token + "_${num}" }));\n};`;
    }
};

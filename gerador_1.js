window.ModuloGerador = {
    gerar: function(num) {
        return `// IA Code #${num} [Módulo 1 - MongoDB Connection]\nconst mongoose = require('mongoose');\n\nconst schema_${num} = new mongoose.Schema({\n    id_requisicao: Number,\n    dados: String\n});\n\nconst Model_${num} = mongoose.model('Colecao_${num}', schema_${num});`;
    }
};

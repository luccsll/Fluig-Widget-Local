// Dados fictícios no mesmo formato que o getDataset retorna no Fluig.
// Só para o ambiente local: não vai para o Fluig.
window.MOCK = {
    colleague: {
        columns: [
            'colleaguePK.companyId', 'colleaguePK.colleagueId', 'colleagueName', 'mail', 'login',
            'active', 'adminUser', 'emailHtml', 'defaultLanguage', 'volumeId', 'maxPrivateSize',
            'currentProject', 'extensionNr', 'especializationArea', 'groupId', 'userTenantId'
        ],
        values: [
            usuario('admin', 'Admin Fluig', 'admin@exemplo.com.br', 'admin', 'true', 'true', '', 3),
            usuario('204518', 'Lucas Lima.dev', 'lucaslima@exemplo.com.br', 'lucas.lima', 'true', 'false', '204518', 4),
            usuario('317642', 'Bruno Henrique Lima', 'bruno.lima@exemplo.com.br', 'bruno.lima', 'true', 'false', '317642', 5),
            usuario('carladias', 'Carla Dias', 'carla.dias@exemplo.com.br', 'carla.dias', 'true', 'false', '', 6),
            usuario('diegoalves', 'Diego Alves Ribeiro', 'diego.alves@exemplo.com.br', 'diego.alves', 'true', 'false', '128403', 7),
            usuario('elisarocha', 'Elisa Rocha', 'elisa.rocha@exemplo.com.br', 'elisa.rocha', 'false', 'false', '', 8),
            usuario('128404', 'Fábio Nunes de Castro', 'fabio.nunes@exemplo.com.br', 'fabio.nunes', 'true', 'false', '128404', 9),
            usuario('135790', 'Gabriela Melo', 'gabriela.melo@exemplo.com.br', 'gabriela.melo', 'true', 'false', '135790', 10)
        ]
    }
};

// Monta uma linha do dataset colleague com todas as colunas
function usuario(id, nome, email, login, ativo, admin, matricula, tenant) {
    return {
        'colleaguePK.companyId': '1',
        'colleaguePK.colleagueId': id,
        colleagueName: nome,
        mail: email,
        login: login,
        active: ativo,
        adminUser: admin,
        emailHtml: 'true',
        defaultLanguage: 'pt_BR',
        volumeId: '',
        maxPrivateSize: '',
        currentProject: matricula,
        extensionNr: '',
        especializationArea: '',
        groupId: '',
        userTenantId: String(tenant)
    };
}

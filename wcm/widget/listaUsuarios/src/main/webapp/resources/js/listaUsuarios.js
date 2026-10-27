var MyWidget = SuperWidget.extend({

    bindings: {
        local: {
            'atualizar': ['click_atualizar']
        }
    },

    init: function () {
        this.carregar();
    },

    atualizar: function () {
        this.carregar();
        FLUIGC.toast({ title: '', message: 'Lista atualizada.', type: 'success' });
    },

    carregar: function () {
        var ativos = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
        var ds = DatasetFactory.getDataset('colleague', null, [ativos], null);

        var html = ds.values.map(function (usuario) {
            return '<tr>' +
                '<td>' + usuario.colleagueName + '</td>' +
                '<td>' + usuario.login + '</td>' +
                '<td>' + usuario.mail + '</td>' +
                '<td>' + (usuario.currentProject || '—') + '</td>' +
                '</tr>';
        }).join('');

        $('#tabelaUsuarios_' + this.instanceId + ' tbody').html(html);
    }
});

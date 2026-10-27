// Simula, no navegador, o que o Fluig fornece para a widget.
// Só para o ambiente local: não vai para o Fluig.
// Carregue depois do jQuery e do preview.mock.js, e antes do JS da widget.

(function () {

    // ------------------------------------------------------------ SuperWidget
    // extend() devolve um construtor. instance() cria a widget, liga os
    // bindings.local (ex.: data-atualizar -> click_atualizar) e chama o init().
    window.SuperWidget = {
        extend: function (proto) {
            function Widget(props) {
                $.extend(this, props);
            }

            $.extend(Widget.prototype, proto);

            Widget.instance = function (props) {
                var widget = new Widget(props);
                var locais = (proto.bindings && proto.bindings.local) || {};

                Object.keys(locais).forEach(function (acao) {
                    locais[acao].forEach(function (binding) {
                        var partes = binding.split('_');
                        var evento = partes[0];
                        var metodo = partes.slice(1).join('_');

                        $(document).on(evento, '[data-' + acao + ']', function (event) {
                            widget[metodo](this, event);
                        });
                    });
                });

                widget.init();
                return widget;
            };

            return Widget;
        }
    };

    // ------------------------------------------------------------ Globais do Fluig
    window.ConstraintType = { MUST: 'MUST', SHOULD: 'SHOULD', MUST_NOT: 'MUST_NOT' };

    window.WCMAPI = {
        getUser: function () { return 'usuario.teste'; }
    };

    window.FLUIGC = {
        toast: function (opts) {
            console.log('[FLUIGC.toast:' + opts.type + ']', opts.message);
        }
    };

    // ------------------------------------------------------------ DatasetFactory
    // Devolve os dados do preview.mock.js. Aplica só filtros MUST por igualdade,
    // o suficiente para testar a interface.
    window.DatasetFactory = {
        createConstraint: function (campo, inicial, final, tipo) {
            return { campo: campo, inicial: inicial, final: final, tipo: tipo };
        },

        getDataset: function (nome, campos, constraints) {
            var ds = window.MOCK[nome];

            if (!ds) {
                console.warn('Sem dados fictícios para o dataset ' + nome);
                return { columns: [], values: [] };
            }

            var values = ds.values.filter(function (linha) {
                return (constraints || []).every(function (c) {
                    return c.tipo !== ConstraintType.MUST || !(c.campo in linha) || linha[c.campo] == c.inicial;
                });
            });

            return { columns: ds.columns, values: values };
        }
    };

    // ------------------------------------------------------------ Inicialização
    // No Fluig, o data-params="MyWidget.instance()" faz isso. Aqui a widget é
    // criada à mão, com o mesmo instanceId usado no id do HTML.
    $(function () {
        window.widgetLocal = MyWidget.instance({ instanceId: 'local' });
    });
})();

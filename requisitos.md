Requisitos do Sistema

1. Requisitos Funcionais


RF01 - Criar tarefas

O sistema deve permitir que o usuario cadastre novas tarefas escolares. 
Para cadastrar uma tarefa, o usuario deve informar o titulo da tarefa, a materia e o prazo de entrega. Apos o cadastro, a tarefa deve ser armazenada e aparecer na listagem de tarefas.


RF02 - Listar tarefas

O sistema deve permitir que o usuario visualize as tarefas cadastradas. 
A listagem deve apresentar as informacoes das tarefas de forma organizada, permitindo que o usuario acompanhe suas atividades escolares.


RF03 - Concluir tarefas

O sistema deve permitir que o usuario marque uma tarefa como concluida. 
Ao realizar essa acao, o status da tarefa deve ser atualizado para indicar que a atividade ja foi realizada.


RF04 - Remover tarefas

O sistema deve permitir que o usuario remova uma tarefa cadastrada. 
Ao excluir uma tarefa, ela deve deixar de aparecer na listagem do sistema.


RF05 - Editar tarefas

O sistema deve permitir que o usuario edite uma tarefa ja cadastrada. 
O usuario podera alterar as informacoes da tarefa, como titulo, materia e prazo. Apos a alteracao, os novos dados devem ser atualizados no sistema.


RF06 - Filtrar tarefas por materia

O sistema deve permitir que o usuario filtre as tarefas cadastradas de acordo com a materia. 
Ao selecionar uma materia, o sistema deve apresentar as tarefas relacionadas a ela. Esse recurso deve facilitar a organizacao e a visualizacao das atividades escolares.

RF07 - Cadastrar usuário

O sistema deve permitir que o usuário realize seu cadastro para criar uma conta de acesso. Para realizar o cadastro, o usuário deve informar os dados solicitados pelo sistema, incluindo nome, e-mail e senha. O sistema deve validar o preenchimento dos campos obrigatórios e, após o cadastro ser realizado com sucesso, os dados do usuário devem ser armazenados para permitir seu acesso ao sistema.


RF08 - Realizar login

O sistema deve permitir que o usuário realize login em sua conta por meio de e-mail e senha. Ao enviar os dados de acesso, o sistema deve verificar se as credenciais informadas são válidas. Caso os dados estejam corretos, o sistema deve permitir o acesso às funcionalidades do sistema. Caso contrário, o sistema deve informar que as credenciais são inválidas e não permitir o acesso.


RF09 - Acessar as telas de cadastro e login

O sistema deve permitir que o usuário, a partir da tela inicial de boas-vindas, escolha entre realizar o cadastro ou acessar uma conta existente. Para isso, a tela deve disponibilizar opções de navegação para a tela de cadastro e para a tela de login, direcionando o usuário para a funcionalidade selecionada.


2. Requisitos Nao Funcionais

RNF01 - Tecnologia de Frontend

O frontend do sistema deve ser desenvolvido utilizando a tecnologia NextJS.


RNF02 - Integracao entre Frontend e Backend

O sistema deve possuir integracao entre o frontend e o backend para permitir o funcionamento das operacoes relacionadas as tarefas. 
O frontend sera responsavel pela interacao com o usuario, enquanto o backend sera responsavel pelo processamento das informacoes.


RNF03 - Facilidade de uso

O sistema deve possuir uma interface simples, organizada e facil de utilizar. 
As funcionalidades devem ser apresentadas de maneira clara para facilitar a utilizacao por parte dos estudantes.


3. Regras de Negocio

RN01 - Informacoes obrigatorias da tarefa

Toda tarefa cadastrada no sistema deve conter obrigatoriamente titulo, materia e prazo. 
O sistema nao deve permitir o cadastro de uma tarefa caso algum desses campos esteja vazio.

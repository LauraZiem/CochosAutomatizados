CREATE DATABASE proj_cochos;

CREATE TABLE usuario (
    id int primary key,
    login varchar(50) not null,
    senha varchar(50)not null
);

CREATE TABLE cocho (
    id int primary key,
    nome varchar(50) not null,
    estoque float not null,
    id_usuario int,
    foreign key (id_usuario) references usuario(id)
);

CREATE TABLE entidade (
    id_usuario int,
    id_cocho int,
    foreign key (id_usuario) references usuario(id),
    foreign key (id_cocho) references cocho(id)
);

CREATE TABLE ativacao (
    id int primary key,
    status_liberacao varchar(50) not null,
    quantidade_ativacao float not null,
    horario_ativacao timestamp not null,
    id_cocho int,
    foreign key (id_cocho) references cocho(id)
);

CREATE TABLE historico (
    id int primary key,
    id_ativacao int,
    id_cocho int,
    mensagem varchar(50) not null,
    foreign key (id_ativacao) references ativacao(id),
    foreign key (id_cocho) references cocho(id)
    
)
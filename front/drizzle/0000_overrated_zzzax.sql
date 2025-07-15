CREATE TABLE `empresa` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`razao_social` varchar(255) NOT NULL,
	`cnpj` varchar(20) NOT NULL,
	`cep` varchar(10) NOT NULL,
	`cidade` varchar(100) NOT NULL,
	`estado` varchar(50) NOT NULL,
	`bairro` varchar(100) NOT NULL,
	`complemento` varchar(255) NOT NULL,
	CONSTRAINT `empresa_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `licenca` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`empresa_id` int,
	`numero` varchar(100) NOT NULL,
	`orgao` varchar(100) NOT NULL,
	`emissao` date NOT NULL,
	`validade` date NOT NULL,
	CONSTRAINT `licenca_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `licenca` ADD CONSTRAINT `licenca_empresa_id_empresa_id_fk` FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`id`) ON DELETE no action ON UPDATE no action;
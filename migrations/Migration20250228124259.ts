/* eslint-disable */

// This file was generated via custom migration generator

import { Migration } from '@mikro-orm/migrations';

export class Migration20250228124259 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`car\` (
                   \`id\` int unsigned not null auto_increment primary key,
                   \`created_at\` datetime null,
                   \`updated_at\` datetime null,
                   \`brand\` varchar(255) not null,
                   \`model\` varchar(255) not null,
                   \`year\` varchar(4) not null,
                   \`km\` int not null,
                   \`is_available\` tinyint(1) not null default true
                 ) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`customer\` (
                   \`id\` int unsigned not null auto_increment primary key,
                   \`created_at\` datetime null,
                   \`updated_at\` datetime null,
                   \`name\` varchar(255) not null,
                   \`surname\` varchar(255) not null,
                   \`birthdate\` date not null
                 ) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`rental\` (
                   \`id\` int unsigned not null auto_increment primary key,
                   \`created_at\` datetime null,
                   \`updated_at\` datetime null,
                   \`rent_date\` date null
                 ) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`customer_cars\` (
                   \`customer_id\` int unsigned not null,
                   \`rental_id\` int unsigned not null,
                   primary key (\`customer_id\`, \`rental_id\`)
                 ) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`customer_cars\`
                 add index \`customer_cars_customer_id_index\` (\`customer_id\`);`);
    this.addSql(`alter table \`customer_cars\`
                 add index \`customer_cars_rental_id_index\` (\`rental_id\`);`);

    this.addSql(`create table \`car_customers\` (
                   \`car_id\` int unsigned not null,
                   \`rental_id\` int unsigned not null,
                   primary key (\`car_id\`, \`rental_id\`)
                 ) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`car_customers\`
                 add index \`car_customers_car_id_index\` (\`car_id\`);`);
    this.addSql(`alter table \`car_customers\`
                 add index \`car_customers_rental_id_index\` (\`rental_id\`);`);

    this.addSql(`alter table \`customer_cars\`
                 add constraint \`customer_cars_customer_id_foreign\` foreign key (\`customer_id\`) references \`customer\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`customer_cars\`
                 add constraint \`customer_cars_rental_id_foreign\` foreign key (\`rental_id\`) references \`rental\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`car_customers\`
                 add constraint \`car_customers_car_id_foreign\` foreign key (\`car_id\`) references \`car\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`car_customers\`
                 add constraint \`car_customers_rental_id_foreign\` foreign key (\`rental_id\`) references \`rental\` (\`id\`) on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`car_customers\`
                 drop foreign key \`car_customers_car_id_foreign\`;`);

    this.addSql(`alter table \`customer_cars\`
                 drop foreign key \`customer_cars_customer_id_foreign\`;`);

    this.addSql(`alter table \`customer_cars\`
                 drop foreign key \`customer_cars_rental_id_foreign\`;`);

    this.addSql(`alter table \`car_customers\`
                 drop foreign key \`car_customers_rental_id_foreign\`;`);

    this.addSql(`drop table if exists \`car\`;`);

    this.addSql(`drop table if exists \`customer\`;`);

    this.addSql(`drop table if exists \`rental\`;`);

    this.addSql(`drop table if exists \`customer_cars\`;`);

    this.addSql(`drop table if exists \`car_customers\`;`);
  }

}

/* eslint-disable */

// This file was generated via custom migration generator

import { Migration } from '@mikro-orm/migrations';

export class Migration20250216184159 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`car\` (
                   \`id\` integer not null primary key autoincrement,
                   \`created_at\` datetime null,
                   \`updated_at\` datetime null,
                   \`brand\` text not null,
                   \`model\` text not null,
                   \`year\` text not null,
                   \`km\` integer not null,
                   \`is_available\` integer not null default true
                 );`);

    this.addSql(`create table \`customer\` (
                   \`id\` integer not null primary key autoincrement,
                   \`created_at\` datetime null,
                   \`updated_at\` datetime null,
                   \`name\` text not null,
                   \`surname\` text not null,
                   \`birthdate\` date not null
                 );`);

    this.addSql(`create table \`rental\` (
                   \`id\` integer not null primary key autoincrement,
                   \`created_at\` datetime null,
                   \`updated_at\` datetime null,
                   \`rent_date\` date null
                 );`);

    this.addSql(`create table \`customer_cars\` (
                   \`customer_id\` integer not null,
                   \`rental_id\` integer not null,
                   constraint \`customer_cars_customer_id_foreign\` foreign key (\`customer_id\`) references \`customer\` (\`id\`) on delete cascade on update cascade,
                   constraint \`customer_cars_rental_id_foreign\` foreign key (\`rental_id\`) references \`rental\` (\`id\`) on delete cascade on update cascade,
                   primary key (\`customer_id\`, \`rental_id\`)
                 );`);
    this.addSql(`create index \`customer_cars_customer_id_index\` on \`customer_cars\` (\`customer_id\`);`);
    this.addSql(`create index \`customer_cars_rental_id_index\` on \`customer_cars\` (\`rental_id\`);`);

    this.addSql(`create table \`car_customers\` (
                   \`car_id\` integer not null,
                   \`rental_id\` integer not null,
                   constraint \`car_customers_car_id_foreign\` foreign key (\`car_id\`) references \`car\` (\`id\`) on delete cascade on update cascade,
                   constraint \`car_customers_rental_id_foreign\` foreign key (\`rental_id\`) references \`rental\` (\`id\`) on delete cascade on update cascade,
                   primary key (\`car_id\`, \`rental_id\`)
                 );`);
    this.addSql(`create index \`car_customers_car_id_index\` on \`car_customers\` (\`car_id\`);`);
    this.addSql(`create index \`car_customers_rental_id_index\` on \`car_customers\` (\`rental_id\`);`);
  }

}

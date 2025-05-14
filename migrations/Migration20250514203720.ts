import { Migration } from '@mikro-orm/migrations';

export class Migration20250514203720 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`car\` (\`id\` int unsigned not null auto_increment primary key, \`created_at\` datetime null, \`updated_at\` datetime null, \`brand\` varchar(255) not null, \`model\` varchar(255) not null, \`year\` varchar(4) not null, \`km\` int not null, \`is_available\` tinyint(1) not null default true) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`customer\` (\`id\` int unsigned not null auto_increment primary key, \`created_at\` datetime null, \`updated_at\` datetime null, \`name\` varchar(255) not null, \`surname\` varchar(255) not null, \`birthdate\` date not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`rental\` (\`id\` int unsigned not null auto_increment primary key, \`created_at\` datetime null, \`updated_at\` datetime null, \`customer_id\` int unsigned not null, \`car_id\` int unsigned not null, \`rent_date\` date null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`rental\` add index \`rental_customer_id_index\`(\`customer_id\`);`);
    this.addSql(`alter table \`rental\` add index \`rental_car_id_index\`(\`car_id\`);`);

    this.addSql(`alter table \`rental\` add constraint \`rental_customer_id_foreign\` foreign key (\`customer_id\`) references \`customer\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`rental\` add constraint \`rental_car_id_foreign\` foreign key (\`car_id\`) references \`car\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`rental\` drop foreign key \`rental_car_id_foreign\`;`);

    this.addSql(`alter table \`rental\` drop foreign key \`rental_customer_id_foreign\`;`);

    this.addSql(`drop table if exists \`car\`;`);

    this.addSql(`drop table if exists \`customer\`;`);

    this.addSql(`drop table if exists \`rental\`;`);
  }

}

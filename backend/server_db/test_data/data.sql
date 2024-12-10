set search_path to studybuds;

insert into student (student_id,telegram_account) values (4943369,33);
insert into student (student_id,telegram_account) values (4943370,34);

insert into student_group (id,name,course,admin_id) values (0,'CP','Capstone',4943369);
insert into student_group (id,name,course,admin_id) values (1,'CP2','Capstone',4943370);
insert into student_group (id,name,course,admin_id) values (2,'adm','Capstone',4943369);

insert into group_members (student_id,group_id) values (4943369,0);
insert into group_members (student_id,group_id) values (4943370,0);

insert into group_members (student_id,group_id) values (4943369,1);
insert into group_members (student_id,group_id) values (4943370,1);



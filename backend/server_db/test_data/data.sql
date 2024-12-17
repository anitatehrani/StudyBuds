set search_path to studybuds;

-- Api testing: get joined group list

insert into student (student_id,telegram_account) values (4943369,33);
insert into student (student_id,telegram_account) values (4943370,34);

insert into student_group (id,name,course,admin_id) values (0,'CP','Capstone',4943369);
insert into student_group (id,name,course,admin_id) values (1,'CP2','Capstone',4943370);

insert into group_members (student_id,group_id) values (4943369,0);
insert into group_members (student_id,group_id) values (4943370,0);

insert into group_members (student_id,group_id) values (4943369,1);
insert into group_members (student_id,group_id) values (4943370,1);

-- Acceptance testing: basic group search

insert into student (student_id,telegram_account) values (11,36);
insert into student_group (id,name,course,admin_id) values (2,'adm','Capstone',11);
insert into group_members (student_id,group_id) values (11,2);


-- Manage join requests

insert into student (student_id,telegram_account) values (10,35);
insert into student (student_id,telegram_account) values (12,37);

insert into student_group (id,name,course,admin_id,members_limit) values (3,'joinrequest','Capstone',10,100);
insert into group_members (student_id,group_id) values (10,3);

insert into join_request (id,group_id,student_id,status) values (1,3,12,'pending');
insert into notification (student_id,join_request_id,notification_type,message) values (10,1,'join_request','Nona has requested to join the Capstone project');

insert into join_request (id,group_id,student_id,status) values (2,3,12,'pending');
insert into notification (student_id,join_request_id,notification_type,message) values (10,2,'join_request','Nona has requested to join the Capstone project');


-- Joined group list

insert into student (student_id,telegram_account) values (42674,1435);
insert into student (student_id,telegram_account) values (42675,1436);

insert into student_group (id,name,course,admin_id) values (4,'mygroupyes','Capstone',42674);
insert into group_members (student_id,group_id) values (42674,4);

insert into student_group (id,name,course,admin_id,members_limit) values (5,'groupof10','Capstone',10,100);
insert into group_members (student_id,group_id) values (42674,5);
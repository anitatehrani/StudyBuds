set search_path to studybuds;

-- Api testing: get joined group list

insert into student (student_id,telegram_account) values (4943369,33);
insert into student (student_id,telegram_account) values (4943370,34);

insert into student_group (id,name,course,admin_id) values (100,'CP','Capstone',4943369);
insert into student_group (id,name,course,admin_id) values (101,'CP2','Capstone',4943370);

insert into group_members (student_id,group_id) values (4943369,100);
insert into group_members (student_id,group_id) values (4943370,100);

insert into group_members (student_id,group_id) values (4943369,101);
insert into group_members (student_id,group_id) values (4943370,101);

-- Acceptance testing: basic group search

insert into student (student_id,telegram_account) values (11,36);
insert into student_group (id,name,course,admin_id,members_limit) values (102,'adm','Capstone',11,10);
insert into group_members (student_id,group_id) values (11,102);


-- Manage join requests

insert into student (student_id,telegram_account) values (10,35);
insert into student (student_id,telegram_account) values (12,37);

insert into student_group (id,name,course,admin_id,members_limit) values (103,'joinrequest','Capstone',10,100);
insert into group_members (student_id,group_id) values (10,103);

insert into join_request (id,group_id,student_id,status) values (1,103,12,'pending');
insert into notification (student_id,join_request_id,notification_type,message) values (10,1,'join_request','Nona has requested to join the Capstone project');

insert into join_request (id,group_id,student_id,status) values (2,103,12,'pending');
insert into notification (student_id,join_request_id,notification_type,message) values (10,2,'join_request','Nona has requested to join the Capstone project');


-- Joined group list

insert into student (student_id,telegram_account) values (42674,1435);
insert into student (student_id,telegram_account) values (42675,1436);

insert into student_group (id,name,course,admin_id) values (104,'mygroupyes','Capstone',42674);
insert into group_members (student_id,group_id) values (42674,104);

insert into student_group (id,name,course,admin_id,members_limit) values (105,'groupof10','Capstone',10,100);
insert into group_members (student_id,group_id) values (42674,105);

-- demo

insert into group_members (student_id,group_id) values (10,104);


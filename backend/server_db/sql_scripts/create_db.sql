-- Create the database
CREATE DATABASE studybuds_db;

-- Connect to the newly created database
\c studybuds_db

CREATE TABLE Student (
    student_id smallint PRIMARY KEY,
    telegram_account int
);

CREATE TABLE StudentsGroup (
    id serial PRIMARY KEY,
    students_group_name varchar(40),
    students_group_description varchar(100),
    members_limit smallint,
    is_public boolean,
    course varchar(60),
    is_active boolean,
    telegram_link varchar(100),
    telegram_id integer,
    admin_id smallint REFERENCES Student(student_id) ON UPDATE CASCADE
);

CREATE TABLE StudentsGroupMember (
    student_id smallint PRIMARY KEY REFERENCES Student(student_id) ON UPDATE CASCADE,
    students_group_id serial REFERENCES StudentsGroup(id) ON UPDATE CASCADE
);

CREATE TABLE JoinRequest (
    join_request_id serial PRIMARY KEY,
    group_id serial REFERENCES StudentsGroup(id) ON UPDATE CASCADE,
    student_id integer REFERENCES Student(student_id) ON UPDATE CASCADE,
    join_request_status varchar(20)
);

CREATE TABLE FbToken (
    fb_token_id serial PRIMARY KEY,
    token varchar(200),
    student_id int REFERENCES Student(student_id) ON UPDATE CASCADE 
);

CREATE TABLE Notification (
    notification_id serial PRIMARY KEY,
    student_id integer REFERENCES Student(student_id) ON UPDATE CASCADE,
    join_request_id bigint REFERENCES JoinRequest(join_request_id) ON UPDATE CASCADE,
    notification_type varchar(20) 
);


-- Create the user 'studybuds_user' and set a password
CREATE USER studybuds_user WITH PASSWORD 'studybuds_password';

-- Grant necessary privileges to the new user
GRANT CONNECT ON DATABASE studybuds_db TO studybuds_user;
GRANT USAGE ON SCHEMA public TO studybuds_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO studybuds_user;
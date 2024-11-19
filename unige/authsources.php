<?php

$result=array();
$students=json_decode(file_get_contents("/data/data.json"))->students;

foreach($students as $student){
    $id=$student->id;
    $password=$student->password;
    $result["$id:$password"]=array("uid"=>array("$id"));
}


$config = array(

    'admin' => array(
        'core:AdminPassword',
    ),

    'example-userpass' => array('exampleauth:UserPass')+$result
    // array(
    //     'exampleauth:UserPass',
    //     'user1:user1pass' => array(
    //         'uid' => array('1'),
    //         'eduPersonAffiliation' => array('group1'),
    //         'email' => 'user1@example.com',
    //     ),
    //     'user2:user2pass' => array(
    //         'uid' => array('2'),
    //         'eduPersonAffiliation' => array('group2'),
    //         'email' => 'user2@example.com',
    //     ),
    // ),

);


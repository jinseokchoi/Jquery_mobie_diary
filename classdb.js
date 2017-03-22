//variable 
var db = null;
var position = null;
var index;

//DB create and open
function openDB(){
    db = window.openDatabase('classDB', '1.0', 'class', 1024*1024);
    console.log('Create Database');
}

//DB Table Create Transaction
function createTable(){
    db.transaction(function(tr){
        var createSQL = 'create table if not exists class(subject text, score text, name text, professor text, textbook text, time text)';
        tr.executeSql(createSQL, [], function(){
            console.log('Success create table, Success SQL implement');
        }, function(){
            console.log('Success create table, Fail SQL implement');
        });
    }, function(){
        console.log('Success create table, Transaction failed, Auto rollback');
    }, function(){
        console.log('Success create table, Transaction Successed');
    });
}

//Insert DB transaction implement
function insert_class(){
    db.transaction(function(tr){
        var subject = $('#class_insert_subject').val();
        var score = $('#class_insert_score').val();
        var name = $('#class_insert_name').val();
        var professor = $('#class_insert_professor').val();
        var textbook = $('#class_insert_textbook').val();
        var time = $('#class_insert_time').val();
        var insertSQL = 'insert into class(subject, score, name, professor, textbook, time) values(?, ?, ?, ?, ?, ?)';
        tr.executeSql(insertSQL, [subject, score, name, professor, textbook, time], function(tr, rs){
            console.log('Insert class : ' +rs.insertId);
            alert('Subject name : ' + $('#class_insert_name').val() +' is saved DB');
            $('#class_insert_subject').val('교양').attr('selected', 'selected');
            $('#class_insert_subject').selectmenu('refresh');
            $('#class_insert_score').val('P/NP').attr('selected', 'selected');
            $('#class_insert_score').selectmenu('refresh');
            $('#class_insert_name').val('');
            $('#class_insert_professor').val('');
            $('#class_insert_textbook').val('');
            $('#class_insert_time').val('');
        }, function(tr, err){
            alert('DB Error' + err.message + err.code);
        });
    });
}

//Modify DB transaction implement
function modify_class(){
    db.transaction(function(tr){
        var sname = $('#class_modify_sname').val();
        var subject = $('#class_modify_subject').val();
        var score = $('#class_modify_score').val();
        var name = $('#class_modify_name').val();
        var professor = $('#class_modify_professor').val();
        var textbook = $('#class_modify_textbook').val();
        var time = $('#class_modify_time').val();
        var modifySQL = 'update class set subject=?, score=?, name=?, professor=?, textbook=?, time=? where name=?';
        tr.executeSql(modifySQL, [subject, score, name, professor, textbook, time, sname], function(tr, rs){
            console.log('Modify class');
            alert('Subject name : ' +$('#class_modify_sname').val()+ ' is modified DB');
            $('#class_modify_sname').val('');
            $('#class_modify_subject').val('교양').attr('selected', 'selected');
            $('#class_modify_subject').selectmenu('refresh');
            $('#class_modify_score').val('P/NP').attr('selected', 'selected');
            $('#class_modify_score').selectmenu('refresh');
            $('#class_modify_name').val('');
            $('#class_modify_professor').val('');
            $('#class_modify_textbook').val('');
            $('#class_modify_time').val('');
        }, function(tr, err){
            alert('DB Error' + err.message + err.code);
        });
    });
}

//Search DB transaction implement for Modify DB
function msearch_class(name){
    db.transaction(function(tr){
        var selectSQL = 'select subject, score, name, professor, textbook, time from class where name = ?';
        tr.executeSql(selectSQL, [name], function(tr, rs){
            $('#class_modify_subject').val(rs.rows.item(0).subject).attr('selected', 'selected');
            $('#class_modify_subject').selectmenu('refresh');
            $('#class_modify_score').val(rs.rows.item(0).score).attr('selected', 'selected');
            $('#class_modify_score').selectmenu('refresh');
            $('#class_modify_name').val(rs.rows.item(0).name);
            $('#class_modify_professor').val(rs.rows.item(0).professor);
            $('#class_modify_textbook').val(rs.rows.item(0).textbook);
            $('#class_modify_time').val(rs.rows.item(0).time);
        });
    });
}

//Delete DB transaction implement
function delete_class(){
    db.transaction(function(tr){
        var name = $('#class_delete_sname').val();
        var deleteSQL = 'delete from class where name = ?';
        tr.executeSql(deleteSQL, [name], function(tr, rs){
            console.log('Delete class');
            alert('Subject name : ' + $('#class_delete_sname').val() + ' is deleted DB');
            $('#class_delete_sname').val('');
            $('#class_delete_subject').val('');
            $('#class_delete_score').val('');
            $('#class_delete_name').val('');
            $('#class_delete_professor').val('');
            $('#class_delete_textbook').val('');
            $('#class_delete_time').val('');
        }, function(tr, err){
            alert('DB Error' + err.message + err.code);
        });
    });
}

//Search DB transaction implement for Delete DB
function dsearch_class(name){
    db.transaction(function(tr){
        var selectSQL = 'select subject, score, name, professor, textbook, time from class where name = ?';
        tr.executeSql(selectSQL, [name], function(tr, rs){
            $('#class_delete_subject').val(rs.rows.item(0).subject);
            $('#class_delete_score').val(rs.rows.item(0).score);
            $('#class_delete_name').val(rs.rows.item(0).name);
            $('#class_delete_professor').val(rs.rows.item(0).professor);
            $('#class_delete_textbook').val(rs.rows.item(0).textbook);
            $('#class_delete_time').val(rs.rows.item(0).time);
        }, function(tr, err){
            alert('DB Error' + err.message + err.code);
        });
    });
}

//Search DB transaction implement
function search_class(){
    db.transaction(function(tr){
        var selectSQL = 'select * from class';
        tr.executeSql(selectSQL, [], function(tr, rs){
            console.log('Search class : ' + rs.rows.length + ' 건');
            if(position == 'first'){
                if(index == 0){
                    alert('Class does not exist');
                }
                else{
                    index=0;
                }
            }
            
            else if(position == 'prev'){
                if(index == 0){
                    alert('Class does not exist');
                }
                else{
                    index = --index;
                }
            }
            
            else if(position == 'next'){
                if(index == rs.rows.length-1){
                    alert('Class does not exist');
                }
                else{
                    index = ++index;
                }
            }
            
            else{
                if(index == rs.rows.length-1){
                    alert('Class does not exist');
                }
                else{
                    index = rs.row.length-1;
                }
            }
            $('#class_search_subject').val(rs.rows.item(index).subject);
            $('#class_search_score').val(rs.rows.item(index).score);
            $('#class_search_name').val(rs.rows.item(index).name);
            $('#class_search_professor').val(rs.rows.item(index).professor);
            $('#class_search_textbook').val(rs.rows.item(index).textbook);
            $('#class_search_time').val(rs.rows.item(index).time);
        });
    });
}

//Search DB transaction implement for Search DB
function ssearch_class(name){
    db.transaction(function(tr){
        var selectSQL = 'select subject, score, name, professor, textbook, time from class where name = ?';
        tr.executeSql(selectSQL, [name], function(tr, rs){
            $('#class_search_subject').val(rs.rows.item(0).subject);
            $('#class_search_score').val(rs.rows.item(0).score);
            $('#class_search_name').val(rs.rows.item(0).name);
            $('#class_search_professor').val(rs.rows.item(0).professor);
            $('#class_search_textbook').val(rs.rows.item(0).textbook);
            $('#class_search_time').val(rs.rows.item(0).time);
        }, function(tr, err){
            alert('DB Error' + err.message + err.code);
        });
    });
}
//DB create and open
function openDB2(){
    db = window.openDatabase('diaryDB', '1.0', 'diary', 1024*1024);
    console.log('Create Database');
}

//DB table create transaction
function createTable2(){
    db.transaction(function(tr){
        var createSQL = 'create table if not exists diary(date text, day text, weather text, title text, content text, location text, photo text)';
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
function insert_diary(){
    db.transaction(function(tr){
        var date = $('#write_diary_date').val();
        var day = $('#write_diary_day').val();
        var weather = $('#write_diary_weather').val();
        var title = $('#write_diary_title').val();
        var content = $('#write_diary_content').val();
        var location = $('#write_diary_location').val();
        var photo = $('#write_diary_photo').val();
        var insertSQL = 'insert into diary(date, day, weather, title, content, location, photo) values(?, ?, ?, ?, ?, ?, ?)';
        tr.executeSql(insertSQL, [date, day, weather, title, content, location, photo], function(tr, rs){
            console.log('Insert diary : ' +rs.insertId);
            alert('diary title : ' + $('#write_diary_title').val() +' is saved DB');
            $('#write_diary_date').val('');
            $('#write_diary_day').val('Mon').attr('selected', 'selected');
            $('#write_diary_day').selectmenu('refresh');
            $('#write_diary_weather').val('Sunny').attr('selected', 'selected');
            $('#write_diary_weather').selectmenu('refresh');
            $('#write_diary_title').val('');
            $('#write_diary_location').val('');
            $('#write_diary_photo').val('');
        }, function(){
            alert('diary title : ' +$('#write_diary_title').val()+ ' fail the enroll');
        });
    });
}

//Modify DB transaction implement
function modify_diary(){
    db.transaction(function(tr){
        var sdate = $('#modify_diary_sdate').val();
        var date = $('#modify_diary_date').val();
        var day = $('#modify_diary_day').val();
        var weather = $('#modify_diary_weather').val();
        var title = $('#modify_diary_title').val();
        var content = $('#modify_diary_content').val();
        var location = $('#modify_diary_location').val();
        var photo = $('#modify_diary_photo').val();
        var updateSQL = 'update diary set date = ?, day = ?, weather = ?, title = ?, content = ?, location = ?, photo = ? where date = ?';
        tr.executeSql(updateSQL, [date, day, weather, title, content, location, photo, sdate], function(tr, rs){
            console.log('Modify diary');
            alert('Diary title : ' +$('#modify_diary_title').val()+ ' is modified');
            $('#modify_diary_sdate').val('');
            $('#modify_diary_date').val('');
            $('#modify_diary_day').val('Mon').attr('selected', 'selected');
            $('#modify_diary_day').selectmenu('refresh');
            $('#modify_diary_weather').val('Sunny').attr('selected', 'selected');
            $('#modify_diary_weather').selectmenu('refresh');
            $('#modify_diary_title').val('');
            $('#modify_diary_content').val('');
            $('#modify_diary_location').val('');
            $('#modify_diary_photo').val('');
        }, function(){
            alert('Diary title : ' +$('#modify_diary_title').val()+ ' does not modify');
        });
    });
}

//Search DB transaction implement for Modify DB
function smodify_diary(date){
    db.transaction(function(tr){
        var selectSQL = 'select date, day, weather, title, content, location, photo from diary where date = ?';
        tr.executeSql(selectSQL, [date], function(tr, rs){
            $('#modify_diary_date').val(rs.rows.item(0).date);
            $('#modify_diary_day').val(rs.rows.item(0).day).attr('selected', 'selected');
            $('#modify_diary_day').selectmenu('refresh');
            $('#modify_diary_weather').val(rs.rows.item(0).weather).attr('selected', 'selected');
            $('#modify_diary_weather').selectmenu('refresh');
            $('#modify_diary_title').val(rs.rows.item(0).title);
            $('#modify_diary_content').val(rs.rows.item(0).content);
            $('#modify_diary_location').val(rs.rows.item(0).location);
            $('#modify_diary_photo').val(rs.rows.item(0).photo);
        });
    });
}

//Delete DB transaction implement
function delete_diary(){
    db.transaction(function(tr){
        var sdate = $('#delete_diary_sdate').val();
        var date = $('#delete_diary_date').val();
        var day = $('#delete_diary_day').val();
        var weather = $('#delete_diary_weather').val();
        var title = $('#delete_diary_title').val();
        var content = $('#delete_diary_content').val();
        var location = $('#delete_diary_location').val();
        var photo = $('#delete_diary_photo').val();
        var deleteSQL = 'delete from diary where date = ?';
        tr.executeSql(deleteSQL, [date], function(tr, rs){
            console.log('Delete diary');
            alert('Diary title : ' +$('#delete_diary_title').val()+ ' deleted DB');
            $('#delete_diary_sdate').val('');
            $('#delete_diary_date').val('');
            $('#delete_diary_day').val('');
            $('#delete_diary_weather').val('');
            $('#delete_diary_title').val('');
            $('#delete_diary_content').val('');
            $('#delete_diary_location').val('');
            $('#delete_diary_photo').val('');
        }, function(){
            alter('Diary title : ' +$('#delete_diary_title').val+ ' does not delete');
        });
    });
}

//Search DB transaction implement for Delete DB
function sdelete_diary(date){
     db.transaction(function(tr){
        var selectSQL = 'select date, day, weather, title, content, location, photo from diary where date = ?';
        tr.executeSql(selectSQL, [date], function(tr, rs){
            $('#delete_diary_date').val(rs.rows.item(0).date);
            $('#delete_diary_day').val(rs.rows.item(0).day).attr('selected', 'selected');
            $('#delete_diary_day').selectmenu('refresh');
            $('#delete_diary_weather').val(rs.rows.item(0).weather).attr('selected', 'selected');
            $('#delete_diary_weather').selectmenu('refresh');
            $('#delete_diary_title').val(rs.rows.item(0).title);
            $('#delete_diary_content').val(rs.rows.item(0).content);
            $('#delete_diary_location').val(rs.rows.item(0).location);
            $('#delete_diary_photo').val(rs.rows.item(0).photo);
        }, function(tr, err){
            alert('DB Error ' + err.message + err.code);
        });
    });
}

//Search DB transaction implement
function search_diary(){
    db.transaction(function(tr){
        var i, count, tagList='';
        var date = $('#search_diary_sdate').val();
        var day = $('#search_diary_sday').val();
        var selectSQL = 'select date, day, weather, title, content, location, photo from diary where date = ? and day = ?';
        tr.executeSql(selectSQL, [date, day], function(tr, rs){
            console.log('diary list : ' + rs.rows.length + ' 건');
            recordSet=rs;
            count=rs.rows.length;
            if(count > 0){
                tagList = '<li data-role="list-divider">Diary list'+'<span style = "float:right">' +count+ ' 건' + '</span></li>';
                for(i=0; i<count; i+=1){
                    tagList += '<li><a onclick="displayDiary('+i+')">';
                    tagList += '<img class="my_listview_img" src="' +rs.rows.item(i).photo+'">';
                    tagList += '<h2>' + rs.rows.item(i).title + '</h2>';
                    tagList += '<p>' + rs.rows.item(i).location + '</p>';
                    tagList += '<p>' +rs.rows.item(i).content + '</p></a></li>';
                }
                $('#search_list').html(tagList);
                $('#search_list').listview('refresh');
            } 
//            else{
//                navigator.notification.alert('No data in Database', null, 'search fail');
//            }
        });
    });
}
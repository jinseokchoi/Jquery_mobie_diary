//카메라 장치를 이용하여 사진 촬영 후 base64-encoded 이미지 문자열 임시 파일 경로를 반환
function capturePhoto(){
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality : 50, destinationType : Camera.DestinationType.FILE_URI});
}

//getPicture() //Callback function(success)
function onPhotoDataSuccess(imageURI){
  $('#imgArea').attr('src', imageURI);
  movePhoto(imageURI);
}

//getPicture() //Callback function(fail)
function onFail(message){
  alert('Failed because : ' +message);
}

//이미지 문자열 임시 파일을 이동
function movePhoto(fileuri){
  window.resolveLocalFileSystemURI(fileuri, resolveOnSuccess, OnError);
}

//resolveLocalFileSystemURI() //Callback function(success)
function resolveOnSuccess(fileentry){
  if(flag == 'enrol'){
    var newfilename = $('#write_diary_photo').val() + '.jpg'; //saved name
  }
  else if(flag == 'modify'){
    var newfilename = $('#modify_diary_photo').val() + '.jpg';
  }
  
  var newfoldername = "diaryApp"; //saved folder
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
    function(filesysobj){ //if folder not exist, new folder create
      filesysobj.root.getDirectory(newfoldername, {create:true, exclusive:false},
        function(directoryentry){
        fileentry.moveTo(directoryentry, newfilename, successMove, OnError);
      }, OnError);
  }, OnError);
}

//fileentry.moveTo() //Callback function(success)
function successMove(fileentry){
  console.log(fileentry.fullPath); //show folder route, move to image
  if(flag == 'enrol'){
    $('#write_diary_photo').val(fileentry.fullPath);
  }
  else if(flag == 'modify'){
    $('#modify_diary_photo').val(fileentry.fullPath);
  }
}

//fileentry.moveTo() //Callback function(fail)
function OnError(error){
  alert(error.code);
}



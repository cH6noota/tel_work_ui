//keyの読み込み


window.onload = () => {
    const video  = document.querySelector("#my");
    const canvas = document.querySelector("#picture");
    const se     = document.querySelector('#se');
  
    /** カメラ設定 */
    const constraints = {
        audio: false,
        video: {
          width: 100,
          height: 100,
          facingMode: "user"   // フロントカメラを利用する
          // facingMode: { exact: "environment" }  // リアカメラを利用する場合
        }
      };
  
    /**
     * カメラを<video>と同期
     */
    navigator.mediaDevices.getUserMedia(constraints)
    .then( (stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
    })
    .catch( (err) => {
      console.log(err.name + ": " + err.message);
    });
    var camera_flag= true;
    var mic_flag = true; 
    
    
    
    $('#camera').click(function(){
        if (camera_flag){
            $(this).find("img").attr('src', 'img/camera_off.svg');
            camera_flag =false;
            video.srcObject.getTracks().forEach(track => track.stop());
    
        }
        else{
            $(this).find("img").attr('src', 'img/camera_on.svg');
            camera_flag =true;
            navigator.mediaDevices.getUserMedia(constraints)
            .then( (stream) => {
              video.srcObject = stream;
            });
        }
    });
    
    $('#mic').click(function(){
        if (mic_flag){
            $(this).find("img").attr('src', 'img/mic_off.svg');
            mic_flag =false;
        }
        else{
            $(this).find("img").attr('src', 'img/mic_on.svg');
            mic_flag =true;
        }
    });
    
    
    $('#leave').click(function(){
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
    
    });


  };





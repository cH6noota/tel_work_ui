const Peer = window.Peer;

(async function main() {
  //自分のvideo部分
  const localVideo = document.querySelector("#my");
  const localId = document.getElementById('my_name');
  const callTrigger = document.getElementById('js-call-trigger');
  const closeTrigger = document.getElementById('js-close-trigger');
  const remoteVideo = document.getElementById('js-remote-stream');
  const remoteId = document.getElementById('js-remote-id');
  const sdkSrc = document.querySelector('script[src*=skyway]');

  //画像データ取得
  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .catch(console.error);

  // Render local stream
  localVideo.muted = true;
  localVideo.srcObject = localStream;
  localVideo.playsInline = true;
  await localVideo.play().catch(console.error);

  const peer = (window.peer = new Peer({
    key: window.__SKYWAY_KEY__,
    debug: 3,
  }));

  /* Register caller handler
  callTrigger.addEventListener('click', () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }
    const mediaConnection = peer.call(remoteId.value, localStream);
    mediaConnection.on('stream', async stream => {
      // Render remote stream for caller
      remoteVideo.srcObject = stream;
      remoteVideo.playsInline = true;
      await remoteVideo.play().catch(console.error);
    });
    mediaConnection.once('close', () => {
      alert("切断されました！");
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      
    });
    closeTrigger.addEventListener('click', () => {
        mediaConnection.close(true);
        
    } );
  });*/
  
  peer.once('open', id => (localId.textContent = id));

  // 受信側
  peer.on('call', mediaConnection => {
    //受信した時受け取る
    mediaConnection.answer(localStream);

    mediaConnection.on('stream', async stream => {
      // Render remote stream for callee
      remoteVideo.srcObject = stream;
      remoteVideo.playsInline = true;
      await remoteVideo.play().catch(console.error);
    });

    mediaConnection.once('close', () => {
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      alert("test");
    });
    //colseボタンが押された時
    closeTrigger.addEventListener('click', () => mediaConnection.close(true));
  });

  //peer.on('error', console.error);
  peer.on('error', error => {
    console.log(`${error.type}: ${error.message}`);
  });
})();

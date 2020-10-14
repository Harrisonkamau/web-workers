document.addEventListener('DOMContentLoaded' , (e) => {
  const worker = new Worker('./myWorker.js');

  const button = document.querySelector('button');

  button.onclick = function() {
    worker.postMessage({ namespace: 'sendResponse', payload: { hello: 'world' } });
  }

  worker.onmessage = ($event) => {
    console.log('Ok', $event.data.namespace, 'I have seen your message', $event.data.payload);
  }
});

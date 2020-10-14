// self.onmessage = ($event) => {
//   console.log('EVENT', $event.data);

//   self.postMessage('I have received the message. Thanks!');
// };

self.addEventListener('message', (e) => {
  if (e && e.data && e.data.namespace === 'sendResponse') {
    console.log('Got my message', e.data.payload, 'from', e.data.namespace);

    self.postMessage({ namespace: 'sendResponse', payload: { response: 'You are good to go' } });
  }
});

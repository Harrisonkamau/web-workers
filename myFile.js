(function () {
  var data;
  document.addEventListener('DOMContentLoaded', () => {
    function eventBus() {
      let eventListeners = [];
      const storage = typeof window !== 'undefined' ? window.localStorage : {};

      function subscribe(namespace, callback) {
        eventListeners.push({ namespace, callback });
        storage.setItem('vibesEventListeners', JSON.stringify({ eventListeners }));
      }

      function publish(namespace, data) {
        const changeListeners = storage.getItem('vibesEventListeners');

        if (Array.isArray(JSON.parse(changeListeners).eventListeners)) {
          const consumers = eventListeners
            .filter((listener) => listener.namespace === namespace)
            .map((consumer) => consumer.callback);
            console.log('consumers', consumers);
          consumers.forEach((callback) => callback(data));
        }
      }

      return {
        subscribe,
        publish,
      };
    }

    const bus = eventBus();
    const [publishBtn, subscribeBtn] = document.querySelectorAll('button');
    const input = document.querySelector('input');


    input.onblur = function(event) {
      data = event.target.value;
    };

    publishBtn.onclick = function(event) {
      event.preventDefault();

      bus.publish('formData', data);
      // window.data = data;

      input.value = '';

      // window.postMessage(data, event.origin);
    };

    subscribeBtn.onclick = function(event) {
      event.preventDefault();

      bus.subscribe('formData', (response) => {
        console.log('response', response);
      });
    }

    document.addEventListener('sendMessage', (message) => {
      console.log('message received', message);
      window.localStorage.setItem('message', JSON.stringify({ message }));
    }, false);

  });
})();

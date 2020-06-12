import cookie from 'js-cookie';

const iframeExport = (path, payload, method = 'POST') => {
  const formTarget = 'iframeDownloader';

  if (!document.querySelector(`iframe[id="${formTarget}"]`)) {
    const iframe = document.createElement('iframe');
    iframe.name = formTarget;
    iframe.id = formTarget;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  const form = document.createElement('form');
  form.action = path;
  form.method = method;
  form.target = formTarget;
  form.style.display = 'none';

  const token = cookie.get('CSRF-TOKEN');
  if (token) { // CSRF-TOKEN
    const input = document.createElement('input');
    input.setAttribute('name', 'X-CSRF-TOKEN');
    input.setAttribute('value', token);
    form.appendChild(input);
  }

  if (payload) { // JSON
    const input = document.createElement('input');
    input.setAttribute('name', 'json');
    input.setAttribute('value', JSON.stringify(payload));
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export default iframeExport;

const output = document.querySelector("#output");

const params = new URLSearchParams(window.location.search);

output.textContent = `Thanks ${params.get("name")}! We received your message.`;
document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const res = await fetch('data.json?' + new URLSearchParams(new FormData(this)), { method: 'GET' });
    const data = await res.json();

    for (const i of this.querySelectorAll('input, select')) i.disabled = true;

    for (const i in data) {
        const ipt = document.createElement('input'); ipt.type = 'hidden';
        ipt.name = i;
        ipt.value = data[i];
        this.appendChild(ipt);
    }

    this.submit();
}, { passive: false });
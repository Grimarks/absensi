fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const ip = data.ip;
        const apiUrl = `https://ipapi.co/${ip}/json/`;
        return fetch(apiUrl);
    })
    .then(response => response.json())
    .then(data => {
        const lokasi = `${data.city}, ${data.region}`;
        document.getElementById("lokasiInput").textContent = lokasi;
    })
    .catch(() => {
        document.getElementById("lokasiInput").textContent = "Tidak dapat mendeteksi lokasi.";
    });

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        document.getElementById("video").srcObject = stream;
    })
    .catch(() => {
        alert("Kamera tidak tersedia!");
    });

document.getElementById("capture").addEventListener("click", () => {
    const canvas = document.getElementById("canvas");
    const video = document.getElementById("video");
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    document.getElementById("inputFoto").value = imageData;

    alert("Foto berhasil diambil!");
});

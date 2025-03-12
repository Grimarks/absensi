// Ambil lokasi menggunakan Geolocation API
const options = {
    maximumAge: 0,
    enableHighAccuracy: true,
    timeout: 15000,
};

const success = (pos) => {
    const coords = pos.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;

    // Tampilkan lokasi dalam form
    document.getElementById("lokasiInput").textContent = 
        `Latitude: ${latitude}, Longitude: ${longitude}`;
};

const error = () => {
    document.getElementById("lokasiInput").textContent = "Tidak dapat mendeteksi lokasi.";
};

// Panggil Geolocation saat halaman dimuat
navigator.geolocation.getCurrentPosition(success, error, options);

// Aktifkan Kamera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        document.getElementById("video").srcObject = stream;
    })
    .catch(() => {
        alert("Kamera tidak tersedia!");
    });

// Capture Foto
document.getElementById("capture").addEventListener("click", () => {
    const canvas = document.getElementById("canvas");
    const video = document.getElementById("video");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    document.getElementById("inputFoto").value = imageData;

    alert("Foto berhasil diambil!");
});

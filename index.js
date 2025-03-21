document.addEventListener("DOMContentLoaded", () => {
    // Ambil lokasi menggunakan Geolocation API
    const lokasiElement = document.getElementById("lokasiInput");

    if ("geolocation" in navigator) {
        const options = {
            maximumAge: 0,
            enableHighAccuracy: true,
            timeout: 15000,
        };

        const success = (pos) => {
            const { latitude, longitude } = pos.coords;

            // Menampilkan lokasi dengan tautan ke Google Maps
            lokasiElement.innerHTML = `
        <strong>Lokasi Terdeteksi:</strong> <br>
        Latitude: ${latitude}, Longitude: ${longitude} <br>
        <a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">Lihat di Google Maps</a>
    `;

            // Menyimpan lokasi ke input hidden agar dapat dikirim ke Google Sheets
            document.getElementById("lokasiHidden").value = `${latitude},${longitude}`;
        };

        const error = (err) => {
            lokasiElement.textContent = "Tidak dapat mendeteksi lokasi. Pastikan izin lokasi diaktifkan.";
            console.error("Error Geolocation:", err);
        };

        // Menggunakan `watchPosition` agar lokasi terus diperbarui
        navigator.geolocation.watchPosition(success, error, options);
    } else {
        lokasiElement.textContent = "Geolocation tidak didukung di browser Anda.";
    }

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
});

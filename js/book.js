const bookForm = document.getElementById("book-form");
const submitBtn = document.getElementById("submit-btn");
const formMessage = document.getElementById("form-message");

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = type; // "success" or "error"
}

bookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim...";
    formMessage.className = "";

    const formData = new FormData(bookForm);
    const payload = {
        name: formData.get("name").trim(),
        email: formData.get("email").trim(),
        phone: formData.get("phone").trim(),
        address: formData.get("address").trim(),
        location: formData.get("location"),
        guests: parseInt(formData.get("guests"), 10),
        arrivals: formData.get("arrivals"),
        leaving: formData.get("leaving"),
    };

    // basic client-side sanity check, mirrors the "required" attributes
    if (Object.values(payload).some((v) => v === "" || v === null || Number.isNaN(v))) {
        showMessage("Mohon lengkapi semua field sebelum mengirim.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = "Kirim";
        return;
    }

    if (payload.leaving < payload.arrivals) {
        showMessage("Tanggal kembali tidak boleh sebelum tanggal kedatangan.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = "Kirim";
        return;
    }

    const { error } = await supabaseClient.from("book_form").insert([payload]);

    submitBtn.disabled = false;
    submitBtn.textContent = "Kirim";

    if (error) {
        console.error(error);
        showMessage("Gagal mengirim pesanan, silakan coba lagi. (" + error.message + ")", "error");
        return;
    }

    showMessage("Pesanan berhasil dikirim! Tim kami akan segera menghubungi kamu.", "success");
    bookForm.reset();
});

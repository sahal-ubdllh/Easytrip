const tbody = document.getElementById("booking-tbody");
const table = document.getElementById("booking-table");
const loadingMsg = document.getElementById("loading-msg");
const emptyMsg = document.getElementById("empty-msg");
const logoutBtn = document.getElementById("logout-btn");

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
}

async function requireLogin() {
    const { data } = await supabaseClient.auth.getSession();
    if (!data.session) {
        window.location.href = "admin-login.html";
        return false;
    }
    return true;
}

async function loadBookings() {
    loadingMsg.style.display = "block";
    table.style.display = "none";
    emptyMsg.style.display = "none";

    const { data, error } = await supabaseClient
        .from("book_form")
        .select("*")
        .order("id", { ascending: false });

    loadingMsg.style.display = "none";

    if (error) {
        console.error(error);
        loadingMsg.textContent = "Gagal memuat data: " + error.message;
        loadingMsg.style.display = "block";
        return;
    }

    if (!data || data.length === 0) {
        emptyMsg.style.display = "block";
        return;
    }

    tbody.innerHTML = data.map((row) => `
        <tr data-id="${row.id}">
            <td>${escapeHtml(row.name)}</td>
            <td>${escapeHtml(row.email)}</td>
            <td>${escapeHtml(row.phone)}</td>
            <td>${escapeHtml(row.address)}</td>
            <td>${escapeHtml(row.location)}</td>
            <td>${escapeHtml(row.guests)}</td>
            <td>${escapeHtml(row.arrivals)}</td>
            <td>${escapeHtml(row.leaving)}</td>
            <td><a href="#" class="delete-link">Hapus</a></td>
        </tr>
    `).join("");

    table.style.display = "table";
}

tbody.addEventListener("click", async (event) => {
    if (!event.target.classList.contains("delete-link")) return;
    event.preventDefault();

    const row = event.target.closest("tr");
    const id = row.dataset.id;

    if (!confirm("Apakah Anda yakin ingin menghapus pesanan ini?")) return;

    const { error } = await supabaseClient.from("book_form").delete().eq("id", id);

    if (error) {
        alert("Gagal menghapus pesanan: " + error.message);
        return;
    }

    alert("Pesanan berhasil dihapus!");
    loadBookings();
});

logoutBtn.addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "admin-login.html";
});

(async () => {
    const ok = await requireLogin();
    if (ok) loadBookings();
})();

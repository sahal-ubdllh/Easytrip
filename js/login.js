const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-btn");
const loginMessage = document.getElementById("login-message");

// If already logged in, skip straight to the admin page.
supabaseClient.auth.getSession().then(({ data }) => {
    if (data.session) {
        window.location.href = "view_book.html";
    }
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    loginBtn.disabled = true;
    loginBtn.textContent = "Memproses...";
    loginMessage.className = "";

    const formData = new FormData(loginForm);
    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    loginBtn.disabled = false;
    loginBtn.textContent = "Masuk";

    if (error) {
        loginMessage.textContent = "Login gagal: " + error.message;
        loginMessage.className = "error";
        return;
    }

    window.location.href = "view_book.html";
});

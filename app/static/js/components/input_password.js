/////////////////////////
/**
 * Input Password :: Components
 */
/////////////////////////

function toggle_password_view(input_id, btn_id) {
    const eye_fill = `<i class="bi bi-eye-fill fs-5"></i>`;
    const eye_slash_fill = `<i class="bi bi-eye-slash-fill fs-5"></i>`;
    const input_password = document.getElementById(input_id);
    const btn_password_view = document.getElementById(btn_id);

    if (input_password.type === 'password') {
        input_password.type = 'text';
        btn_password_view.innerHTML = eye_slash_fill;
    } else {
        input_password.type = 'password';
        btn_password_view.innerHTML = eye_fill;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const new_password_btn = document.getElementById('btn-new-password-view');
    if (new_password_btn) {
        new_password_btn.addEventListener('click', () => {
            toggle_password_view('input-new-password', 'btn-new-password-view');
        });
    }
});

document.getElementById('btn-password-view').addEventListener('click', () => {
    toggle_password_view('input-password', 'btn-password-view');
});

/////////////////////////

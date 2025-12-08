/////////////////////////
/**
 * Home / Chat :: Pages
 */
/////////////////////////

let script_chat = document.currentScript;
let endpoint_chat = script_chat.getAttribute('data-endpoint');

/////////////////////////

const textarea_editor = CodeMirror.fromTextArea(document.querySelector('#textarea-editor'), {
    mode: 'text/x-java',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    smartIndent: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    theme: 'shadowfox',
    lineWrapping: true
});
textarea_editor.setValue('@startuml\n\tClient -> Server: ping\n\talt Success\n\t\tServer -> Client: 200\n\telse Error\n\t\tServer -> Client: 500\n\tend\n@enduml');

/////////////////////////

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Submitting the prompt form
     */
    const form_prompt = document.querySelector('#container-prompt form');
    const textarea_prompt = document.querySelector('#container-prompt textarea');
    const btn_prompt_submit = document.querySelector('#btn-prompt-submit');

    btn_prompt_submit.addEventListener('click', async () => {

        /**
         * Checking form validity
         */
        if (!form_prompt.checkValidity()) return;
        const user_msg = textarea_prompt.value;
        textarea_prompt.value = '';

        /////////////////////////

        /**
         * Changing the button icon to indicate processing
         */
        const btn_prompt_submit_content = btn_prompt_submit.innerHTML;
        btn_prompt_submit.innerHTML = '<i class="bi bi-stop-fill"></i>';

        /**
         * Sending user prompt to generate the bot response
         */
        let response = await fetch(endpoint_chat, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'prompt': user_msg })
        });

        /////////////////////////

        /**
         * Updating the frontend with the bot response
         */
        let data = await response.json();
        if (data.bot_msg) {
            bot_msg = data.bot_msg;
            textarea_editor.setValue(data.bot_msg);
            try {
                let response = await fetch("{{ url_for('index.generate_diagram') }}", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code_uml: bot_msg })
                });

                data = await response.json();
                if (!response.ok) throw new Error(data.error);

                const img = document.querySelector('#img-display');
                img.src = `data:image/png;base64,${data.image_base64}`;
            } catch (err) {
                console.error('Error:', err);
            }
        }

        /**
         * Restoring the button icon
         */
        btn_prompt_submit.innerHTML = btn_prompt_submit_content;
    });

    /////////////////////////

    /**
     * Submitting the form on Enter key press (without Shift)
     */
    textarea_prompt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            btn_prompt_submit.click();
        }
    });
});

/////////////////////////

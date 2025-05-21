let compiler;
export function initializeCompiler() {
    if (!compiler) {
        compiler = CodeMirror.fromTextArea(document.getElementById("compiler"), {
            indentWithTabs: true,
            lineNumbers: true,
            matchBrackets: true,
            mode: "htmlmixed",
            tabSize: 4,
            theme: "default",
        });
    }

    return compiler;
}

export default function TypingInput({
  value,
  onChange,
  onPaste,
  disabled,
  textareaRef,
  pasteMessage,
}) {
  return (
    <div className="typing-input-wrap">
      <label htmlFor="typing-input">Type the reference text here</label>
      <textarea
        id="typing-input"
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        disabled={disabled}
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        rows={8}
        placeholder="The timer starts when you type your first character."
        aria-describedby="typing-help paste-message"
      />
      <p id="typing-help" className="input-help">
        Focus the box and start typing. Backspace is allowed; paste is disabled.
      </p>
      <p id="paste-message" className="paste-message" aria-live="polite">
        {pasteMessage}
      </p>
    </div>
  );
}

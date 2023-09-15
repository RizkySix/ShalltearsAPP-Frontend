export const limitCharacterCount = () => {
    const input = document.querySelector(".comment-box");
    const maxCharacters = 65;

    if (input.value.length > maxCharacters) {
        input.value = input.value.substring(0, maxCharacters);
    }
}

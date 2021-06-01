function TooltipText(username, usernamesList,) {
    let text;
    const userNotMe = usernamesList.find(name => name !== username);

    if (usernamesList.includes(username)) {
        if (usernamesList.length === 1) {
            text = ("Somente você curtiu esse post");
        } else if (usernamesList.length === 2) {
            text = (`Você e ${userNotMe}`);
        } else if (usernamesList.length > 2) {
            const qtd = usernamesList.length - 2;
            text = (`Você, ${userNotMe} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`);
        }
    } else {
        if (usernamesList.length === 0) {
            text = ("");
        } else if (usernamesList.length === 1) {
            text = (`${usernamesList[0]}`);
        } else if (usernamesList.length === 2) {
            text = (`${usernamesList[0]} e ${usernamesList[1]}`);
        } else if (usernamesList.length > 2) {
            const qtd = usernamesList.length - 2;
            text = (`${usernamesList[0]}, ${usernamesList[1]} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`);
        }
    }
    return text;
}

export default TooltipText;
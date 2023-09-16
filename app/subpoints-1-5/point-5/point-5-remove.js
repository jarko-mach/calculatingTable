

export const remove_Point5_html = () => {
    const foundElement = document.querySelector(".point5")
    if (foundElement) {
        foundElement.remove()
        tempInformations[5].created = false
    }
}
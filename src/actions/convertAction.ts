export const convertToSlug = (text: string) => {
    text = text.toLowerCase()
    let list: string[] = text.split(' ');
    let newList: string[] = [];
    let newText: string = ''
    for (let i = 0; i < list.length; i++) {
        if (list[i] !== '') {
            newList.push(list[i])
        }
    }
    return newList.join('-');
};
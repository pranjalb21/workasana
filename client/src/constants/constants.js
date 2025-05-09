export const base_url = `http://localhost:3000/api/v1`;

export function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16); // Random hex color
}

export function getTextColor(bgColor) {
    // Convert hex to RGB
    let r = parseInt(bgColor.substring(1, 3), 16);
    let g = parseInt(bgColor.substring(3, 5), 16);
    let b = parseInt(bgColor.substring(5, 7), 16);

    // Calculate luminance
    let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Choose black or white based on luminance
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

export const loadColors = () => {
    document.querySelectorAll(".namepill").forEach((pill) => {
        let bgColor = getRandomColor();
        pill.style.backgroundColor = bgColor;
        pill.style.color = getTextColor(bgColor); // Ensures contrast
    });
};

export const generateNameKeyword = (name) => {
    const nameArray = name.split(" ");
    let nameKeyword =
        nameArray[0][0].toUpperCase() +
        nameArray[nameArray.length - 1][0].toUpperCase();
    return nameKeyword;
};

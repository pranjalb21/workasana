export const base_url = `https://workasana-one.vercel.app/projects/api/v1`;

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

export const getDateString = (dateString) => {
    // console.log(dateString);

    const date = new Date(dateString);

    // Options for formatting
    const options = { day: "numeric", month: "long", year: "numeric" };

    // Format the date
    const formattedDate = date.toLocaleDateString("en-us", options);
    // .replace(",", "");
    // console.log(formattedDate); // Outputs: 21 May 2025
    return formattedDate;
};

export const statusList = ["To Do", "In Progress", "Completed", "Blocked"];
export const priorityList = [
    { value: 3, name: "Low" },
    { value: 2, name: "Medium" },
    { value: 1, name: "High" },
];

export const getTimeDifference = (fromDate, toDate) => {
    const currentDate = new Date(fromDate);
    const givenDate = new Date(toDate); // Example date

    const timeDifference = givenDate - currentDate; // Difference in milliseconds
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // console.log(`Difference: ${daysDifference} days`);
    return daysDifference > 0 ? daysDifference : 0;
};

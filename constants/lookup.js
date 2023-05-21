export function GetPoundsFromKilo(kilograms) {
    return kilograms * 2.20462;
}

export function GetKiloFromPounds(pounds) {
    return pounds / 2.20462;
}

export const StandardTimeStamps = [
    "Month",
    "3 Months",
    "6 Months",
    "Year"
];

export const scoreTypeIDtoString = {
    0: "Weights & Reps",
    1: "Time",
    2: "Distance"
};

export const muscleGroupIDtoString = {
    0: "Legs",
    1: "Back",
    2: "Chest",
    3: "Biceps",
    4: "Triceps",
    5: "Shoulders"
};

export const muscleGroupIDtoColor = {
    0: "#14342b",
    1: "#8c7051",
    2: "#b9b8d3",
    3: "#45b69c",
    4: "#008bf8",
    5: "#dc0073"
};

export const monthIndextoString = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
};
import type { CourseType } from "../types/types";

export const courses: Array<CourseType> = [
    { // index key: 0
        title: "Typescript",
        price: "Free",
        duration: "2 months",
        is_availble: true
    },
    { // index key: 1
        title: "React",
        price: "600₾",
        duration: "4 months",
        is_availble: true
    },
    { // index key: 1
        title: "Python",
        price: "300₾",
        duration: "2 months",
        is_availble: false
    },
    { // index key: 1
        title: "NodeJS + Express.js",
        price: "100₾",
        duration: "3 weeks",
        is_availble: false
    }
];

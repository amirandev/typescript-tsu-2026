import data from "../data.json" with { type: "json" };
const people = data;
for (const person of people) {
    console.log(`${person.name} | ${person.age} | ${person.city} | ${person.active ? "Active" : "Inactive"}`);
}
console.log("--- for loop ---");
for (let i = 0; i < people.length; i++) {
    const p = people[i];
    console.log(`${i + 1}. ${p.name} (${p.age}) - ${p.city}`);
}
console.log("--- forEach ---");
people.forEach((p) => {
    console.log(`${p.name} lives in ${p.city}`);
});

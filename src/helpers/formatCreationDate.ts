export default function formatCreationDate(dateStr?: string): string {
    if (!dateStr || typeof dateStr !== "string") return "Invalid date";
    const [mounth, day, year] = dateStr.split("/");
    return `${mounth}.${day}.${year}`;
}

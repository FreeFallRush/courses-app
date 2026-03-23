export default function formatCreationDate(dateStr?: string): string {
    if (!dateStr || typeof dateStr !== "string") return "Invalid date";
    const parts = dateStr.split(/[\/\.]/);
    if (parts.length !== 3) return "Invalid date";
    const [month, day, year] = parts;
    return `${month}.${day}.${year}`;
}

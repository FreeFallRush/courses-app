export function getCourseDuration(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const hoursTxt = hrs < 10 ? `0${hrs}` : `${hrs}`;
    const minutesTxt = mins < 10 ? `0${mins}` : `${mins}`;
    const unit = hrs === 1 ? "hour" : "hours";
    return `${hoursTxt}:${minutesTxt} ${unit}`;
}

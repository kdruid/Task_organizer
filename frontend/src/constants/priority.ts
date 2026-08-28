export type Priority = 'Optional'| 'Low'| 'Medium'| 'High'| 'Urgent';

export const Priority_colors: Record<Priority, string> = {
    Optional: "white",
    Low: "#037b0f",
    Medium: "#e7a23c",
    High: "#c21000",
    Urgent: "black",
}

export const Priority_text_colors: Record<Priority, string> = {
  Optional: "black",
  Low: "black",
  Medium: "black",
  High: "black",
  Urgent: "white",
}

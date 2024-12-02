export function formatTimestamp(row) {
    return new Date(row.timestamp).toLocaleString();
}

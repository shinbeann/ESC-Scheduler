import { pool, sql } from './db.js';

export default async function markAttendance(req, res) {
    const { sessionId } = req.body;

    try {
        const request = new sql.Request(pool);
        await request
            .input('SessionId', sql.NVarChar, sessionId)
            .query('INSERT INTO Attendance (SessionId, Timestamp) VALUES (@SessionId, GETDATE())');

        res.status(200).json({ message: 'Attendance marked successfully' });
    } catch (err) {
        console.error('Error marking attendance:', err);
        res.status(500).json({ message: 'Failed to mark attendance' });
    }
}

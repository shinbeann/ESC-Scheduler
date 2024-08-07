// // controllers/attendanceController.js
// import { pool } from './db.js';

// export default async function markAttendance(req, res) {
//   const { sessionId } = req.body;

//   try {
//     const [result] = await pool.query(
//       'INSERT INTO Attendance (SessionId, Timestamp) VALUES (?, NOW())',
//       [sessionId]
//     );

//     res.status(200).json({ message: 'Attendance marked successfully' });
//   } catch (err) {
//     console.error('Error marking attendance:', err);
//     res.status(500).json({ message: 'Failed to mark attendance' });
//   }
// }

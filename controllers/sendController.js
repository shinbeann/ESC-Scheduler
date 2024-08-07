import { sendWhatsapp } from './whatsappController.js';
import { sendEmail } from './emailController.js';
import { getCourseDetails } from './getCourse.js';

export async function scheduleNotification(req, res) {
    try {
        const notif_to_be_scheduled = await getCourseDetails();
        let errors = [];

        for (const notification of notif_to_be_scheduled) {
            const { email, hp_num, staff_name, startDate, course_name, location } = notification;
            const [date, time] = startDate.split('T');
            const [year, month, day] = date.split('-');
            const [hour, minute] = time.split(':');
            
            try {
                await sendWhatsapp(hp_num, staff_name, course_name, date, hour, minute, location);
                console.log(`Whatsapp sent successfully for ${staff_name}.`);
            } catch (error) {
                console.error(`Error sending Whatsapp for ${staff_name}:`, error.message);
                errors.push({ name: staff_name, error: error.message });
            }
            try {
                await sendEmail(email, staff_name, course_name, date, hour, minute, location);
                console.log(`Email sent successfully for ${staff_name}.`);
            } catch (error) {
                console.error(`Error sending Email for ${staff_name}:`, error.message);
                errors.push({ name: staff_name, error: error.message });
            }
        }

        if (errors.length > 0) {
            res.status(500).send({ message: 'Some notifications could not be scheduled', errors });
        } else {
            res.send("All notifications scheduled successfully");
        }
    } catch (error) {
        res.status(500).send({ message: 'Error fetching courses to be scheduled', error: error.message });
    }
}
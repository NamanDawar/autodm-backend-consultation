const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendConfirmation = async (booking) => {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: booking.client_email,
      subject: 'Your consultation is confirmed!',
      html: `<div style="font-family:sans-serif;padding:24px"><h2 style="color:#8b5cf6">Booking Confirmed!</h2><p>Hi ${booking.client_name},</p><p>Your session is booked successfully.</p><p><strong>Date:</strong> ${new Date(booking.slot_start).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p><p><strong>Amount Paid:</strong> Rs.${booking.amount}</p><p><strong>Meeting Link:</strong> <a href="${booking.meet_link}">${booking.meet_link}</a></p><p>Powered by AutoDM</p></div>`,
    });
    console.log('Confirmation email sent');
  } catch (err) {
    console.error('Email error:', err.message);
  }
};

module.exports = { sendConfirmation };

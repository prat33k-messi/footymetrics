package com.example.footymetrics;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String brevoUser;

    /**
     * Sends welcome confirmation email to user's Gmail / email account via Brevo.
     */
    public void sendWelcomeEmail(String toEmail, String username, String role, String branch) {
        if (brevoUser == null || brevoUser.trim().isEmpty() || mailSender == null) {
            logger.info("Brevo SMTP credentials not configured. Skipping email dispatch for {}", toEmail);
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(brevoUser);
            message.setTo(toEmail);
            message.setSubject("FOOTYMETRICS // Athlete Profile Confirmed: " + username);
            message.setText(
                    "FOOTYMETRICS // PRO ATHLETIC INTELLIGENCE\n" +
                    "===============================================\n\n" +
                    "Welcome, " + username + "!\n\n" +
                    "Your player telemetry profile has been registered successfully.\n\n" +
                    "Profile Telemetry:\n" +
                    "- Handle: " + username + "\n" +
                    "- Tactical Position: " + role + "\n" +
                    "- Organization / Club: " + branch + "\n" +
                    "- Official Email: " + toEmail + "\n\n" +
                    "You can now sign in at FootyMetrics to record match fixtures, track goals/assists, and monitor your global impact rating.\n\n" +
                    "Best regards,\n" +
                    "FootyMetrics Analytics Team"
            );

            mailSender.send(message);
            logger.info("Welcome email sent successfully via Brevo to {}", toEmail);
        } catch (Exception e) {
            logger.warn("Could not dispatch welcome email via Brevo to {}: {}", toEmail, e.getMessage());
        }
    }

    /**
     * Sends password update notification to user's Gmail account via Brevo.
     */
    public void sendPasswordUpdateEmail(String toEmail, String username) {
        if (brevoUser == null || brevoUser.trim().isEmpty() || mailSender == null) {
            logger.info("Brevo SMTP credentials not configured. Skipping password update email for {}", toEmail);
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(brevoUser);
            message.setTo(toEmail);
            message.setSubject("FOOTYMETRICS // Security Alert: Password Updated");
            message.setText(
                    "FOOTYMETRICS // SECURITY TELEMETRY\n" +
                    "===============================================\n\n" +
                    "Hello " + username + ",\n\n" +
                    "Your FootyMetrics athlete account password was updated successfully.\n\n" +
                    "If you did not perform this change, please contact your club administrator immediately.\n\n" +
                    "Best regards,\n" +
                    "FootyMetrics Security Team"
            );

            mailSender.send(message);
            logger.info("Security update email sent successfully via Brevo to {}", toEmail);
        } catch (Exception e) {
            logger.warn("Could not dispatch password update email via Brevo to {}: {}", toEmail, e.getMessage());
        }
    }
}

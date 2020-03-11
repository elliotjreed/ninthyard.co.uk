<?php

declare(strict_types=1);

namespace ElliotJReed;

use ElliotJReed\Exception\EmailRequired;
use ElliotJReed\Exception\NameRequired;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use SplFileObject;

use function error_log;
use function htmlspecialchars;
use function str_replace;
use function strip_tags;
use function trim;

final class ProcessForm
{
    private PHPMailer $mailer;

    public function __construct(PHPMailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function process(array $formData): bool
    {
        $this->ensureRequiredDataIsPresent($formData);

        try {
            $this->mailer->isSMTP();
            $this->mailer->Host = $_ENV['SMTP_HOST'];
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = $_ENV['SMTP_USERNAME'];
            $this->mailer->Password = $_ENV['SMTP_PASSWORD'];
            $this->mailer->SMTPSecure = 'ssl';
            $this->mailer->Port = (int) $_ENV['SMTP_PORT'];

            $this->mailer->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
            $this->mailer->addAddress($_ENV['SMTP_TO_EMAIL'], $_ENV['SMTP_TO_NAME']);

            $template = new SplFileObject(__DIR__ . '/templates/contact_email.html');

            $this->mailer->isHTML(true);
            $this->mailer->Subject = $_ENV['SMTP_SUBJECT'];
            $this->mailer->Body = $this->buildMessageBody($formData, $template->fread($template->getSize()));
            $this->mailer->AltBody = $this->buildAltMessageBody($formData);

            return $this->mailer->send();
        } catch (Exception $e) {
            error_log($this->mailer->ErrorInfo);
            error_log($e->getMessage());

            return false;
        }
    }

    private function ensureRequiredDataIsPresent(array $formData): void
    {
        if (empty($formData['name'])) {
            throw new NameRequired();
        }

        if (empty($formData['email'])) {
            throw new EmailRequired();
        }
    }

    private function buildMessageBody(array $formData, string $content): string
    {
        $messageBody = str_replace('FORMMESSAGENAME', $this->sanitise($formData['name']), $content);
        $messageBody = str_replace('FORMMESSAGEEMAIL', $this->sanitise($formData['email']), $messageBody);
        $messageBody = str_replace('FORMMESSAGECONTENT', $this->sanitise($formData['message']), $messageBody);

        return $messageBody;
    }

    private function buildAltMessageBody(array $formData): string
    {
        return 'Name: ' . $this->sanitise($formData['name']) . "\r\n" . 'Email: ' . $this->sanitise($formData['email']) . "\r\n" . $this->sanitise($formData['message']);
    }

    private function sanitise(?string $string): string
    {
        if ($string === null) {
            return '';
        }

        return trim(htmlspecialchars(strip_tags($string)));
    }
}

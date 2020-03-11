<?php

declare(strict_types=1);

namespace Tests\ElliotJReed;

use ElliotJReed\Exception\EmailRequired;
use ElliotJReed\Exception\NameRequired;
use ElliotJReed\ProcessForm;
use PHPUnit\Framework\TestCase;

final class ProcessFormTest extends TestCase
{
    public function testItSendsEmail(): void
    {
        $_ENV['SMTP_HOST'] = 'smtp.example.com';
        $_ENV['SMTP_USERNAME'] = 'smtp@example.com';
        $_ENV['SMTP_PASSWORD'] = 'password';
        $_ENV['SMTP_PORT'] = 567;
        $_ENV['SMTP_FROM_EMAIL'] = 'from@example.com';
        $_ENV['SMTP_FROM_NAME'] = 'Ms From';
        $_ENV['SMTP_SUBJECT'] = 'A subject';
        $_ENV['SMTP_TO_EMAIL'] = 'to@example.com';
        $_ENV['SMTP_TO_NAME'] = 'Miss To';

        $mailerSpy = new MailerSpy();
        $process = (new ProcessForm($mailerSpy))->process([
            'name' => 'Mrs Name',
            'email' => 'mrs.name@example.com',
            'message' => 'A message'
        ]);

        $this->assertTrue($process);
        $this->assertTrue($mailerSpy->sendCalled);

        $this->assertSame('from@example.com', $mailerSpy->From);
        $this->assertSame('Ms From', $mailerSpy->FromName);
        $this->assertSame('smtp.example.com', $mailerSpy->Host);
        $this->assertTrue($mailerSpy->SMTPAuth);
        $this->assertSame('smtp@example.com', $mailerSpy->Username);
        $this->assertSame('password', $mailerSpy->Password);
        $this->assertSame('ssl', $mailerSpy->SMTPSecure);
        $this->assertSame(567, $mailerSpy->Port);
        $this->assertSame('text/html', $mailerSpy->ContentType);
        $this->assertSame('A subject', $mailerSpy->Subject);
        $this->assertStringContainsString('<strong>Name:</strong> Mrs Name<br>', $mailerSpy->Body);
        $this->assertStringContainsString('<strong>Email Address:</strong> mrs.name@example.com<br>', $mailerSpy->Body);
        $this->assertStringContainsString('Message via <em>ninthyard.co.uk</em>', $mailerSpy->Body);
        $this->assertSame(
            'Name: Mrs Name' . "\r\n" .
            'Email: mrs.name@example.com' . "\r\n" .
            'A message',
            $mailerSpy->AltBody
        );
        $this->assertSame('', $mailerSpy->ErrorInfo);
    }

    public function testItReturnsFalseOnMailerException(): void
    {
        $_ENV['SMTP_HOST'] = 'smtp.example.com';
        $_ENV['SMTP_USERNAME'] = 'smtp@example.com';
        $_ENV['SMTP_PASSWORD'] = 'password';
        $_ENV['SMTP_PORT'] = 567;
        $_ENV['SMTP_FROM_EMAIL'] = 'from@example.com';
        $_ENV['SMTP_FROM_NAME'] = 'Mr From';
        $_ENV['SMTP_SUBJECT'] = 'A subject';
        $_ENV['SMTP_TO_EMAIL'] = 'to@example.com';
        $_ENV['SMTP_TO_NAME'] = 'Miss To';

        $mailerSpy = new MailerSpy();
        $mailerSpy->throwException = true;
        $process = (new ProcessForm($mailerSpy))->process([
            'name' => 'Mrs Name',
            'email' => 'mrs.name@example.com',
            'message' => 'A message'
        ]);

        $this->assertFalse($process);
        $this->assertTrue($mailerSpy->sendCalled);
    }

    public function testItThrowsExceptionOnEmptyName(): void
    {
        $this->expectException(NameRequired::class);

        (new ProcessForm(new MailerSpy()))->process([
            'name' => '',
            'email' => 'mrs.name@example.com',
            'message' => 'A message'
        ]);
    }

    public function testItThrowsExceptionOnEmptyPhoneAndEmail(): void
    {
        $this->expectException(EmailRequired::class);

        (new ProcessForm(new MailerSpy()))->process([
            'name' => 'Mrs Name',
            'email' => '',
            'message' => 'A message'
        ]);
    }
}

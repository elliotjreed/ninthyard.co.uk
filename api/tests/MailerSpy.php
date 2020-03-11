<?php

declare(strict_types=1);

namespace Tests\ElliotJReed;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

final class MailerSpy extends PHPMailer
{
    public bool $sendCalled = false;
    public bool $throwException = false;

    public function send(): bool
    {
        $this->sendCalled = true;

        if ($this->throwException) {
            throw new Exception();
        }

        return true;
    }
}

<?php

declare(strict_types=1);

namespace ElliotJReed\Exception;

use Exception;

final class EmailRequired extends Exception implements Form
{
    protected $message = 'An email address is required.';
}

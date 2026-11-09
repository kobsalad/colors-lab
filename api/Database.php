<?php

function connectToDatabase(): mysqli
{
	$localSettings = [];
	$envFile = __DIR__ . '/.env';

	if (is_file($envFile))
	{
		$localSettings = parse_ini_file($envFile, false, INI_SCANNER_RAW);
		if ($localSettings === false)
		{
			throw new RuntimeException('Unable to read the database environment file.');
		}
	}

	$getSetting = static function (string $name) use ($localSettings): string
	{
		$value = getenv($name);
		if ($value === false)
		{
			$value = $localSettings[$name] ?? null;
		}

		if (!is_string($value) || trim($value) === '')
		{
			throw new RuntimeException("Missing required database setting: $name");
		}

		return $value;
	};

	return new mysqli(
		$getSetting('DB_HOST'),
		$getSetting('DB_USER'),
		$getSetting('DB_PASSWORD'),
		$getSetting('DB_NAME')
	);
}

?>
